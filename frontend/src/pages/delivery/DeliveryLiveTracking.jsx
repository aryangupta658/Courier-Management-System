import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPinned, Search } from "lucide-react";
import { getAssignedCouriersApi } from "../../api/deliveryApi";
import StatusBadge from "../../components/StatusBadge";

const DeliveryLiveTracking = () => {
  const [couriers, setCouriers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCouriers = async () => {
    try {
      const data = await getAssignedCouriersApi();
      setCouriers(data.couriers || []);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadCouriers();
  }, []);

  const activeCouriers = couriers.filter(
    (courier) =>
      courier.status !== "Delivered" && courier.status !== "Cancelled"
  );

  const filteredCouriers = activeCouriers.filter((courier) => {
    const search = searchTerm.toLowerCase();

    return (
      courier.trackingId?.toLowerCase().includes(search) ||
      courier.pickupAddress?.toLowerCase().includes(search) ||
      courier.deliveryAddress?.toLowerCase().includes(search) ||
      courier.receiverName?.toLowerCase().includes(search) ||
      courier.receiverPhone?.toLowerCase().includes(search) ||
      courier.status?.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Live Tracking</h1>

      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-6 text-white mb-6">
        <div className="flex items-center gap-3">
          <MapPinned size={34} />

          <div>
            <h2 className="text-2xl font-extrabold">Share Live Location</h2>
            <p className="text-green-100">
              Choose an active courier and start sharing your current location.
            </p>
          </div>
        </div>
      </div>

      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search active courier for live tracking..."
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
                {courier.pickupAddress} → {courier.deliveryAddress}
              </p>

              <p className="text-gray-600 text-sm">
                Receiver: {courier.receiverName} | {courier.receiverPhone}
              </p>

              <div className="mt-2">
                <StatusBadge status={courier.status} />
              </div>
            </div>

            <Link
              to={`/delivery/share-location/${courier.trackingId}/${courier._id}`}
              className="bg-green-600 text-white px-5 py-3 rounded-xl text-center font-bold"
            >
              Start Live Tracking
            </Link>
          </div>
        ))}

        {filteredCouriers.length === 0 && (
          <div className="bg-white rounded-2xl border p-8 text-center">
            <p className="text-gray-500">
              No active courier available for live tracking.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryLiveTracking;
