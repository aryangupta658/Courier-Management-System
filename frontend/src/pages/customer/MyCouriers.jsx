import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, MessageCircle } from "lucide-react";
import { getMyCouriersApi } from "../../api/courierApi";
import StatusBadge from "../../components/StatusBadge";

const MyCouriers = () => {
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

  const filteredCouriers = couriers.filter((courier) => {
    const search = searchTerm.toLowerCase();

    return (
      courier.trackingId?.toLowerCase().includes(search) ||
      courier.receiverName?.toLowerCase().includes(search) ||
      courier.deliveryAddress?.toLowerCase().includes(search) ||
      courier.status?.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Couriers</h1>

      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by tracking ID, receiver, city, status..."
          className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCouriers.map((courier) => (
          <div
            key={courier._id}
            className="bg-white rounded-2xl shadow-sm border p-5"
          >
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
              <div>
                <h2 className="font-bold text-lg">{courier.trackingId}</h2>

                <p className="text-gray-600 text-sm">
                  {courier.pickupAddress} → {courier.deliveryAddress}
                </p>

                <p className="text-gray-600 text-sm">
                  Receiver: {courier.receiverName} | {courier.receiverPhone}
                </p>

                <p className="text-gray-600 text-sm">
                  Delivery Boy:{" "}
                  {courier.assignedTo
                    ? `${courier.assignedTo.name} | ${courier.assignedTo.phone}`
                    : "Not assigned"}
                </p>

                <p className="text-gray-600 text-sm">
                  Estimated Delivery:{" "}
                  {courier.estimatedDeliveryDate
                    ? new Date(
                        courier.estimatedDeliveryDate
                      ).toLocaleDateString()
                    : "Not available"}
                </p>

                <div className="mt-2">
                  <StatusBadge status={courier.status} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/customer/live-track/${courier.trackingId}`}
                  className="bg-blue-700 text-white px-5 py-3 rounded-xl text-center font-semibold"
                >
                  Live Track
                </Link>

                <Link
                  to={`/customer/chat/${courier.trackingId}`}
                  className={`px-5 py-3 rounded-xl text-center font-semibold flex items-center justify-center gap-2 ${
                    courier.assignedTo
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-500 pointer-events-none"
                  }`}
                >
                  <MessageCircle size={18} />
                  Chat
                </Link>

                <Link
                  to={`/customer/invoice/${courier._id}`}
                  target="_blank"
                  className="bg-green-600 text-white px-5 py-3 rounded-xl text-center font-semibold"
                >
                  Invoice
                </Link>
              </div>
            </div>
          </div>
        ))}

        {filteredCouriers.length === 0 && (
          <p className="text-gray-500">No couriers found.</p>
        )}
      </div>
    </div>
  );
};

export default MyCouriers;
