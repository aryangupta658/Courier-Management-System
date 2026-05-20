import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, KeyRound, Truck, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { forgotPasswordApi, resetPasswordApi } from "../../api/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await forgotPasswordApi(email);
      toast.success(data.message || "OTP sent to your email");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await resetPasswordApi({
        email,
        otp,
        newPassword,
      });

      toast.success(data.message || "Password reset successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
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
              <Truck size={30} />
            </div>

            <h1 className="text-3xl font-extrabold text-blue-900">CourierMS</h1>

            <p className="text-blue-900/70 mt-2 font-semibold">
              Reset your password securely using email OTP.
            </p>
          </div>

          <div className="flex-1 flex items-end justify-center pb-8">
            <div className="relative w-80 h-80 flex items-center justify-center">
              <div className="absolute w-64 h-64 bg-blue-200 rounded-full opacity-70"></div>

              <div className="relative bg-white rounded-3xl shadow-xl p-8 w-64">
                <div className="w-16 h-16 bg-blue-700 text-white rounded-2xl flex items-center justify-center mb-5">
                  <KeyRound size={34} />
                </div>

                <h2 className="text-xl font-extrabold text-gray-900">
                  OTP Verification
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  Enter your email and verify OTP to set a new password.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Forgot Password
            </h2>

            <p className="text-gray-500 mt-2 mb-8">
              {step === 1
                ? "Enter your registered email to receive OTP"
                : "Enter OTP and create a new password"}
            </p>

            {step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
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
                      placeholder="Enter your registered email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition disabled:opacity-70"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    OTP
                  </label>

                  <div className="relative">
                    <KeyRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      placeholder="Enter 6 digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl pl-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition disabled:opacity-70"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}

            <div className="text-center mt-7">
              <Link
                to="/login"
                className="text-blue-700 font-bold hover:text-blue-900"
              >
                Back to Login
              </Link>
            </div>

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

export default ForgotPassword;
