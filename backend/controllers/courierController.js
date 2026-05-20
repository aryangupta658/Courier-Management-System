import Courier from "../models/Courier.js";
import generateTrackingId from "../utils/generateTrackingId.js";

const calculateEstimatedDeliveryDate = (deliveryType) => {
  const date = new Date();

  if (deliveryType === "express") {
    date.setDate(date.getDate() + 2);
  } else {
    date.setDate(date.getDate() + 5);
  }

  return date;
};

export const createCourier = async (req, res) => {
  try {
    const {
      senderName,
      senderPhone,
      pickupAddress,
      receiverName,
      receiverPhone,
      receiverEmail,
      deliveryAddress,
      parcelType,
      parcelWeight,
      parcelDescription,
      deliveryType,
      price,
      razorpayOrderId,
      razorpayPaymentId
    } = req.body;

    if (
      !senderName ||
      !senderPhone ||
      !pickupAddress ||
      !receiverName ||
      !receiverPhone ||
      !deliveryAddress ||
      !parcelType ||
      !parcelWeight ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    if (!razorpayOrderId || !razorpayPaymentId) {
      return res.status(400).json({
        success: false,
        message: "Payment is required before booking courier"
      });
    }

    let trackingId;
    let trackingExists = true;

    while (trackingExists) {
      trackingId = generateTrackingId();
      trackingExists = await Courier.findOne({ trackingId });
    }

    const courier = await Courier.create({
      trackingId,
      customer: req.user._id,

      senderName,
      senderPhone,
      pickupAddress,

      receiverName,
      receiverPhone,
      receiverEmail,
      deliveryAddress,

      parcelType,
      parcelWeight,
      parcelDescription,
      deliveryType,

      estimatedDeliveryDate: calculateEstimatedDeliveryDate(deliveryType),

      price,
      paymentStatus: "Paid",
      razorpayOrderId,
      razorpayPaymentId,

      status: "Booked",

      statusHistory: [
        {
          status: "Booked",
          note: "Courier booked successfully after payment"
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: "Courier booked successfully",
      courier
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMyCouriers = async (req, res) => {
  try {
    const couriers = await Courier.find({
      customer: req.user._id
    })
      .populate("assignedTo", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: couriers.length,
      couriers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const trackCourier = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const courier = await Courier.findOne({ trackingId })
      .populate("customer", "name email phone")
      .populate("assignedTo", "name email phone");

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found"
      });
    }

    res.status(200).json({
      success: true,
      courier
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getCourierById = async (req, res) => {
  try {
    const courier = await Courier.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("assignedTo", "name email phone");

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found"
      });
    }

    if (
      req.user.role === "customer" &&
      courier.customer._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You cannot access this courier"
      });
    }

    if (
      req.user.role === "delivery" &&
      courier.assignedTo &&
      courier.assignedTo._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "This courier is not assigned to you"
      });
    }

    res.status(200).json({
      success: true,
      courier
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const cancelCourier = async (req, res) => {
  try {
    const courier = await Courier.findById(req.params.id);

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found"
      });
    }

    if (courier.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot cancel this courier"
      });
    }

    if (courier.status !== "Booked" && courier.status !== "Assigned") {
      return res.status(400).json({
        success: false,
        message: "Courier cannot be cancelled after pickup"
      });
    }

    courier.status = "Cancelled";

    courier.statusHistory.push({
      status: "Cancelled",
      note: "Courier cancelled by customer"
    });

    await courier.save();

    res.status(200).json({
      success: true,
      message: "Courier cancelled successfully",
      courier
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};