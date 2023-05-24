import "./App.css";
import { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

// To connect front-end to the back-end
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  // Establish a connection between the user and the socket.io room
  const enterRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("enter_room", room); //Receives from the server
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      <div className="home">
        <h1>Input a username and room ID:</h1>
        <p>
          <strong>Username:</strong>
        </p>
        <input
          className="credentials-input"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value); //Gets the inputted value
          }}
        />
        <p>
          <strong>Chat Room:</strong>
        </p>
        <input
          className="credentials-input"
          type="text"
          onChange={(event) => {
            setRoom(event.target.value); //Gets the inputted value
          }}
        />
        <br></br>
        <button className="join-button" onClick={enterRoom}>
          Join room
        </button>
      </div>
      {showChat ? (
        <div className="chatContainer">
          <Chat socket={socket} username={username} room={room} />
        </div>
      ) : (
        <h1 className="hide">Hidden</h1>
      )}
    </div>
  );
}

export default App;
