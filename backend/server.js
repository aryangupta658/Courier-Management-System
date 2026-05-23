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

/* ----------------------------- CORS SETUP ----------------------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, mobile apps, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ----------------------------- MIDDLEWARE ----------------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ----------------------------- TEST ROUTE ----------------------------- */

app.get("/", (req, res) => {
  res.send("Courier Management System API is running...");
});

/* ----------------------------- API ROUTES ----------------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/couriers", courierRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/chat", chatRoutes);

/* ----------------------------- SOCKET.IO ----------------------------- */

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Socket not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});

socketHandler(io);

/* ----------------------------- ERROR HANDLER ----------------------------- */

app.use(notFound);
app.use(errorHandler);

/* ----------------------------- SERVER LISTEN ----------------------------- */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});