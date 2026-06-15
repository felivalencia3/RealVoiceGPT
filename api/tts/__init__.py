"""TTS provider abstraction.

Selects a text-to-speech backend at runtime via the ``TTS_PROVIDER`` env var so
the rest of the app does not care which engine is used. Each provider exposes the
same interface (see ``base.TTSProvider``): ``synthesize(text) -> bytes`` plus a
``file_extension`` describing the returned audio.

Supported values for ``TTS_PROVIDER``:
    - "elevenlabs" (default) -> ElevenLabsProvider
    - "sixtydb"              -> SixtyDBProvider (60db.ai)
"""

import os


def get_tts_provider():
    """Return a TTS provider instance based on the ``TTS_PROVIDER`` env var.

    Providers are imported lazily so that using one engine does not require the
    other's dependencies (e.g. running 60db does not require the elevenlabs SDK).
    """
    provider = os.getenv("TTS_PROVIDER", "elevenlabs").strip().lower()

    if provider == "sixtydb":
        from .sixtydb import SixtyDBProvider

        return SixtyDBProvider()

    if provider == "elevenlabs":
        from .elevenlabs import ElevenLabsProvider

        return ElevenLabsProvider()

    raise ValueError(
        f"Unknown TTS_PROVIDER {provider!r}. Expected 'elevenlabs' or 'sixtydb'."
    )
