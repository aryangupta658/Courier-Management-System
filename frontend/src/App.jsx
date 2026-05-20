import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RoleRoute from "./components/RoleRoute";

import Home from "./pages/public/Home";
import Features from "./pages/public/Features";
import HowItWorks from "./pages/public/HowItWorks";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import TrackCourier from "./pages/public/TrackCourier";
import ForgotPassword from "./pages/public/ForgotPassword";

import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import DeliveryLayout from "./layouts/DeliveryLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCouriers from "./pages/admin/ManageCouriers";
import ManageUsers from "./pages/admin/ManageUsers";
import Reports from "./pages/admin/Reports";

import CustomerDashboard from "./pages/customer/CustomerDashboard";
import BookCourier from "./pages/customer/BookCourier";
import MyCouriers from "./pages/customer/MyCouriers";
import LiveTrack from "./pages/customer/LiveTrack";
import Invoice from "./pages/customer/Invoice";
import CustomerChat from "./pages/customer/CustomerChat";
import CustomerChats from "./pages/customer/CustomerChats";

import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
import AssignedCouriers from "./pages/delivery/AssignedCouriers";
import ShareLocation from "./pages/delivery/ShareLocation";
import DeliveryChats from "./pages/delivery/DeliveryChats";
import DeliveryLiveTracking from "./pages/delivery/DeliveryLiveTracking";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Public Tracking Page */}
        <Route path="/track" element={<TrackCourier />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </RoleRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="couriers" element={<ManageCouriers />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Customer Routes */}
        <Route
          path="/customer"
          element={
            <RoleRoute allowedRoles={["customer"]}>
              <CustomerLayout />
            </RoleRoute>
          }
        >
          <Route
            index
            element={<Navigate to="/customer/dashboard" replace />}
          />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="book-courier" element={<BookCourier />} />
          <Route path="my-couriers" element={<MyCouriers />} />
          <Route path="chats" element={<CustomerChats />} />
          <Route path="chat/:trackingId" element={<CustomerChat />} />
          <Route path="live-track/:trackingId" element={<LiveTrack />} />
          <Route path="invoice/:id" element={<Invoice />} />
        </Route>

        {/* Delivery Routes */}
        <Route
          path="/delivery"
          element={
            <RoleRoute allowedRoles={["delivery"]}>
              <DeliveryLayout />
            </RoleRoute>
          }
        >
          <Route
            index
            element={<Navigate to="/delivery/dashboard" replace />}
          />
          <Route path="dashboard" element={<DeliveryDashboard />} />
          <Route path="assigned-couriers" element={<AssignedCouriers />} />
          <Route path="chats" element={<DeliveryChats />} />
          <Route path="live-tracking" element={<DeliveryLiveTracking />} />
          <Route
            path="share-location/:trackingId/:courierId"
            element={<ShareLocation />}
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
