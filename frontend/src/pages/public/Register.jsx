import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Truck,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { toast } from "react-toastify";
import { registerUserApi } from "../../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUserApi(formData);

      toast.success("Account created successfully. Please login.");

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#edf4ff] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-[28px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1fr]">
        <div className="relative hidden md:flex flex-col bg-gradient-to-br from-[#d9e8ff] to-[#c6d7ff] p-10 overflow-hidden">
          <div className="z-10">
            <div className="w-14 h-14 bg-blue-700 text-white rounded-2xl flex items-center justify-center shadow-lg mb-5">
              <ShieldCheck size={30} />
            </div>

            <h1 className="text-3xl font-extrabold text-blue-900">CourierMS</h1>

            <p className="text-blue-900/70 mt-2 font-semibold">
              Fast. Safe. Reliable.
            </p>
          </div>

          <MapPin size={58} className="absolute top-36 right-14 text-red-400" />

          <div className="flex-1 flex items-end justify-center pb-8">
            <div className="relative w-80 h-80 flex items-end justify-center">
              <div className="absolute bottom-0 w-72 h-40 bg-blue-200 rounded-t-full opacity-70"></div>

              <div className="relative w-48 h-56 flex flex-col items-center justify-end">
                <div className="w-24 h-24 rounded-full bg-blue-900 mb-[-10px]"></div>
                <div className="w-40 h-40 bg-blue-700 rounded-t-3xl"></div>
                <div className="absolute right-0 bottom-14 bg-orange-300 border-4 border-orange-500 w-28 h-24 rounded-xl shadow-xl flex items-center justify-center">
                  <Truck className="text-orange-800" size={38} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2 mb-8">Register to get started</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputIcon
                icon={<User size={18} />}
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <InputIcon
                icon={<Mail size={18} />}
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <InputIcon
                icon={<Phone size={18} />}
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="customer">Customer</option>
                <option value="delivery">Delivery</option>
              </select>

              <textarea
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
              />

              <button
                disabled={loading}
                className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

            <p className="text-center mt-7 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 font-bold">
                Login
              </Link>
            </p>

            <div className="text-center mt-4">
              <Link
                to="/"
                className="text-gray-500 text-sm hover:text-blue-700"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputIcon = ({
  icon,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Register;
