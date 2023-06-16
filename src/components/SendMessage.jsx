import React, { useCallback, useState } from "react";

function SendMessageForm(props) {
  const [content, setContent] = useState("");

  // Use useCallback to memoize the handler for input change
  const handleChange = useCallback((event) => {
    setContent(event.target.value);
  }, []);

  // Use useCallback to memoize the handler for form submit
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      props.onSend(content);
      setContent("");
    },
    [content, props]
  );

  return (
    <form className="send-message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={handleChange}
        placeholder="Type your message here"
      />
      <button type="submit">Send</button>
    </form>
  );
}
export default SendMessageForm;
