import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUserByAdmin,
  deleteUserByAdmin,
  updateUserStatus,
  getDeliveryBoys,
  getAllCouriers,
  getCourierByAdmin,
  assignCourier,
  updateCourierStatusByAdmin,
  updateCourierByAdmin,
  deleteCourierByAdmin,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(allowRoles("admin"));

router.get("/dashboard-stats", getDashboardStats);

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUserByAdmin);
router.delete("/users/:id", deleteUserByAdmin);
router.put("/users/:id/status", updateUserStatus);

router.get("/delivery-boys", getDeliveryBoys);

router.get("/couriers", getAllCouriers);
router.get("/couriers/:id", getCourierByAdmin);
router.put("/couriers/:id", updateCourierByAdmin);
router.delete("/couriers/:id", deleteCourierByAdmin);
router.put("/couriers/:id/assign", assignCourier);
router.put("/couriers/:id/status", updateCourierStatusByAdmin);

export default router;