import Message from "../models/Message.js";
import Courier from "../models/Courier.js";

export const getCourierMessages = async (req, res) => {
  try {
    const { courierId } = req.params;

    const courier = await Courier.findById(courierId);

    if (!courier) {
      return res.status(404).json({
        success: false,
        message: "Courier not found"
      });
    }

    const messages = await Message.find({
      courier: courierId
    })
      .populate("sender", "name role")
      .populate("receiver", "name role")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};