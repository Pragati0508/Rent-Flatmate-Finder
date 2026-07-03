import { Server } from "socket.io";

let io;

// Store online users
const onlineUsers = new Map();

export const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {

    console.log("🟢 User Connected:", socket.id);

    /*
    ========================================
    Register User
    ========================================
    */

    socket.on("register", (userId) => {

      onlineUsers.set(userId, socket.id);

      console.log("Online Users:", onlineUsers);

    });

    /*
    ========================================
    Send Message
    ========================================
    */

    socket.on("sendMessage", (data) => {

      const receiverSocket = onlineUsers.get(data.receiver);

      if (receiverSocket) {

        io.to(receiverSocket).emit("receiveMessage", data);

      }

    });

    /*
    ========================================
    Disconnect
    ========================================
    */

    socket.on("disconnect", () => {

      console.log("🔴 User Disconnected");

      for (const [userId, socketId] of onlineUsers.entries()) {

        if (socketId === socket.id) {

          onlineUsers.delete(userId);

          break;

        }

      }

    });

  });

};

export { io };