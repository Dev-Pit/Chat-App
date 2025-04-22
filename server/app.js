import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

import { socketHandler } from "./util/SocketHandler.js";

const app = express();
const server = http.createServer(app);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // or wherever your frontend runs
    credentials: true, // 💥 this is critical
  })
);
app.use(cookieParser());

// Initialize Socket.IO with the server
socketHandler(server);

// Use your router for REST API endpoints
import userRouter from "./routers/user.route.js";
import indexRouter from "./routers/index.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/dashboard", indexRouter);

app.use(errorHandler);

export default server;
// handle Error
// app.use((error, req, res, next) => {
//   console.log("\n🚀 ~ app.use ~ error:", error);

//   let errorMessage = `An unknown error occured!`;
//   let statusCode = 500;
//   if (isHttpError(error)) {
//     statusCode = error.statusCode;
//     errorMessage = error.message;
//   }
//   if (error instanceof Error) errorMessage = error.message;
//   res.status(statusCode).json(new ApiError(statusCode, errorMessage));
// });
