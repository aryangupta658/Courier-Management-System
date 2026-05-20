import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { trackCourierApi } from "../../api/courierApi";
import ChatBox from "../../components/ChatBox";

const CustomerChat = () => {
  const { trackingId } = useParams();

  const [courier, setCourier] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCourier = async () => {
    try {
      const data = await trackCourierApi(trackingId);
      setCourier(data.courier);
    } catch (error) {
      console.log(error.response?.data?.message);
      alert(error.response?.data?.message || "Courier not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourier();
  }, [trackingId]);

  if (loading) {
    return <p className="text-gray-500">Loading chat...</p>;
  }

  if (!courier) {
    return <p className="text-red-600">Courier not found.</p>;
  }

  return (
    <div className="space-y-5">
      <Link
        to="/customer/my-couriers"
        className="inline-flex items-center gap-2 bg-white border px-5 py-3 rounded-xl font-bold"
      >
        <ArrowLeft size={18} />
        Back to My Couriers
      </Link>

      <ChatBox courier={courier} />
    </div>
  );
};

export default CustomerChat;
