# RealVoiceGPT

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

RealVoiceGPT is an open-source project that allows users to interact with ChatGPT, leveraging the cutting-edge technologies of ElevenLabs AI text-to speech, OpenAI's Whisper, GPT3.5, and ElevenLabs Prime Voice AI. This project aims to simulate real human voice conversations in English, providing a natural and lifelike experience for users.

## Features

- Seamless integration of ElevenLabs AI text-to-speech and OpenAI's Whisper for human-like voice synthesis.
- Interactive web application built with Flask and React, providing an intuitive user interface for conversing with ChatGPT.
- Integration with ElevenLabs Prime Voice AI for enhanced voice processing and natural language understanding.
- Easy setup and deployment using Docker, allowing for quick deployment on various platforms.

## Installation

To run RealVoiceGPT locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/your-username/RealVoiceGPT.git
```

2. Navigate to the project directory:

```
cd RealVoiceGPT
```

3. Install the required dependencies:

```
pip install -r requirements.txt
```

4. Start the development server:

```
flask run
```

5. Access the application in your web browser at http://localhost:5000.

For detailed deployment instructions and additional configuration options, please refer to the documentation.

## Text-to-speech providers

The backend speaks through a pluggable TTS provider (`api/tts/`) so the two
engines are interchangeable and the routes (`/chat`, `/generate`) don't care
which is used. Select one with the `TTS_PROVIDER` env var:

| `TTS_PROVIDER` | Engine | Required config |
|----------------|--------|-----------------|
| `elevenlabs` (default) | ElevenLabs | `ELEVEN_KEY` |
| `sixtydb` | [60db](https://docs.60db.ai) (`POST /tts-synthesize`) | `SIXTYDB_API_KEY` |

Optional 60db overrides: `SIXTYDB_VOICE_ID`, `SIXTYDB_OUTPUT_FORMAT`
(`mp3`/`wav`/`ogg`/`flac`, default `mp3`), `SIXTYDB_BASE_URL`.

Copy `api/.env.example` to `api/.env` and fill in the keys. To add another
provider, implement the `TTSProvider` interface in `api/tts/base.py` and register
it in `api/tts/__init__.py`.

## Usage

Once the application is up and running, you can engage in lifelike conversations with ChatGPT. Simply type your message in the input box or say it out loud to use our Speech Recognition API, and ChatGPT will respond using ElevenLabs AI text-to-speech to simulate a real human voice. Explore the application to experience the capabilities of RealVoiceGPT and discover new possibilities for voice-based AI interactions.

## Contributing

Contributions to RealVoiceGPT are welcome and encouraged! To contribute, please follow our contribution guidelines.

## License

RealVoiceGPT is licensed under the MIT License.
