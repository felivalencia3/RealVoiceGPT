"""60db (60db.ai) TTS provider.

Uses the simple HTTP synthesis endpoint (``POST /tts-synthesize``), which returns
a single base64-encoded audio blob. This maps cleanly onto the app's existing
"write a file, serve it by name" flow with no frontend changes.

Docs: https://docs.60db.ai/api-reference/tts/text-to-speech
"""

import base64
import os

import requests

from .base import TTSProvider

DEFAULT_BASE_URL = "https://api.60db.ai"
DEFAULT_OUTPUT_FORMAT = "mp3"
REQUEST_TIMEOUT_SECONDS = 60


class SixtyDBProvider(TTSProvider):
    def __init__(self):
        self.api_key = os.getenv("SIXTYDB_API_KEY")
        self.base_url = os.getenv("SIXTYDB_BASE_URL", DEFAULT_BASE_URL).rstrip("/")
        # voice_id is optional; the API falls back to its default voice when omitted.
        self.voice_id = os.getenv("SIXTYDB_VOICE_ID")
        self.output_format = os.getenv(
            "SIXTYDB_OUTPUT_FORMAT", DEFAULT_OUTPUT_FORMAT
        ).strip().lower()

        if not self.api_key:
            raise RuntimeError(
                "SIXTYDB_API_KEY is not set; cannot use the 60db TTS provider."
            )

    @property
    def file_extension(self):
        # The returned audio matches the requested output format (mp3/wav/ogg/flac).
        return self.output_format

    def synthesize(self, text):
        payload = {"text": text, "output_format": self.output_format}
        if self.voice_id:
            payload["voice_id"] = self.voice_id

        response = requests.post(
            f"{self.base_url}/tts-synthesize",
            json=payload,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            },
            timeout=REQUEST_TIMEOUT_SECONDS,
        )
        response.raise_for_status()

        data = response.json()
        if not data.get("success", True):
            raise RuntimeError(f"60db TTS failed: {data.get('message', 'unknown error')}")

        audio_base64 = data.get("audio_base64")
        if not audio_base64:
            raise RuntimeError("60db TTS response did not contain audio_base64.")

        return base64.b64decode(audio_base64)
