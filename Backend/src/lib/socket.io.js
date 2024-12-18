import { Server } from "socket.io";
import { createServer } from "node:http";
import express from "express";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.ORIGIN],
  },
});

export function getReceiverSocketId(userId){
  return userSocketMap[userId]
}

const userSocketMap = {}   // To store online users 
io.on('connection', (socket) => {
    console.log('a user connected',socket.id);

    const userId = socket.handshake.query.userId;
    if(userId){
      userSocketMap[userId] = socket.id
    }
    
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    
    socket.on('disconnect', () => {
      console.log('user disconnected',socket.id);
      delete userSocketMap[userId]
      io.emit("getOnlineUsers",Object.keys(userSocketMap))
    });
  });

export { io, app, server };