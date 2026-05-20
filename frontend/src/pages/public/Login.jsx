import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Truck, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);
      const role = data.user.role;

      toast.success("Login successful");

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "delivery") {
          navigate("/delivery/dashboard");
        } else {
          navigate("/customer/dashboard");
        }
      }, 700);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#edf4ff] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-[28px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1fr]">
        <div className="relative hidden md:flex flex-col bg-gradient-to-br from-[#d9e8ff] to-[#c6d7ff] p-10 overflow-hidden">
          <div className="z-10">
            <div className="w-14 h-14 bg-blue-700 text-white rounded-2xl flex items-center justify-center shadow-lg mb-5">
              <Truck size={30} />
            </div>

            <h1 className="text-3xl font-extrabold text-blue-900">CourierMS</h1>

            <p className="text-blue-900/70 mt-2 font-semibold">
              Fast. Safe. Reliable.
            </p>
          </div>

          <MapPin size={58} className="absolute top-36 right-14 text-red-400" />

          <div className="flex-1 flex items-end justify-center pb-6">
            <div className="relative w-80 h-80 flex items-end justify-center">
              <div className="absolute bottom-0 w-72 h-40 bg-blue-200 rounded-t-full opacity-70"></div>

              <div className="relative bg-blue-700 w-56 h-28 rounded-2xl shadow-xl flex items-end p-4">
                <div className="absolute -top-8 left-8 bg-white w-24 h-12 rounded-xl shadow"></div>
                <div className="absolute -right-8 bottom-0 bg-blue-800 w-20 h-20 rounded-xl"></div>

                <div className="absolute -bottom-5 left-8 w-10 h-10 bg-gray-900 rounded-full border-4 border-white"></div>
                <div className="absolute -bottom-5 right-8 w-10 h-10 bg-gray-900 rounded-full border-4 border-white"></div>

                <div className="text-white font-bold text-lg">Express Van</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2 mb-8">Login to your account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs text-blue-700 font-semibold hover:text-blue-900"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
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
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="w-4 h-4" />
                <span>Remember me</span>
              </div>

              <button
                disabled={loading}
                className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center mt-7 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-700 font-bold">
                Register
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

export default Login;
