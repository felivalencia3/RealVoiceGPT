import React from "react";
import TextToSpeech from "./components/TextToSpeech";
import AudioRecorder from "./components/AudioRecorder";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App container">
      <TextToSpeech />
      <AudioRecorder />
    </div>
  );
}

export default App;
