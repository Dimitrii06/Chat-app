import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const chatMessage = async () => {
    if (currentMessage !== "") {
      const elapsed = Date.now();
      const today = new Date(elapsed);
      const message = {
        room: room,
        username: username,
        chat: currentMessage,
        time: `${today.getHours()}:${today.getMinutes()}`,
      };
      //Sends the data to the server
      await socket.emit("chat_message", message);
      setMessages((list) => [...list, message]);
      setCurrentMessage("");
    }
  };

  //Listen to event whenever a message is sent
  useEffect(() => {
    socket.on("chat_receive", (chatData) => {
      setMessages((list) => [...list, chatData]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat room</h2>
      </div>
      <div className="chat-message">
        <ScrollToBottom className="message-container">
          {messages.map((chatContent) => {
            return (
              <div
                className="message"
                id={
                  username === chatContent.username
                    ? "currentUser"
                    : "otherUser"
                }
              >
                <div>
                  <div className="message-content">
                    <p>{chatContent.chat}</p>
                  </div>
                  <div className="message-func">
                    <p>{chatContent.time}</p>
                    <p>{chatContent.username}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-functions">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type a message"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={chatMessage}>&#8594;</button>
      </div>
    </div>
  );
}

export default Chat;
