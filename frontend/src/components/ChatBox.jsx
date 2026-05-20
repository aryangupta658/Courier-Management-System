import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";
import { getCourierMessagesApi } from "../api/chatApi";
import { useAuth } from "../context/AuthContext";
import { Send } from "lucide-react";

const ChatBox = ({ courier }) => {
  const { user } = useAuth();

  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const currentUserId = user?.user?._id;

  const receiverId =
    user?.user?.role === "customer"
      ? courier?.assignedTo?._id
      : courier?.customer?._id;

  const receiverName =
    user?.user?.role === "customer"
      ? courier?.assignedTo?.name
      : courier?.customer?.name;

  const receiverPhone =
    user?.user?.role === "customer"
      ? courier?.assignedTo?.phone
      : courier?.customer?.phone;

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await getCourierMessagesApi(courier._id);
        setMessages(data.messages || []);
        scrollToBottom();
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };

    if (courier?._id) {
      loadMessages();
      socket.emit("joinChatRoom", courier._id);
    }

    const handleReceiveMessage = (newMessage) => {
      const receivedCourierId = newMessage.courier?._id || newMessage.courier;

      if (receivedCourierId === courier._id) {
        setMessages((prev) => [...prev, newMessage]);
        scrollToBottom();
      }
    };

    socket.on("receiveCourierMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveCourierMessage", handleReceiveMessage);
    };
  }, [courier?._id]);

  const sendMessage = () => {
    if (!message.trim()) return;

    if (!receiverId) {
      alert("Chat is available only after delivery boy is assigned");
      return;
    }

    socket.emit("sendCourierMessage", {
      courierId: courier._id,
      senderId: currentUserId,
      receiverId,
      message,
    });

    setMessage("");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (!courier) {
    return null;
  }

  if (!receiverId) {
    return (
      <div className="bg-white rounded-3xl border shadow-sm p-5">
        <h3 className="text-xl font-extrabold mb-2">Courier Chat</h3>
        <p className="text-gray-500">
          Chat will be available after admin assigns a delivery boy.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-3 sm:p-5 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-4 mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold">Courier Chat</h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Tracking ID: {courier.trackingId}
          </p>
        </div>

        <div className="text-left sm:text-right text-xs sm:text-sm text-gray-500">
          <p className="font-semibold text-gray-700">{receiverName}</p>
          <p>{receiverPhone}</p>
        </div>
      </div>

      <div className="h-[55vh] sm:h-[420px] overflow-y-auto bg-gray-50 rounded-2xl p-3 sm:p-4 space-y-3">
        {messages.map((msg) => {
          const senderId = msg.sender?._id || msg.sender;
          const isMine = senderId === currentUserId;

          return (
            <div
              key={msg._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2 shadow-sm break-words ${
                  isMine
                    ? "bg-blue-700 text-white"
                    : "bg-white border text-gray-800"
                }`}
              >
                <p className="text-sm">{msg.message}</p>

                <p
                  className={`text-[10px] mt-1 ${
                    isMine ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString()
                    : "Now"}
                </p>
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-center">
            <p className="text-gray-500 text-sm">
              No messages yet. Start conversation.
            </p>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      <div className="flex gap-2 sm:gap-3 mt-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="Type message..."
          className="flex-1 min-w-0 border rounded-xl px-3 sm:px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-700 text-white px-4 sm:px-6 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-800"
        >
          <Send size={18} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
