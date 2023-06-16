import React from 'react';

// A component that renders a single message
function Message(props) {
  const chat_color = props.message.user ? 'black' : 'purple';
  return (
    <div className='message list-group-item d-flex align-items-center justify-content-between'>
      <div style={{ color: chat_color }} className='content text-break'>
        {props.message.content}
      </div>
    </div>
  );
}
export default Message;
