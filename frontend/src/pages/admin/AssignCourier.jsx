import { useEffect, useState } from "react";
import {
  getAssignedCouriersApi,
  updateDeliveryStatusApi,
} from "../../api/deliveryApi";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";

const AssignedCouriers = () => {
  const [couriers, setCouriers] = useState([]);

  const loadCouriers = async () => {
    try {
      const data = await getAssignedCouriersApi();
      setCouriers(data.couriers);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadCouriers();
  }, []);

  const handleStatusChange = async (courierId, status) => {
    try {
      await updateDeliveryStatusApi(courierId, status);
      loadCouriers();
      alert("Status updated");
    } catch (error) {
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  const statuses = [
    "Picked Up",
    "In Transit",
    "Out for Delivery",
    "Delivered",
    "Failed Delivery",
    "Returned",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assigned Couriers</h1>

      <div className="grid grid-cols-1 gap-4">
        {couriers.map((courier) => (
          <div
            key={courier._id}
            className="bg-white rounded-2xl shadow-sm border p-5"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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

              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  className="border rounded-xl px-4 py-3"
                  value={courier.status}
                  onChange={(e) =>
                    handleStatusChange(courier._id, e.target.value)
                  }
                >
                  <option value={courier.status}>{courier.status}</option>

                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <Link
                  to={`/delivery/share-location/${courier.trackingId}/${courier._id}`}
                  className="bg-green-600 text-white px-5 py-3 rounded-xl text-center font-semibold"
                >
                  Start Tracking
                </Link>
              </div>
            </div>
          </div>
        ))}

        {couriers.length === 0 && (
          <p className="text-gray-500">No assigned couriers found.</p>
        )}
      </div>
    </div>
  );
};

export default AssignedCouriers;
