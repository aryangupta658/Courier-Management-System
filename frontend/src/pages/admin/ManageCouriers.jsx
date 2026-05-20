import { useEffect, useState } from "react";
import { Search, Pencil, Trash2, X } from "lucide-react";
import {
  getAllCouriersApi,
  getDeliveryBoysApi,
  assignCourierApi,
  updateCourierByAdminApi,
  deleteCourierByAdminApi,
} from "../../api/adminApi";
import StatusBadge from "../../components/StatusBadge";

const ManageCouriers = () => {
  const [couriers, setCouriers] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [editCourier, setEditCourier] = useState(null);

  const loadData = async () => {
    try {
      const courierData = await getAllCouriersApi();
      const deliveryData = await getDeliveryBoysApi();

      setCouriers(courierData.couriers || []);
      setDeliveryBoys(deliveryData.deliveryBoys || []);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load couriers");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredCouriers = couriers.filter((courier) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      courier.trackingId?.toLowerCase().includes(search) ||
      courier.customer?.name?.toLowerCase().includes(search) ||
      courier.customer?.email?.toLowerCase().includes(search) ||
      courier.customer?.phone?.toLowerCase().includes(search) ||
      courier.assignedTo?.name?.toLowerCase().includes(search) ||
      courier.assignedTo?.phone?.toLowerCase().includes(search) ||
      courier.senderName?.toLowerCase().includes(search) ||
      courier.senderPhone?.toLowerCase().includes(search) ||
      courier.receiverName?.toLowerCase().includes(search) ||
      courier.receiverPhone?.toLowerCase().includes(search) ||
      courier.pickupAddress?.toLowerCase().includes(search) ||
      courier.deliveryAddress?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" || courier.status === statusFilter;

    const matchesPayment =
      paymentFilter === "all" || courier.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  const handleAssign = async (courierId, deliveryBoyId) => {
    if (!deliveryBoyId) return;

    try {
      await assignCourierApi(courierId, deliveryBoyId);
      alert("Courier assigned successfully");
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Assign failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this courier order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCourierByAdminApi(id);
      alert("Courier deleted successfully");
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCourierByAdminApi(editCourier._id, editCourier);
      alert("Courier updated successfully");
      setEditCourier(null);
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Courier update failed");
    }
  };

  const statuses = [
    "Booked",
    "Assigned",
    "Picked Up",
    "In Transit",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
    "Returned",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Couriers</h1>

      <div className="bg-white border rounded-2xl p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tracking ID, customer, sender, receiver, city..."
            className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredCouriers.map((courier) => (
          <div
            key={courier._id}
            className="bg-white rounded-2xl shadow-sm border p-5"
          >
            <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr_0.8fr] gap-5">
              <div>
                <h2 className="font-bold text-lg">{courier.trackingId}</h2>

                <p className="text-gray-600 text-sm">
                  <b>Route:</b> {courier.pickupAddress} →{" "}
                  {courier.deliveryAddress}
                </p>

                <p className="text-gray-600 text-sm">
                  <b>Customer:</b> {courier.customer?.name} |{" "}
                  {courier.customer?.email} | {courier.customer?.phone}
                </p>

                <p className="text-gray-600 text-sm">
                  <b>Sender:</b> {courier.senderName} | {courier.senderPhone}
                </p>

                <p className="text-gray-600 text-sm">
                  <b>Receiver:</b> {courier.receiverName} |{" "}
                  {courier.receiverPhone}
                </p>

                <p className="text-gray-600 text-sm">
                  <b>Parcel:</b> {courier.parcelType} | {courier.parcelWeight}{" "}
                  kg
                </p>

                <p className="text-gray-600 text-sm">
                  <b>Payment:</b> {courier.paymentStatus} | ₹{courier.price}
                </p>

                <p className="text-gray-600 text-sm">
                  <b>Estimated Delivery:</b>{" "}
                  {courier.estimatedDeliveryDate
                    ? new Date(
                        courier.estimatedDeliveryDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>

                <div className="mt-2">
                  <StatusBadge status={courier.status} />
                </div>
              </div>

              <div>
                <p className="font-bold mb-2">Assigned Delivery Boy</p>

                <select
                  className="w-full border rounded-xl px-4 py-3"
                  value={courier.assignedTo?._id || ""}
                  onChange={(e) => handleAssign(courier._id, e.target.value)}
                  disabled={
                    courier.status === "Delivered" ||
                    courier.status === "Cancelled"
                  }
                >
                  <option value="">Assign Delivery Boy</option>

                  {deliveryBoys.map((boy) => (
                    <option key={boy._id} value={boy._id}>
                      {boy.name} - {boy.phone}
                    </option>
                  ))}
                </select>

                {courier.assignedTo && (
                  <div className="text-sm text-gray-600 mt-3">
                    <p>{courier.assignedTo.name}</p>
                    <p>{courier.assignedTo.email}</p>
                    <p>{courier.assignedTo.phone}</p>
                    <p>{courier.assignedTo.address}</p>
                  </div>
                )}
              </div>

              <div className="flex xl:flex-col gap-3">
                <button
                  onClick={() => setEditCourier(courier)}
                  className="bg-blue-50 text-blue-700 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Pencil size={18} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(courier._id)}
                  className="bg-red-50 text-red-600 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredCouriers.length === 0 && (
          <p className="text-gray-500">No couriers found.</p>
        )}
      </div>

      {editCourier && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-extrabold">Edit Courier Order</h2>
              <button onClick={() => setEditCourier(null)}>
                <X />
              </button>
            </div>

            <form
              onSubmit={handleEditSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Input
                label="Sender Name"
                value={editCourier.senderName}
                onChange={(value) =>
                  setEditCourier({ ...editCourier, senderName: value })
                }
              />

              <Input
                label="Sender Phone"
                value={editCourier.senderPhone}
                onChange={(value) =>
                  setEditCourier({ ...editCourier, senderPhone: value })
                }
              />

              <Input
                label="Receiver Name"
                value={editCourier.receiverName}
                onChange={(value) =>
                  setEditCourier({ ...editCourier, receiverName: value })
                }
              />

              <Input
                label="Receiver Phone"
                value={editCourier.receiverPhone}
                onChange={(value) =>
                  setEditCourier({ ...editCourier, receiverPhone: value })
                }
              />

              <Input
                label="Receiver Email"
                value={editCourier.receiverEmail}
                onChange={(value) =>
                  setEditCourier({ ...editCourier, receiverEmail: value })
                }
              />

              <Input
                label="Parcel Type"
                value={editCourier.parcelType}
                onChange={(value) =>
                  setEditCourier({ ...editCourier, parcelType: value })
                }
              />

              <Input
                label="Parcel Weight"
                type="number"
                value={editCourier.parcelWeight}
                onChange={(value) =>
                  setEditCourier({
                    ...editCourier,
                    parcelWeight: Number(value),
                  })
                }
              />

              <Input
                label="Price"
                type="number"
                value={editCourier.price}
                onChange={(value) =>
                  setEditCourier({ ...editCourier, price: Number(value) })
                }
              />

              <div className="md:col-span-2">
                <label className="text-sm font-semibold">Pickup Address</label>
                <textarea
                  value={editCourier.pickupAddress || ""}
                  onChange={(e) =>
                    setEditCourier({
                      ...editCourier,
                      pickupAddress: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 mt-1 min-h-20"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold">
                  Delivery Address
                </label>
                <textarea
                  value={editCourier.deliveryAddress || ""}
                  onChange={(e) =>
                    setEditCourier({
                      ...editCourier,
                      deliveryAddress: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 mt-1 min-h-20"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Delivery Type</label>
                <select
                  value={editCourier.deliveryType || "normal"}
                  onChange={(e) =>
                    setEditCourier({
                      ...editCourier,
                      deliveryType: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 mt-1"
                >
                  <option value="normal">Normal</option>
                  <option value="express">Express</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold">Status</label>
                <select
                  value={editCourier.status}
                  onChange={(e) =>
                    setEditCourier({ ...editCourier, status: e.target.value })
                  }
                  className="w-full border rounded-xl px-4 py-3 mt-1"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold">Payment Status</label>
                <select
                  value={editCourier.paymentStatus}
                  onChange={(e) =>
                    setEditCourier({
                      ...editCourier,
                      paymentStatus: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 mt-1"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Estimated Delivery
                </label>
                <input
                  type="date"
                  value={
                    editCourier.estimatedDeliveryDate
                      ? editCourier.estimatedDeliveryDate.slice(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    setEditCourier({
                      ...editCourier,
                      estimatedDeliveryDate: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3 mt-1"
                />
              </div>

              <div className="md:col-span-2 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setEditCourier(null)}
                  className="px-6 py-3 rounded-xl border font-bold"
                >
                  Cancel
                </button>

                <button className="px-6 py-3 rounded-xl bg-blue-700 text-white font-bold">
                  Update Courier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ label, value, onChange, type = "text" }) => {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 mt-1"
      />
    </div>
  );
};

export default ManageCouriers;
