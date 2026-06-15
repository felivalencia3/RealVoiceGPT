"""ElevenLabs TTS provider.

Wraps the existing ElevenLabs integration unchanged so behavior is identical to
before the provider abstraction was introduced.
"""

import os

from elevenlabs import generate, set_api_key, voices

from .base import TTSProvider


class ElevenLabsProvider(TTSProvider):
    # ElevenLabs returns audio that the app has always saved with a .wav name.
    file_extension = "wav"

    def __init__(self):
        set_api_key(os.getenv("ELEVEN_KEY"))

    def synthesize(self, text):
        # voices()[-1] preserves the original voice-selection behavior.
        return generate(text=text, voice=voices()[-1])
