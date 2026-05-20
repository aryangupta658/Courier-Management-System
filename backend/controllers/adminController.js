import User from "../models/User.js";
import Courier from "../models/Courier.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalCouriers = await Courier.countDocuments();
    const booked = await Courier.countDocuments({ status: "Booked" });
    const assigned = await Courier.countDocuments({ status: "Assigned" });
    const pickedUp = await Courier.countDocuments({ status: "Picked Up" });
    const inTransit = await Courier.countDocuments({ status: "In Transit" });
    const outForDelivery = await Courier.countDocuments({
      status: "Out for Delivery",
    });
    const delivered = await Courier.countDocuments({ status: "Delivered" });
    const cancelled = await Courier.countDocuments({ status: "Cancelled" });

    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalDeliveryBoys = await User.countDocuments({ role: "delivery" });

    const revenueData = await Courier.aggregate([
      {
        $match: {
          paymentStatus: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalCouriers,
        booked,
        assigned,
        pickedUp,
        inTransit,
        outForDelivery,
        delivered,
        cancelled,
        totalCustomers,
        totalDeliveryBoys,
        totalRevenue: revenueData[0]?.totalRevenue || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password -resetOtp -resetOtpExpires")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -resetOtp -resetOtpExpires"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const { name, email, phone, role, address, isActive } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.role = role ?? user.role;
    user.address = address ?? user.address;

    if (typeof isActive === "boolean") {
      user.isActive = isActive;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        address: updatedUser.address,
        isActive: updatedUser.isActive,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete own account",
      });
    }

    const hasCouriers =
      (await Courier.countDocuments({ customer: user._id })) +
      (await Courier.countDocuments({ assignedTo: user._id }));

    if (hasCouriers > 0) {
      user.isActive = false;
      await user.save();

      return res.status(200).json({
        success: true,
        message:
          "User has linked couriers, so account was disabled instead of deleted",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot disable own account",
      });
    }

    user.isActive = Boolean(isActive);
    await user.save();

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDeliveryBoys = async (req, res) => {
  try {
    const deliveryBoys = await User.find({
      role: "delivery",
      isActive: true,
    }).select("-password -resetOtp -resetOtpExpires");

    res.status(200).json({
      success: true,
      count: deliveryBoys.length,
      deliveryBoys,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCouriers = async (req, res) => {
  try {
    const couriers = await Courier.find({})
      .populate("customer", "name email phone role address isActive")
      .populate("assignedTo", "name email phone role address isActive")
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

export const getCourierByAdmin = async (req, res) => {
  try {
    const courier = await Courier.findById(req.params.id)
      .populate("customer", "name email phone role address isActive")
      .populate("assignedTo", "name email phone role address isActive");

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found",
      });
    }

    res.status(200).json({
      success: true,
      courier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignCourier = async (req, res) => {
  try {
    const { deliveryBoyId } = req.body;

    const courier = await Courier.findById(req.params.id);

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found",
      });
    }

    const deliveryBoy = await User.findOne({
      _id: deliveryBoyId,
      role: "delivery",
      isActive: true,
    });

    if (!deliveryBoy) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery boy",
      });
    }

    courier.assignedTo = deliveryBoy._id;
    courier.status = "Assigned";

    courier.statusHistory.push({
      status: "Assigned",
      note: `Courier assigned to ${deliveryBoy.name}`,
    });

    await courier.save();

    const updatedCourier = await Courier.findById(courier._id)
      .populate("customer", "name email phone role address isActive")
      .populate("assignedTo", "name email phone role address isActive");

    res.status(200).json({
      success: true,
      message: "Courier assigned successfully",
      courier: updatedCourier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCourierStatusByAdmin = async (req, res) => {
  try {
    const { status, note } = req.body;

    const allowedStatus = [
      "Booked",
      "Assigned",
      "Picked Up",
      "In Transit",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
      "Returned",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const courier = await Courier.findById(req.params.id);

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found",
      });
    }

    courier.status = status;

    if (status === "Cancelled") {
      courier.deliveryOtp = "";
      courier.deliveryOtpExpires = null;
    }

    if (status === "Delivered") {
      courier.deliveredAt = new Date();
    }

    courier.statusHistory.push({
      status,
      note: note || `Status updated to ${status} by admin`,
    });

    await courier.save();

    const updatedCourier = await Courier.findById(courier._id)
      .populate("customer", "name email phone role address isActive")
      .populate("assignedTo", "name email phone role address isActive");

    res.status(200).json({
      success: true,
      message: "Courier status updated successfully",
      courier: updatedCourier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCourierByAdmin = async (req, res) => {
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
      estimatedDeliveryDate,
      price,
      paymentStatus,
      status,
      assignedTo,
    } = req.body;

    const courier = await Courier.findById(req.params.id);

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found",
      });
    }

    courier.senderName = senderName ?? courier.senderName;
    courier.senderPhone = senderPhone ?? courier.senderPhone;
    courier.pickupAddress = pickupAddress ?? courier.pickupAddress;
    courier.receiverName = receiverName ?? courier.receiverName;
    courier.receiverPhone = receiverPhone ?? courier.receiverPhone;
    courier.receiverEmail = receiverEmail ?? courier.receiverEmail;
    courier.deliveryAddress = deliveryAddress ?? courier.deliveryAddress;
    courier.parcelType = parcelType ?? courier.parcelType;
    courier.parcelWeight = parcelWeight ?? courier.parcelWeight;
    courier.parcelDescription = parcelDescription ?? courier.parcelDescription;
    courier.deliveryType = deliveryType ?? courier.deliveryType;
    courier.price = price ?? courier.price;
    courier.paymentStatus = paymentStatus ?? courier.paymentStatus;

    if (estimatedDeliveryDate) {
      courier.estimatedDeliveryDate = estimatedDeliveryDate;
    }

    if (assignedTo === "") {
      courier.assignedTo = null;
    } else if (assignedTo) {
      const deliveryBoy = await User.findOne({
        _id: assignedTo,
        role: "delivery",
        isActive: true,
      });

      if (!deliveryBoy) {
        return res.status(400).json({
          success: false,
          message: "Invalid delivery boy",
        });
      }

      courier.assignedTo = deliveryBoy._id;
    }

    const allowedStatus = [
      "Booked",
      "Assigned",
      "Picked Up",
      "In Transit",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
      "Returned",
    ];

    if (status) {
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      courier.status = status;

      if (status === "Cancelled") {
        courier.deliveryOtp = "";
        courier.deliveryOtpExpires = null;
      }

      if (status === "Delivered") {
        courier.deliveredAt = courier.deliveredAt || new Date();
      }

      courier.statusHistory.push({
        status,
        note: `Courier updated by admin. Current status: ${status}`,
      });
    }

    await courier.save();

    const updatedCourier = await Courier.findById(courier._id)
      .populate("customer", "name email phone role address isActive")
      .populate("assignedTo", "name email phone role address isActive");

    res.status(200).json({
      success: true,
      message: "Courier updated successfully",
      courier: updatedCourier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCourierByAdmin = async (req, res) => {
  try {
    const courier = await Courier.findById(req.params.id);

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found",
      });
    }

    await Courier.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Courier deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};