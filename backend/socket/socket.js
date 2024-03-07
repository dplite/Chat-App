import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getUserSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("user con", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSocketMap[userId] = socket.id;
  }
  // io.emit is used to send event to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on is used to listen to events on both client and server side
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    console.log("user disconnected", socket.id);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
