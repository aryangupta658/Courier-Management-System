import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Boxes,
  CheckCircle,
  MapPinned,
  Truck,
  IndianRupee,
  MessageCircle,
} from "lucide-react";
import { getAssignedCouriersApi } from "../../api/deliveryApi";
import StatusBadge from "../../components/StatusBadge";

const DeliveryDashboard = () => {
  const [couriers, setCouriers] = useState([]);

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

  const picked = couriers.filter((c) => c.status === "Picked Up").length;
  const inTransit = couriers.filter((c) => c.status === "In Transit").length;
  const delivered = couriers.filter((c) => c.status === "Delivered").length;
  const earnings = delivered * 50;

  return (
    <div className="space-y-7">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-6 md:p-8 text-white shadow-lg">
        <h2 className="text-2xl md:text-3xl font-extrabold">
          Delivery Partner Panel
        </h2>

        <p className="text-green-100 mt-2">
          View assigned parcels, update delivery status, chat with customers,
          and share live location.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link
            to="/delivery/assigned-couriers"
            className="bg-white text-green-700 px-6 py-3 rounded-xl font-bold text-center"
          >
            View Assigned Couriers
          </Link>

          <Link
            to="/delivery/chats"
            className="bg-green-500/30 border border-white/30 text-white px-6 py-3 rounded-xl font-bold text-center"
          >
            Open Chats
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <Boxes className="text-blue-700" />
          <p className="text-gray-500 mt-3">Assigned</p>
          <h2 className="text-3xl font-extrabold text-blue-700">
            {couriers.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <Truck className="text-orange-600" />
          <p className="text-gray-500 mt-3">Picked Up</p>
          <h2 className="text-3xl font-extrabold text-orange-600">{picked}</h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <MapPinned className="text-indigo-600" />
          <p className="text-gray-500 mt-3">In Transit</p>
          <h2 className="text-3xl font-extrabold text-indigo-600">
            {inTransit}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <CheckCircle className="text-green-600" />
          <p className="text-gray-500 mt-3">Delivered</p>
          <h2 className="text-3xl font-extrabold text-green-600">
            {delivered}
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <IndianRupee className="text-purple-600" />
          <p className="text-gray-500 mt-3">Earnings</p>
          <h2 className="text-3xl font-extrabold text-purple-600">
            ₹{earnings}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-extrabold">Assigned Couriers</h3>

          <Link
            to="/delivery/chats"
            className="text-purple-700 font-bold flex items-center gap-2"
          >
            <MessageCircle size={18} />
            Chats
          </Link>
        </div>

        <div className="space-y-4">
          {couriers.slice(0, 4).map((courier) => (
            <div
              key={courier._id}
              className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h4 className="font-extrabold">{courier.trackingId}</h4>

                <p className="text-sm text-gray-500">
                  {courier.pickupAddress} → {courier.deliveryAddress}
                </p>

                <div className="mt-2">
                  <StatusBadge status={courier.status} />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/delivery/share-location/${courier.trackingId}/${courier._id}`}
                  className="bg-green-600 text-white px-5 py-3 rounded-xl text-center font-bold"
                >
                  Start Tracking
                </Link>

                <Link
                  to="/delivery/chats"
                  className="bg-purple-600 text-white px-5 py-3 rounded-xl text-center font-bold"
                >
                  Chat
                </Link>
              </div>
            </div>
          ))}

          {couriers.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No assigned couriers yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
