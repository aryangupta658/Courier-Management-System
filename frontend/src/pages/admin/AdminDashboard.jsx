import { useEffect, useState } from "react";
import { getAdminStatsApi } from "../../api/adminApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  const loadStats = async () => {
    try {
      const data = await getAdminStatsApi();
      setStats(data.stats);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    { title: "Total Couriers", value: stats?.totalCouriers || 0 },
    { title: "Booked", value: stats?.booked || 0 },
    { title: "Assigned", value: stats?.assigned || 0 },
    { title: "In Transit", value: stats?.inTransit || 0 },
    { title: "Delivered", value: stats?.delivered || 0 },
    { title: "Cancelled", value: stats?.cancelled || 0 },
    { title: "Customers", value: stats?.totalCustomers || 0 },
    { title: "Delivery Boys", value: stats?.totalDeliveryBoys || 0 },
    { title: "Revenue", value: `₹${stats?.totalRevenue || 0}` },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded-2xl shadow-sm border"
          >
            <p className="text-gray-500">{card.title}</p>
            <h2 className="text-3xl font-bold mt-3 text-blue-700">
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
