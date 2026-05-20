import express from "express";
import { getCourierMessages } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:courierId", protect, getCourierMessages);

export default router;