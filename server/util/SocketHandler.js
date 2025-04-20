import { Server } from "socket.io";

export const socketHandler = (server) => {
  // Initialize Socket.IO with the server
  const io = new Server(server);

  // Listen for connections from clients
  io.on("connection", (socket) => {
    console.log(`\nserver:=> New connection: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`\nserver:=> User has left!!! :=> ${socket.id}`);
    });
  });
};
