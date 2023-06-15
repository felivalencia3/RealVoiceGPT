from flask import Flask, request, send_file, jsonify
from elevenlabs import generate, set_api_key, voices, save
import os
import uuid

app = Flask(__name__)

AUDIO_FOLDER = "audio"
if not os.path.exists(AUDIO_FOLDER):
    os.makedirs(AUDIO_FOLDER)


@app.route("/convert", methods=["POST"])
def convert():
    audio_file = request.files.get("audio")
    if audio_file and audio_file.filename.endswith(".wav"):
        file_name = str(uuid.uuid4()) + ".wav"
        file_path = os.path.join(AUDIO_FOLDER, file_name)
        audio_file.save(file_path)
        # Return the file as an attachment
        return jsonify(file_name)
    else:
        return jsonify("Invalid audio file.")


@app.route("/generate", methods=["POST"])
def generate_speech():
    data = request.get_json()
    text = data["text"]
    audio = generate(text=text, voice=voices()[-1])
    file_name = "speech.wav"
    save(audio=audio, filename=os.path.join("audio", file_name))
    return file_name


@app.route("/<file_name>")
def get_file(file_name):
    return send_file(os.path.join("audio", file_name), as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)
