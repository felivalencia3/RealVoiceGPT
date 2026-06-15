"""Common interface shared by every TTS provider."""


class TTSProvider:
    """Base class for text-to-speech providers.

    Implementations turn text into encoded audio bytes. The caller is
    responsible for persisting/serving those bytes; providers stay transport
    and storage agnostic so they remain interchangeable.
    """

    #: Audio container/extension produced by ``synthesize`` (e.g. "wav", "mp3").
    file_extension = "wav"

    def synthesize(self, text):
        """Synthesize ``text`` and return the encoded audio as ``bytes``."""
        raise NotImplementedError
