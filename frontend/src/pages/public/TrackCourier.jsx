import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Truck, MapPin } from "lucide-react";
import { trackCourierApi } from "../../api/courierApi";
import StatusBadge from "../../components/StatusBadge";
import { useAuth } from "../../context/AuthContext";

const TrackCourier = () => {
  const { user } = useAuth();

  const [trackingId, setTrackingId] = useState("");
  const [courier, setCourier] = useState(null);
  const [error, setError] = useState("");

  const role = user?.user?.role;

  const dashboardPath =
    role === "admin"
      ? "/admin/dashboard"
      : role === "delivery"
      ? "/delivery/dashboard"
      : "/customer/dashboard";

  const handleTrack = async (e) => {
    e.preventDefault();
    setError("");
    setCourier(null);

    try {
      const data = await trackCourierApi(trackingId);
      setCourier(data.courier);
    } catch (error) {
      setError(error.response?.data?.message || "Courier not found");
    }
  };

  return (
    <div className="min-h-screen bg-[#edf4ff]">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-700 text-white rounded-xl flex items-center justify-center">
              <Truck />
            </div>

            <span className="font-extrabold text-xl text-blue-700">
              CourierMS
            </span>
          </Link>

          {user?.token ? (
            <Link to={dashboardPath} className="text-blue-700 font-bold">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="text-blue-700 font-bold">
              Login
            </Link>
          )}
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Track Your Courier
          </h1>

          <p className="text-gray-600 mt-3">
            Enter your tracking ID to view courier status and delivery progress.
          </p>
        </div>

        <form
          onSubmit={handleTrack}
          className="bg-white rounded-3xl shadow-sm border p-5 flex flex-col md:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID"
              className="w-full border rounded-xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold">
            Track
          </button>
        </form>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mt-5">
            {error}
          </div>
        )}

        {courier && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.8fr] gap-6 mt-8">
            <div className="bg-white rounded-3xl shadow-sm border p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold">
                    {courier.trackingId}
                  </h2>

                  <p className="text-gray-500 mt-1">Courier tracking details</p>
                </div>

                <StatusBadge status={courier.status} />
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-2xl p-4">
                  <p className="text-sm text-gray-500">From</p>
                  <h3 className="font-bold mt-1">{courier.pickupAddress}</h3>
                </div>

                <div className="bg-green-50 rounded-2xl p-4">
                  <p className="text-sm text-gray-500">To</p>
                  <h3 className="font-bold mt-1">{courier.deliveryAddress}</h3>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-sm text-gray-500">Receiver</p>
                  <h3 className="font-bold mt-1">{courier.receiverName}</h3>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-sm text-gray-500">Delivery Boy</p>
                  <h3 className="font-bold mt-1">
                    {courier.assignedTo?.name || "Not assigned"}
                  </h3>
                </div>
              </div>

              <Link
                to={`/customer/live-track/${courier.trackingId}`}
                className="inline-flex items-center gap-2 mt-6 bg-blue-700 text-white px-6 py-3 rounded-xl font-bold"
              >
                <MapPin size={19} />
                Open Live Tracking
              </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border p-6">
              <h3 className="text-xl font-extrabold mb-5">Status Timeline</h3>

              <div className="space-y-4">
                {courier.statusHistory?.map((item, index) => (
                  <div key={index} className="relative pl-7">
                    <div className="absolute left-0 top-1 w-3 h-3 bg-blue-700 rounded-full"></div>

                    {index !== courier.statusHistory.length - 1 && (
                      <div className="absolute left-[5px] top-5 bottom-[-20px] w-[2px] bg-blue-100"></div>
                    )}

                    <p className="font-bold">{item.status}</p>

                    <p className="text-xs text-gray-500">
                      {new Date(item.date).toLocaleString()}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!courier && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h3 className="font-extrabold">Live Tracking</h3>
              <p className="text-gray-600 text-sm mt-2">
                Track delivery boy location on map after assignment.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h3 className="font-extrabold">Status Updates</h3>
              <p className="text-gray-600 text-sm mt-2">
                View booked, picked up, in transit and delivered status.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h3 className="font-extrabold">Secure Booking</h3>
              <p className="text-gray-600 text-sm mt-2">
                Courier is booked only after successful payment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackCourier;
