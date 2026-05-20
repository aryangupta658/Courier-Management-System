import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileDrawer from "../components/MobileDrawer";

const CustomerLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const titles = {
    "/customer/dashboard": "Dashboard",
    "/customer/book-courier": "Book Courier",
    "/customer/my-couriers": "My Couriers",
  };

  const title = titles[location.pathname] || "Customer Panel";

  return (
    <div className="min-h-screen bg-[#f3f7ff] flex">
      <Sidebar role="customer" />

      <div className="flex-1 min-w-0">
        <Topbar title={title} onMenuClick={() => setOpen(true)} />

        <main className="p-4 md:p-8 max-w-[1500px] mx-auto">
          <Outlet />
        </main>
      </div>

      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        role="customer"
      />
    </div>
  );
};

export default CustomerLayout;
