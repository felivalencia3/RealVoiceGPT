import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import AudioPlayer from './AudioPlayer';
import AudioRecorder from './AudioRecorder';
import axios from 'axios';

function ChatApp() {
  const [loading, setLoading] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioSrc, setAudioSrc] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: false, content: "Hello, I'm ChatGPT" },
    { id: 2, user: true, content: "Hi, I'm the User" },
    { id: 3, user: false, content: 'How are you?' },
    { id: 4, user: true, content: 'Good, thanks' },
  ]);

  useEffect(() => {
    // Fetch some data here and update the messages state from session
  }, []);

  const handleRecord = async (e) => {
    e.preventDefault();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Get the user's audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];
      recorder.addEventListener('dataavailable', (e) => {
        chunks.push(e.data);
      });
      recorder.addEventListener('stop', () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
      });
      recorder.start();
      setTimeout(() => {
        recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
      }, 5000);
    } else {
      alert('Your browser does not support audio recording.');
    }
  };
  const addMessage = (user, content) => {
    const newMessage = {
      id: messages.length + 1,
      user: user,
      content: content,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSubmitAudio = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.wav');
      try {
        const response = await axios.post('/chat', formData);
        setLoading(false);
        console.log(response.data.user);
        console.log(response.data.chat);
        console.log(response.data.audioSrc);
        addMessage(true, response.data.user);
        addMessage(false, response.data.chat);
        setAudioSrc(response.data.audioSrc);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('No audio recorded.');
    }
  };

  return (
    <div className='app container-fluid h-100 p-3'>
      <MessageList messages={messages} />
      <AudioRecorder
        loading={loading}
        onSubmit={handleSubmitAudio}
        onRecord={handleRecord}
      />
      <AudioPlayer src={audioSrc} />
    </div>
  );
}

export default ChatApp;
