import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function TextToSpeech() {
  const [text, setText] = useState("");
  const [audioSrc, setAudioSrc] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/generate", { text: text });
      const fileName = response.data;
      setAudioSrc(fileName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-to-speech">
      <h1 className="text-center my-4">Text to Speech Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Enter some text:</label>
          <input
            type="text"
            id="text"
            name="text"
            value={text}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Generate
        </button>
      </form>
      {audioSrc && (
        <div className="mt-4">
          <h2>Generated Speech</h2>
          <audio controls src={audioSrc} className="w-100"></audio>
        </div>
      )}
    </div>
  );
}

export default TextToSpeech;
