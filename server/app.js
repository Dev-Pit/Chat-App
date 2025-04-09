import express from "express";
import http from "http";
import createHttpError, { isHttpError } from "http-errors";
import { Server } from "socket.io";

import userRoutes from "./routers/User.js";

const app = express();
const server = http.createServer(app);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Socket.IO with the server
const io = new Server(server);

// Listen for connections from clients
io.on("connection", (socket) => {
  console.log(`\nserver:=> New connection: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`\nserver:=> User has left!!! :=> ${socket.id}`);
  });
});

// Use your router for REST API endpoints
app.use("/auth", userRoutes);

app.use((error, req, res, next) => {
  console.log("\n🚀 ~ app.use ~ error:", error);

  let errorMessage = `An unknown error occured!`;
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  if (error instanceof Error) errorMessage = error.message;
  res.status(statusCode).json({ error: errorMessage });
});

export default server;
