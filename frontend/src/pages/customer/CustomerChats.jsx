import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Search } from "lucide-react";
import { getMyCouriersApi } from "../../api/courierApi";
import StatusBadge from "../../components/StatusBadge";

const CustomerChats = () => {
  const [couriers, setCouriers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCouriers = async () => {
    try {
      const data = await getMyCouriersApi();
      setCouriers(data.couriers || []);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadCouriers();
  }, []);

  const chatCouriers = couriers.filter((courier) => courier.assignedTo);

  const filteredCouriers = chatCouriers.filter((courier) => {
    const search = searchTerm.toLowerCase();

    return (
      courier.trackingId?.toLowerCase().includes(search) ||
      courier.assignedTo?.name?.toLowerCase().includes(search) ||
      courier.deliveryAddress?.toLowerCase().includes(search) ||
      courier.status?.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Courier Chats</h1>

      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search chat by tracking ID, delivery boy, city..."
          className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCouriers.map((courier) => (
          <div
            key={courier._id}
            className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h2 className="font-bold text-lg">{courier.trackingId}</h2>

              <p className="text-gray-600 text-sm">
                Delivery Boy: {courier.assignedTo.name} |{" "}
                {courier.assignedTo.phone}
              </p>

              <p className="text-gray-600 text-sm">
                {courier.pickupAddress} → {courier.deliveryAddress}
              </p>

              <div className="mt-2">
                <StatusBadge status={courier.status} />
              </div>
            </div>

            <Link
              to={`/customer/chat/${courier.trackingId}`}
              className="bg-purple-600 text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              Open Chat
            </Link>
          </div>
        ))}

        {filteredCouriers.length === 0 && (
          <div className="bg-white rounded-2xl border p-8 text-center">
            <p className="text-gray-500">
              No chat available yet. Chat starts after admin assigns a delivery
              boy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerChats;
