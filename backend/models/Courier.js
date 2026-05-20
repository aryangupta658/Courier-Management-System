import mongoose from "mongoose";

const courierSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    senderName: {
      type: String,
      required: true
    },

    senderPhone: {
      type: String,
      required: true
    },

    pickupAddress: {
      type: String,
      required: true
    },

    receiverName: {
      type: String,
      required: true
    },

    receiverPhone: {
      type: String,
      required: true
    },

    receiverEmail: {
      type: String,
      default: ""
    },

    deliveryAddress: {
      type: String,
      required: true
    },

    parcelType: {
      type: String,
      required: true
    },

    parcelWeight: {
      type: Number,
      required: true
    },

    parcelDescription: {
      type: String,
      default: ""
    },

    deliveryType: {
      type: String,
      enum: ["normal", "express"],
      default: "normal"
    },

    estimatedDeliveryDate: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: [
        "Booked",
        "Assigned",
        "Picked Up",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Failed Delivery",
        "Returned"
      ],
      default: "Booked"
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    currentLocation: {
      lat: {
        type: Number,
        default: null
      },
      lng: {
        type: Number,
        default: null
      },
      updatedAt: {
        type: Date,
        default: null
      }
    },

    price: {
      type: Number,
      default: 0
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending"
    },

    razorpayOrderId: {
      type: String,
      default: ""
    },

    razorpayPaymentId: {
      type: String,
      default: ""
    },

    proofImage: {
      type: String,
      default: ""
    },

    deliveryOtp: {
      type: String,
      default: ""
    },

    deliveryOtpExpires: {
      type: Date,
      default: null
    },

    deliveredAt: {
      type: Date,
      default: null
    },

    statusHistory: [
      {
        status: String,
        date: {
          type: Date,
          default: Date.now
        },
        note: String
      }
    ]
  },
  {
    timestamps: true
  }
);

const Courier = mongoose.model("Courier", courierSchema);

export default Courier;