import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import "bootstrap/dist/css/bootstrap.min.css";

function AudioRecorder() {
  const [audioBlob, setAudioBlob] = useState(null);
  const [textReply, setTextReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecord = async (e) => {
    e.preventDefault();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Get the user's audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.addEventListener("dataavailable", (e) => {
        chunks.push(e.data);
      });
      recorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
      });
      recorder.start();
      setTimeout(() => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
      }, 5000);
    } else {
      alert("Your browser does not support audio recording.");
    }
  };

  const handleSubmitAudio = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (audioBlob) {
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.wav");
      try {
        const response = await axios.post("/convert", formData);
        setLoading(false);
        setTextReply(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("No audio recorded.");
    }
  };

  return (
    <div className="audio-converter mt-5">
      <button
        type="button"
        onClick={handleRecord}
        className="btn btn-secondary">
        Record
      </button>
      <button
        type="button"
        onClick={handleSubmitAudio}
        className="btn btn-primary">
        Submit Audio
      </button>
      {loading && <Loading />}
      {textReply && (
        <div className="mt-4">
          <h2>{textReply}</h2>
        </div>
      )}
    </div>
  );
}
export default AudioRecorder;
