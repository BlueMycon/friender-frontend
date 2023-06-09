import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import userContext from "./userContext";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Messages = ({toEmail}) => {
  const { user } = useContext(userContext);
  const [messageHistory, setMessageHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://127.0.0.1:5001/user/${user.email}/chat/${toEmail}`);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(() => {
    sendMessage(newMessage);
    setNewMessage('');
  }, [newMessage]);


  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  function handleNewMessageChange(evt) {
    const { name, value } = evt.target;
    console.log('new_message change', newMessage)
    setNewMessage(value);
  }

  return (
    <div>
      <input
        name="newMessage"
        type="text"
        className="form-control"
        id="newMessage"
        value={newMessage}
        onChange={handleNewMessageChange}
        aria-describedby="newMessageHelp"
        aria-required="true"
        required
      />{" "}
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send your message.
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
