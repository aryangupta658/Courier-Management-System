import { Menu, Search, Bell, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Topbar = ({ title, onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 rounded-xl border flex items-center justify-center"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">
              {title}
            </h1>
            <p className="text-sm text-gray-500 hidden sm:block">
              Welcome back, {user?.user?.name || "User"}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              placeholder="Search here..."
              className="w-64 border rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-10 h-10 rounded-xl border flex items-center justify-center">
            <Bell size={19} />
          </button>

          <div className="flex items-center gap-2">
            <UserCircle size={34} className="text-blue-700" />
            <span className="text-sm font-semibold">{user?.user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
