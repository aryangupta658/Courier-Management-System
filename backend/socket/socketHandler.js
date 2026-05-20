import Courier from "../models/Courier.js";
import Message from "../models/Message.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinTrackingRoom", (trackingId) => {
      socket.join(`tracking_${trackingId}`);
    });

    socket.on("deliveryLocationUpdate", async (data) => {
      try {
        const { trackingId, lat, lng } = data;

        if (!trackingId || lat == null || lng == null) return;

        const courier = await Courier.findOne({ trackingId });

        if (courier) {
          courier.currentLocation = {
            lat,
            lng,
            updatedAt: new Date()
          };

          await courier.save();
        }

        io.to(`tracking_${trackingId}`).emit("receiveDeliveryLocation", {
          trackingId,
          lat,
          lng,
          updatedAt: new Date()
        });
      } catch (error) {
        console.error(error.message);
      }
    });

    socket.on("stopTracking", (trackingId) => {
      socket.leave(`tracking_${trackingId}`);
    });

    socket.on("joinChatRoom", (courierId) => {
      socket.join(`chat_${courierId}`);
    });

    socket.on("sendCourierMessage", async (data) => {
      try {
        const { courierId, senderId, receiverId, message } = data;

        if (!courierId || !senderId || !receiverId || !message) return;

        const savedMessage = await Message.create({
          courier: courierId,
          sender: senderId,
          receiver: receiverId,
          message
        });

        const populatedMessage = await Message.findById(savedMessage._id)
          .populate("sender", "name role")
          .populate("receiver", "name role");

        io.to(`chat_${courierId}`).emit(
          "receiveCourierMessage",
          populatedMessage
        );
      } catch (error) {
        console.error(error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};