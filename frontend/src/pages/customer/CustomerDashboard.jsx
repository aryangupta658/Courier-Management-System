import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, Truck, CheckCircle, XCircle, Search } from "lucide-react";
import { getMyCouriersApi } from "../../api/courierApi";
import StatusBadge from "../../components/StatusBadge";
import NeedHelpCard from "../../components/NeedHelpCard";

const CustomerDashboard = () => {
  const [couriers, setCouriers] = useState([]);
  const [trackingId, setTrackingId] = useState("");

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

  const activeDeliveries = couriers.filter(
    (courier) =>
      courier.status !== "Delivered" && courier.status !== "Cancelled"
  ).length;

  const delivered = couriers.filter(
    (courier) => courier.status === "Delivered"
  ).length;

  const cancelled = couriers.filter(
    (courier) => courier.status === "Cancelled"
  ).length;

  const recentCouriers = couriers.slice(0, 5);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Customer Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your courier bookings, tracking and payments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatsCard
          icon={<Package />}
          label="Total Bookings"
          value={couriers.length}
          color="text-blue-700"
        />

        <StatsCard
          icon={<Truck />}
          label="Active Deliveries"
          value={activeDeliveries}
          color="text-orange-600"
        />

        <StatsCard
          icon={<CheckCircle />}
          label="Delivered"
          value={delivered}
          color="text-green-600"
        />

        <StatsCard
          icon={<XCircle />}
          label="Cancelled"
          value={cancelled}
          color="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.8fr] gap-6">
        <div className="bg-white rounded-3xl border shadow-sm p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-xl font-extrabold">My Recent Couriers</h2>

            <Link
              to="/customer/my-couriers"
              className="text-blue-700 font-bold text-sm"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3">Tracking ID</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Estimated</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {recentCouriers.map((courier) => (
                  <tr key={courier._id} className="border-b last:border-0">
                    <td className="py-4 font-bold">{courier.trackingId}</td>
                    <td>{courier.pickupAddress}</td>
                    <td>{courier.deliveryAddress}</td>
                    <td>
                      <StatusBadge status={courier.status} />
                    </td>
                    <td>
                      {courier.estimatedDeliveryDate
                        ? new Date(
                            courier.estimatedDeliveryDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <Link
                        to={`/customer/live-track/${courier.trackingId}`}
                        className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm"
                      >
                        Track
                      </Link>
                    </td>
                  </tr>
                ))}

                {recentCouriers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      No couriers booked yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border shadow-sm p-5">
            <h2 className="text-xl font-extrabold mb-4">Track Your Courier</h2>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Tracking ID"
                className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Link
              to={
                trackingId.trim()
                  ? `/customer/live-track/${trackingId.trim()}`
                  : "/track"
              }
              className="block w-full bg-blue-700 text-white text-center py-3 rounded-xl font-bold mt-4"
            >
              Track Now
            </Link>
          </div>

          <NeedHelpCard />
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, label, value, color }) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">
      <div className={`${color}`}>{icon}</div>
      <p className="text-gray-500 mt-3">{label}</p>
      <h2 className={`text-3xl font-extrabold ${color}`}>{value}</h2>
    </div>
  );
};

export default CustomerDashboard;
