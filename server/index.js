// To build the server with socket.io
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors"); //Cors library needed to deal with socket.io's cor issues
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

// This will connect express to the socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Whenever something connects, Listen to socket.io events
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("enter_room", (roomID) => {
    socket.join(roomID);
    console.log(`User with ID: ${socket.id} joined the room: ${roomID}`);
  });

  //Emits a socket event that will send the message data from front-end to back-end.
  socket.on("chat_message", (mess) => {
    socket.to(mess.room).emit("chat_receive", mess); //Gets the message data and delivers it to the room.
  });

  //Disconnecting with socket.io
  socket.on("disconnect", () => {
    console.log("Disconnected...", socket.id);
  });
});

// To create a server
server.listen(3001, () => {
  console.log("Server running....");
});
