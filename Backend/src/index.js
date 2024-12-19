import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { app, server } from "./lib/socket.io.js";

const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json({ limit: '50mb' })); // Adjust the size
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

server.listen(PORT, () => {
  connectDB();
});
