import Courier from "../models/Courier.js";
import sendEmail from "../utils/sendEmail.js";

export const getAssignedCouriers = async (req, res) => {
  try {
    const couriers = await Courier.find({
      assignedTo: req.user._id,
    })
      .populate("customer", "name email phone address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: couriers.length,
      couriers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { status, note } = req.body;

    const allowedStatus = [
      "Picked Up",
      "In Transit",
      "Out for Delivery",
      "Cancelled",
      "Returned",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Delivered status requires proof and OTP.",
      });
    }

    const courier = await Courier.findById(req.params.id);

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found",
      });
    }

    if (!courier.assignedTo || courier.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "This courier is not assigned to you",
      });
    }

    if (courier.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Delivered courier cannot be updated",
      });
    }

    courier.status = status;

    if (status === "Cancelled") {
      courier.deliveryOtp = "";
      courier.deliveryOtpExpires = null;
    }

    courier.statusHistory.push({
      status,
      note: note || `Status updated to ${status}`,
    });

    await courier.save();

    res.status(200).json({
      success: true,
      message: "Delivery status updated successfully",
      courier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCurrentLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    const courier = await Courier.findById(req.params.id);

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found",
      });
    }

    if (!courier.assignedTo || courier.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "This courier is not assigned to you",
      });
    }

    if (courier.status === "Cancelled" || courier.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Location cannot be updated for cancelled or delivered courier",
      });
    }

    courier.currentLocation = {
      lat,
      lng,
      updatedAt: new Date(),
    };

    await courier.save();

    res.status(200).json({
      success: true,
      message: "Location updated successfully",
      currentLocation: courier.currentLocation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const uploadDeliveryProof = async (req, res) => {
  try {
    const courier = await Courier.findById(req.params.id);

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found",
      });
    }

    if (!courier.assignedTo || courier.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "This courier is not assigned to you",
      });
    }

    if (courier.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cannot upload proof for cancelled courier",
      });
    }

    if (courier.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Courier is already delivered",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Proof image is required",
      });
    }

    courier.proofImage = `/uploads/${req.file.filename}`;

    await courier.save();

    res.status(200).json({
      success: true,
      message: "Proof image uploaded successfully",
      proofImage: courier.proofImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendDeliveryOtp = async (req, res) => {
  try {
    const courier = await Courier.findById(req.params.id).populate(
      "customer",
      "email name phone"
    );

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found",
      });
    }

    if (!courier.assignedTo || courier.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "This courier is not assigned to you",
      });
    }

    if (courier.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cannot send OTP for cancelled courier",
      });
    }

    if (courier.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Courier is already delivered",
      });
    }

    if (!courier.proofImage) {
      return res.status(400).json({
        success: false,
        message: "Upload delivery proof photo before sending OTP",
      });
    }

    const receiverEmail = courier.receiverEmail || courier.customer.email;

    if (!receiverEmail) {
      return res.status(400).json({
        success: false,
        message: "Receiver email is missing",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    courier.deliveryOtp = otp;
    courier.deliveryOtpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await courier.save();

    await sendEmail({
      to: receiverEmail,
      subject: "CourierMS Delivery OTP",
      text: `Your delivery confirmation OTP is ${otp}. Share it with the delivery boy only after receiving the parcel.`,
    });

    res.status(200).json({
      success: true,
      message: "Delivery OTP sent to receiver email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyDeliveryOtpAndDeliver = async (req, res) => {
  try {
    const { otp } = req.body;

    const courier = await Courier.findById(req.params.id);

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found",
      });
    }

    if (!courier.assignedTo || courier.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "This courier is not assigned to you",
      });
    }

    if (courier.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled courier cannot be marked delivered",
      });
    }

    if (courier.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Courier is already delivered",
      });
    }

    if (!courier.proofImage) {
      return res.status(400).json({
        success: false,
        message: "Upload delivery proof photo first",
      });
    }

    if (!otp || courier.deliveryOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery OTP",
      });
    }

    if (!courier.deliveryOtpExpires || courier.deliveryOtpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Delivery OTP expired",
      });
    }

    courier.status = "Delivered";
    courier.deliveredAt = new Date();
    courier.deliveryOtp = "";
    courier.deliveryOtpExpires = null;

    courier.statusHistory.push({
      status: "Delivered",
      note: "Courier delivered after proof photo and OTP verification",
    });

    await courier.save();

    res.status(200).json({
      success: true,
      message: "Courier delivered successfully",
      courier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};