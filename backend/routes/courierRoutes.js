import express from "express";
import {
  createCourier,
  getMyCouriers,
  trackCourier,
  getCourierById,
  cancelCourier
} from "../controllers/courierController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public tracking
router.get("/track/:trackingId", trackCourier);

// Customer routes
router.post("/", protect, allowRoles("customer", "admin"), createCourier);
router.get("/my-couriers", protect, allowRoles("customer"), getMyCouriers);
router.get("/:id", protect, getCourierById);
router.put("/:id/cancel", protect, allowRoles("customer"), cancelCourier);

export default router;