import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { app, server } from "./lib/socket.io.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cookieParser());
app.use(express.json({ limit: '50mb' })); // Adjust the size
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: [process.env.ORIGIN],
  credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);


app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


server.listen(PORT, () => {
  connectDB();
});




