dotenv.config();
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

const PORT = process.env.PORT;
const app = express();

app.use(cookieParser());
app.use(express.json({ limit: '50mb' })); // Adjust the size
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: [process.env.ORIGIN,"http://localhost:5173"],
  credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT}`);
  connectDB();
});
