// socketServer.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "./src/models/User.js";
import Message from './src/models/Message.js';

const connectedUsers = new Map(); // Map<username, socket.id>

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3002",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error("Token ausente"));

      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) return next(new Error("Usuário inválido"));

      socket.userId = user.id;
      socket.username = user.username;
      connectedUsers.set(user.username, socket.id);

      return next();
    } catch (err) {
      console.error("Erro na autenticação do socket:", err);
      return next(new Error("Autenticação falhou"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`🔌 Usuário conectado: ${socket.username}`);

    socket.on("send_message", ({ recipient, text }) => {
      const recipientSocketId = connectedUsers.get(recipient);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receive_message", {
          sender: socket.username,
          text,
        });
      }
    });

    socket.on("send_message", async ({ recipient, text }) => {
      const recipientSocketId = connectedUsers.get(recipient);
      const recipientUser = await User.findOne({ where: { username: recipient } });

      if (!recipientUser) return;

      await Message.create({
        sender_id: socket.userId,
        recipient_id: recipientUser.id,
        text,
      });

      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receive_message", {
          sender: socket.username,
          text,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ ${socket.username} desconectou.`);
      connectedUsers.delete(socket.username);
    });
  });
}
