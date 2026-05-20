import { useEffect, useState } from "react";
import { MessageCircle, Search } from "lucide-react";
import { getAssignedCouriersApi } from "../../api/deliveryApi";
import ChatBox from "../../components/ChatBox";
import StatusBadge from "../../components/StatusBadge";

const DeliveryChats = () => {
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCouriers = async () => {
    try {
      const data = await getAssignedCouriersApi();
      setCouriers(data.couriers || []);

      if (data.couriers?.length > 0) {
        setSelectedCourier(data.couriers[0]);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadCouriers();
  }, []);

  const filteredCouriers = couriers.filter((courier) => {
    const search = searchTerm.toLowerCase();

    return (
      courier.trackingId?.toLowerCase().includes(search) ||
      courier.customer?.name?.toLowerCase().includes(search) ||
      courier.pickupAddress?.toLowerCase().includes(search) ||
      courier.deliveryAddress?.toLowerCase().includes(search) ||
      courier.status?.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Customer Chats</h1>

      <div className="grid grid-cols-1 xl:grid-cols-[0.8fr_1.4fr] gap-6">
        <div className="bg-white rounded-3xl border shadow-sm p-5">
          <div className="relative mb-5">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customer chat..."
              className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredCouriers.map((courier) => (
              <button
                key={courier._id}
                onClick={() => setSelectedCourier(courier)}
                className={`w-full text-left border rounded-2xl p-4 transition ${
                  selectedCourier?._id === courier._id
                    ? "bg-blue-50 border-blue-600"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold">{courier.trackingId}</h3>

                    <p className="text-sm text-gray-600">
                      Customer: {courier.customer?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {courier.pickupAddress} → {courier.deliveryAddress}
                    </p>

                    <div className="mt-2">
                      <StatusBadge status={courier.status} />
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {filteredCouriers.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No assigned chats found.
              </p>
            )}
          </div>
        </div>

        <div>
          {selectedCourier ? (
            <ChatBox courier={selectedCourier} />
          ) : (
            <div className="bg-white rounded-3xl border shadow-sm p-8 text-center">
              <p className="text-gray-500">
                Select a courier to start chatting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryChats;
