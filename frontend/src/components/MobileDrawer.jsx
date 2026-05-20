import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  X,
  Truck,
  LayoutDashboard,
  PackagePlus,
  Boxes,
  Search,
  LogOut,
  Users,
  BarChart3,
  MapPinned,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const MobileDrawer = ({ open, onClose, role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  if (!open) return null;

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

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85%] bg-white shadow-xl p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-700 text-white flex items-center justify-center">
              <Truck />
            </div>
            <h2 className="font-extrabold text-xl">CourierMS</h2>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold ${
                  active
                    ? "bg-blue-700 text-white"
                    : "text-gray-600 hover:bg-blue-50"
                }`}
              >
                <Icon size={19} />
                {link.name}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MobileDrawer;
