const StatusBadge = ({ status }) => {
  const colors = {
    Booked: "bg-blue-100 text-blue-700",
    Assigned: "bg-purple-100 text-purple-700",
    "Picked Up": "bg-yellow-100 text-yellow-700",
    "In Transit": "bg-orange-100 text-orange-700",
    "Out for Delivery": "bg-indigo-100 text-indigo-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    Returned: "bg-gray-100 text-gray-700",
    "Failed Delivery": "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
