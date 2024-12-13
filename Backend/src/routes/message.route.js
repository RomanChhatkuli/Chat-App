import express from "express";
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get("/user",protectRoute, getUserForSidebar) // For users in sidebbar
router.get("/:id",protectRoute, getMessages)
router.post("/send/:id",protectRoute,sendMessage)


export default router;