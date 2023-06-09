import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import userContext from "./userContext";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Messages = ({toEmail}) => {
  // // console.log("websocket", webSocket)
  // const { id } = useParams();

  // const { user } = useContext(userContext);
  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState("");

  // // useEffect(() => {
  // //   if (webSocket) {
  // //     // webSocket.onMessage = (event) => {
  // //     //   const messageData = JSON.parse(event.data);
  // //     //   setMessages((prevMessages) => [...prevMessages, messageData]);
  // //     // };
  // //   }
  // // }, [webSocket]);

  // const handleSendMessage = () => {
  //   if (newMessage.trim() !== "") {
  //     webSocket.send(
  //       JSON.stringify({
  //         user: user,
  //         content: newMessage,
  //       })
  //     );
  //     setNewMessage("");
  //   }
  // };

  // return (
  //   <div>
  //     {id}
  //     <div>
  //       {messages.map((message, index) => (
  //         <div key={index}>
  //           <strong>{message.user}:</strong> {message.content}
  //         </div>
  //       ))}
  //     </div>
  //     <input
  //       type="text"
  //       value={newMessage}
  //       onChange={(e) => setNewMessage(e.target.value)}
  //     />
  //     <button onClick={handleSendMessage}>Send</button>
  //   </div>
  // );

  const { user } = useContext(userContext);
  const [messageHistory, setMessageHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://127.0.0.1:5001/user/${user.email}/chat/${toEmail}`);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(() => sendMessage(newMessage), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  function handleNewMessageChange(evt) {
    const { name, value } = evt.target;
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

/*
import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl('wss://demos.kaazing.com/echo'),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
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
*/
