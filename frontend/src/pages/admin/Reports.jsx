import { useEffect, useState } from "react";
import {
  BarChart3,
  Package,
  Truck,
  CheckCircle,
  IndianRupee,
} from "lucide-react";
import { getAdminStatsApi } from "../../api/adminApi";

const ReportCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">
      <Icon className={color} size={30} />
      <p className="text-gray-500 mt-4">{title}</p>
      <h2 className={`text-3xl font-extrabold mt-2 ${color}`}>{value}</h2>
    </div>
  );
};

const Reports = () => {
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

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-700 to-blue-700 rounded-3xl p-6 text-white">
        <div className="flex items-center gap-3">
          <BarChart3 size={34} />
          <div>
            <h2 className="text-2xl font-extrabold">Reports & Analytics</h2>
            <p className="text-purple-100">
              Overview of courier performance and revenue.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <ReportCard
          title="Total Couriers"
          value={stats?.totalCouriers || 0}
          icon={Package}
          color="text-blue-700"
        />

        <ReportCard
          title="In Transit"
          value={stats?.inTransit || 0}
          icon={Truck}
          color="text-orange-600"
        />

        <ReportCard
          title="Delivered"
          value={stats?.delivered || 0}
          icon={CheckCircle}
          color="text-green-600"
        />

        <ReportCard
          title="Revenue"
          value={`₹${stats?.totalRevenue || 0}`}
          icon={IndianRupee}
          color="text-purple-700"
        />
      </div>

      <div className="bg-white rounded-3xl border shadow-sm p-6">
        <h3 className="text-xl font-extrabold mb-4">Summary</h3>

        <div className="space-y-3 text-gray-600">
          <p>Total customers: {stats?.totalCustomers || 0}</p>
          <p>Total delivery boys: {stats?.totalDeliveryBoys || 0}</p>
          <p>Booked couriers: {stats?.booked || 0}</p>
          <p>Assigned couriers: {stats?.assigned || 0}</p>
          <p>Cancelled couriers: {stats?.cancelled || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
