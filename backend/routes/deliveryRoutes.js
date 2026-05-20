import express from "express";
import {
  getAssignedCouriers,
  updateDeliveryStatus,
  updateCurrentLocation,
  uploadDeliveryProof,
  sendDeliveryOtp,
  verifyDeliveryOtpAndDeliver
} from "../controllers/deliveryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(allowRoles("delivery"));

router.get("/assigned-couriers", getAssignedCouriers);

router.put("/couriers/:id/status", updateDeliveryStatus);
router.put("/couriers/:id/location", updateCurrentLocation);

router.post(
  "/couriers/:id/upload-proof",
  upload.single("proofImage"),
  uploadDeliveryProof
);

router.post("/couriers/:id/send-delivery-otp", sendDeliveryOtp);
router.post("/couriers/:id/verify-delivery-otp", verifyDeliveryOtpAndDeliver);

export default router;