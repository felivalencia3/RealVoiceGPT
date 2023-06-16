import React from 'react';
import Loading from './Loading';
import 'bootstrap/dist/css/bootstrap.min.css';

function AudioRecorder(props) {
  return (
    <div className='mt-5'>
      <button
        type='button'
        onClick={props.onRecord}
        className='btn btn-secondary mr-2'>
        Record
      </button>
      &nbsp;&nbsp;&nbsp;
      <button
        type='button'
        onClick={props.onSubmit}
        className='btn btn-primary ml-2'>
        Submit Audio
      </button>
      {props.loading && <Loading />}
      {props.textReply && (
        <div className='mt-4'>
          <h2>{props.textReply}</h2>
        </div>
      )}
    </div>
  );
}
export default AudioRecorder;
