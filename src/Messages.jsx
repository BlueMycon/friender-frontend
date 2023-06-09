import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import userContext from "./userContext";

const Messages = ({ webSocket }) => {
  console.log("websocket", webSocket)
  const { id } = useParams();

  const { user } = useContext(userContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (webSocket) {
      webSocket.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, messageData]);
      };
    }
  }, [webSocket]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      webSocket.send(
        JSON.stringify({
          user: user,
          content: newMessage,
        })
      );
      setNewMessage("");
    }
  };

  return (
    <div>
      {id}
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user}:</strong> {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Messages;
