import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { toast } from "react-toastify";
import {
  getAssignedCouriersApi,
  updateDeliveryStatusApi,
  uploadDeliveryProofApi,
  sendDeliveryOtpApi,
  verifyDeliveryOtpApi,
} from "../../api/deliveryApi";
import StatusBadge from "../../components/StatusBadge";

const AssignedCouriers = () => {
  const [couriers, setCouriers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [otpMap, setOtpMap] = useState({});

  const loadCouriers = async () => {
    try {
      const data = await getAssignedCouriersApi();
      setCouriers(data.couriers || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load assigned couriers"
      );
    }
  };

  useEffect(() => {
    loadCouriers();
  }, []);

  const filteredCouriers = couriers.filter((courier) => {
    const search = searchTerm.toLowerCase();

    return (
      courier.trackingId?.toLowerCase().includes(search) ||
      courier.pickupAddress?.toLowerCase().includes(search) ||
      courier.deliveryAddress?.toLowerCase().includes(search) ||
      courier.senderName?.toLowerCase().includes(search) ||
      courier.senderPhone?.toLowerCase().includes(search) ||
      courier.receiverName?.toLowerCase().includes(search) ||
      courier.receiverPhone?.toLowerCase().includes(search) ||
      courier.status?.toLowerCase().includes(search)
    );
  });

  const handleStatusChange = async (courierId, status) => {
    const confirmCancel =
      status === "Cancelled"
        ? window.confirm(
            "Are you sure you want to cancel this courier? Delivery proof and OTP will be disabled."
          )
        : true;

    if (!confirmCancel) return;

    try {
      await updateDeliveryStatusApi(courierId, status);
      toast.success(`Status updated to ${status}`);
      loadCouriers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  const handleUploadProof = async (courierId, file) => {
    if (!file) return;

    try {
      await uploadDeliveryProofApi(courierId, file);
      toast.success("Proof uploaded successfully");
      loadCouriers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Proof upload failed");
    }
  };

  const handleSendOtp = async (courierId) => {
    try {
      const data = await sendDeliveryOtpApi(courierId);
      toast.success(data.message || "OTP sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP sending failed");
    }
  };

  const handleVerifyOtp = async (courierId) => {
    try {
      await verifyDeliveryOtpApi(courierId, otpMap[courierId]);
      toast.success("Courier delivered successfully");
      loadCouriers();
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  const statuses = [
    "Picked Up",
    "In Transit",
    "Out for Delivery",
    "Cancelled",
    "Returned",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assigned Couriers</h1>

      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by tracking ID, sender, receiver, address, phone, status..."
          className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCouriers.map((courier) => {
          const isCancelled = courier.status === "Cancelled";
          const isDelivered = courier.status === "Delivered";
          const disableDeliveryActions = isCancelled || isDelivered;

          return (
            <div
              key={courier._id}
              className="bg-white rounded-2xl shadow-sm border p-5"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-lg">{courier.trackingId}</h2>

                    <p className="text-gray-600 text-sm">
                      <b>Route:</b> {courier.pickupAddress} →{" "}
                      {courier.deliveryAddress}
                    </p>

                    <p className="text-gray-600 text-sm">
                      <b>Sender / Customer:</b> {courier.senderName} |{" "}
                      {courier.senderPhone}
                    </p>

                    <p className="text-gray-600 text-sm">
                      <b>Receiver:</b> {courier.receiverName} |{" "}
                      {courier.receiverPhone}
                    </p>

                    <div className="mt-2">
                      <StatusBadge status={courier.status} />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      className="border rounded-xl px-4 py-3"
                      value={courier.status}
                      onChange={(e) =>
                        handleStatusChange(courier._id, e.target.value)
                      }
                      disabled={isDelivered}
                    >
                      <option value={courier.status}>{courier.status}</option>

                      {statuses
                        .filter((status) => status !== courier.status)
                        .map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                    </select>

                    <Link
                      to={`/delivery/share-location/${courier.trackingId}/${courier._id}`}
                      className={`px-5 py-3 rounded-xl text-center font-semibold ${
                        disableDeliveryActions
                          ? "bg-gray-200 text-gray-500 pointer-events-none"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      Start Tracking
                    </Link>
                  </div>
                </div>

                <div
                  className={`rounded-2xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3 ${
                    disableDeliveryActions
                      ? "bg-gray-100 opacity-60"
                      : "bg-gray-50"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    disabled={disableDeliveryActions}
                    onChange={(e) =>
                      handleUploadProof(courier._id, e.target.files[0])
                    }
                    className="border rounded-xl px-3 py-2 bg-white disabled:bg-gray-100"
                  />

                  <button
                    disabled={disableDeliveryActions}
                    onClick={() => handleSendOtp(courier._id)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-xl font-bold disabled:bg-gray-400"
                  >
                    Send Delivery OTP
                  </button>

                  <input
                    disabled={disableDeliveryActions}
                    placeholder="Enter Receiver OTP"
                    value={otpMap[courier._id] || ""}
                    onChange={(e) =>
                      setOtpMap((prev) => ({
                        ...prev,
                        [courier._id]: e.target.value,
                      }))
                    }
                    className="border rounded-xl px-4 py-2 disabled:bg-gray-100"
                  />

                  <button
                    disabled={disableDeliveryActions}
                    onClick={() => handleVerifyOtp(courier._id)}
                    className="bg-blue-700 text-white px-4 py-2 rounded-xl font-bold disabled:bg-gray-400"
                  >
                    Mark Delivered
                  </button>
                </div>

                {isCancelled && (
                  <p className="text-sm text-red-600 font-bold">
                    Courier cancelled. Proof upload, OTP and delivery actions
                    are disabled.
                  </p>
                )}

                {courier.proofImage && !isCancelled && (
                  <p className="text-sm text-green-700 font-semibold">
                    Proof image uploaded
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {filteredCouriers.length === 0 && (
          <p className="text-gray-500">No assigned couriers found.</p>
        )}
      </div>
    </div>
  );
};

export default AssignedCouriers;
