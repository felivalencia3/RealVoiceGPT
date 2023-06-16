import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = (props) => {
  const { src } = props;

  return <ReactAudioPlayer src={src} autoPlay style={{ display: 'none' }} />;
};

export default AudioPlayer;
