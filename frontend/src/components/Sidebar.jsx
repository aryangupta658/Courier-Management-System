import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  Search,
  LogOut,
  Truck,
  Users,
  BarChart3,
  MapPinned,
  UserCircle,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Couriers", path: "/admin/couriers", icon: Boxes },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Reports", path: "/admin/reports", icon: BarChart3 },
  ];

  const customerLinks = [
    { name: "Dashboard", path: "/customer/dashboard", icon: LayoutDashboard },
    { name: "Book Courier", path: "/customer/book-courier", icon: PackagePlus },
    { name: "My Couriers", path: "/customer/my-couriers", icon: Boxes },
    { name: "Chats", path: "/customer/chats", icon: MessageCircle },
    { name: "Track Courier", path: "/track", icon: Search },
  ];

  const deliveryLinks = [
    { name: "Dashboard", path: "/delivery/dashboard", icon: LayoutDashboard },
    {
      name: "Assigned Couriers",
      path: "/delivery/assigned-couriers",
      icon: Boxes,
    },
    { name: "Chats", path: "/delivery/chats", icon: MessageCircle },
    {
      name: "Live Tracking",
      path: "/delivery/live-tracking",
      icon: MapPinned,
    },
  ];

  const links =
    role === "admin"
      ? adminLinks
      : role === "delivery"
      ? deliveryLinks
      : customerLinks;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="hidden lg:flex w-72 min-h-screen bg-white border-r border-gray-200 flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow">
            <Truck size={24} />
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-gray-900">CourierMS</h1>
            <p className="text-xs text-gray-500">Fast. Safe. Reliable.</p>
          </div>
        </div>
      </div>

      <nav className="px-4 flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition ${
                active
                  ? "bg-blue-700 text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <Icon size={19} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl mb-3">
          <UserCircle className="text-blue-700" size={32} />
          <div className="min-w-0">
            <p className="font-bold text-sm truncate">
              {user?.user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.user?.role}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-red-600 hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
