import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import courierRoutes from "./routes/courierRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { socketHandler } from "./socket/socketHandler.js";

connectDB();

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("Courier Management System API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/couriers", courierRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/chat", chatRoutes);

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

socketHandler(io);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});