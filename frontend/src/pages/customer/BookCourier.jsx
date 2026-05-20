import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourierApi } from "../../api/courierApi";
import { createRazorpayOrderApi, verifyPaymentApi } from "../../api/paymentApi";
import { useAuth } from "../../context/AuthContext";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const BookCourier = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    senderName: user?.user?.name || "",
    senderPhone: user?.user?.phone || "",
    pickupAddress: user?.user?.address || "",
    receiverName: "",
    receiverPhone: "",
    receiverEmail: "",
    deliveryAddress: "",
    parcelType: "",
    parcelWeight: "",
    parcelDescription: "",
    deliveryType: "normal",
  });

  const getPriceBreakdown = () => {
    const weight = Number(formData.parcelWeight) || 0;

    const basePrice = 100;
    const weightCharge = weight * 40;
    const deliveryCharge = formData.deliveryType === "express" ? 100 : 50;

    const total = basePrice + weightCharge + deliveryCharge;

    return {
      basePrice,
      weightCharge,
      deliveryCharge,
      total,
    };
  };

  const calculateEstimatedDeliveryDate = () => {
    const date = new Date();

    if (formData.deliveryType === "express") {
      date.setDate(date.getDate() + 2);
    } else {
      date.setDate(date.getDate() + 5);
    }

    return date.toLocaleDateString();
  };

  const priceBreakdown = getPriceBreakdown();
  const price = priceBreakdown.total;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOpenConfirm = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handlePaymentAndBooking = async () => {
    try {
      setLoading(true);

      if (!window.Razorpay) {
        toast.error(
          "Razorpay script not loaded. Add Razorpay script in index.html"
        );
        return;
      }

      if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
        toast.error("VITE_RAZORPAY_KEY_ID missing in frontend .env");
        return;
      }

      const orderData = await createRazorpayOrderApi(price);

      if (!orderData?.success || !orderData?.order?.id) {
        toast.error(
          orderData?.message || "Razorpay order was not created properly"
        );
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "CourierMS",
        description: "Courier Booking Payment",
        order_id: orderData.order.id,

        handler: async function (response) {
          try {
            const verifyData = await verifyPaymentApi({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (!verifyData.success) {
              toast.error(verifyData.message || "Payment verification failed");
              return;
            }

            const bookingPayload = {
              ...formData,
              parcelWeight: Number(formData.parcelWeight),
              deliveryType: formData.deliveryType,
              price,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
            };

            await createCourierApi(bookingPayload);

            toast.success("Courier booked successfully");

            setTimeout(() => {
              navigate("/customer/my-couriers");
            }, 900);
          } catch (error) {
            console.log("Booking error:", error);
            toast.error(
              error.response?.data?.message || "Courier booking failed"
            );
          }
        },

        prefill: {
          name: user?.user?.name || "",
          email: user?.user?.email || "",
          contact: user?.user?.phone || "",
        },

        theme: {
          color: "#1d4ed8",
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      setShowConfirmModal(false);
    } catch (error) {
      console.log("Payment create order error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Payment failed. Check backend terminal and Network tab."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Book Courier</h1>

      <form
        onSubmit={handleOpenConfirm}
        className="bg-white rounded-3xl border shadow-sm p-6 space-y-6"
      >
        <SectionTitle title="Sender Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Sender Name"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            required
          />

          <Input
            label="Sender Phone"
            name="senderPhone"
            value={formData.senderPhone}
            onChange={handleChange}
            required
          />

          <Textarea
            label="Pickup Address"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            required
          />
        </div>

        <SectionTitle title="Receiver Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Receiver Name"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            required
          />

          <Input
            label="Receiver Phone"
            name="receiverPhone"
            value={formData.receiverPhone}
            onChange={handleChange}
            required
          />

          <Input
            label="Receiver Email"
            name="receiverEmail"
            type="email"
            value={formData.receiverEmail}
            onChange={handleChange}
          />

          <Textarea
            label="Delivery Address"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
          />
        </div>

        <SectionTitle title="Parcel Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Parcel Type"
            name="parcelType"
            value={formData.parcelType}
            onChange={handleChange}
            placeholder="Documents, electronics, clothes..."
            required
          />

          <Input
            label="Parcel Weight"
            name="parcelWeight"
            type="number"
            value={formData.parcelWeight}
            onChange={handleChange}
            required
          />

          <div>
            <label className="text-sm font-semibold">Delivery Type</label>
            <select
              name="deliveryType"
              value={formData.deliveryType}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="normal">Normal Delivery</option>
              <option value="express">Express Delivery</option>
            </select>
          </div>

          <Textarea
            label="Parcel Description"
            name="parcelDescription"
            value={formData.parcelDescription}
            onChange={handleChange}
          />
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="text-gray-600">Estimated Delivery</p>
              <h3 className="text-xl font-extrabold">
                {calculateEstimatedDeliveryDate()}
              </h3>
            </div>

            <div>
              <p className="text-gray-600">Total Estimated Price</p>
              <h3 className="text-3xl font-extrabold text-blue-700">
                ₹{price}
              </h3>
            </div>
          </div>

          <div className="mt-5 bg-white rounded-2xl border border-blue-100 p-4">
            <h4 className="font-extrabold mb-3">Price Breakdown</h4>

            <div className="space-y-3 text-sm">
              <PriceRow
                label="Base Price"
                value={`₹${priceBreakdown.basePrice}`}
              />

              <PriceRow
                label={`Weight Charge (${
                  Number(formData.parcelWeight) || 0
                } kg × ₹40)`}
                value={`₹${priceBreakdown.weightCharge}`}
              />

              <PriceRow
                label={
                  formData.deliveryType === "express"
                    ? "Express Delivery Charge"
                    : "Normal Delivery Charge"
                }
                value={`₹${priceBreakdown.deliveryCharge}`}
              />

              <div className="border-t pt-3 flex items-center justify-between">
                <span className="font-extrabold text-gray-900">
                  Final Amount
                </span>
                <span className="font-extrabold text-blue-700 text-xl">
                  ₹{price}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold disabled:opacity-70"
        >
          Continue
        </button>
      </form>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-extrabold">
                Confirm Courier Details
              </h2>

              <button onClick={() => setShowConfirmModal(false)}>
                <X />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ConfirmItem
                label="Sender"
                value={`${formData.senderName} | ${formData.senderPhone}`}
              />

              <ConfirmItem
                label="Receiver"
                value={`${formData.receiverName} | ${formData.receiverPhone}`}
              />

              <ConfirmItem
                label="Receiver Email"
                value={formData.receiverEmail || "N/A"}
              />

              <ConfirmItem
                label="Pickup Address"
                value={formData.pickupAddress}
              />

              <ConfirmItem
                label="Delivery Address"
                value={formData.deliveryAddress}
              />

              <ConfirmItem label="Parcel Type" value={formData.parcelType} />

              <ConfirmItem
                label="Weight"
                value={`${formData.parcelWeight} kg`}
              />

              <ConfirmItem
                label="Delivery Type"
                value={formData.deliveryType}
              />

              <ConfirmItem
                label="Estimated Delivery"
                value={calculateEstimatedDeliveryDate()}
              />

              <ConfirmItem
                label="Base Price"
                value={`₹${priceBreakdown.basePrice}`}
              />

              <ConfirmItem
                label="Weight Charge"
                value={`₹${priceBreakdown.weightCharge}`}
              />

              <ConfirmItem
                label="Delivery Charge"
                value={`₹${priceBreakdown.deliveryCharge}`}
              />

              <div className="md:col-span-2 bg-blue-50 rounded-2xl p-4">
                <p className="text-gray-500">Final Amount</p>
                <p className="font-extrabold text-blue-700 text-3xl mt-1">
                  ₹{price}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-6 py-3 rounded-xl border font-bold"
              >
                Edit Details
              </button>

              <button
                onClick={handlePaymentAndBooking}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-blue-700 text-white font-bold disabled:opacity-70"
              >
                {loading ? "Processing..." : "Confirm & Pay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({ title }) => {
  return <h2 className="text-xl font-extrabold border-b pb-2">{title}</h2>;
};

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}) => {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const Textarea = ({ label, name, value, onChange, required }) => {
  return (
    <div className="md:col-span-2">
      <label className="text-sm font-semibold">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border rounded-xl px-4 py-3 mt-1 min-h-24 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const PriceRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-gray-600">{label}</span>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
};

const ConfirmItem = ({ label, value }) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <p className="text-gray-500">{label}</p>
      <p className="font-bold mt-1 break-words">{value}</p>
    </div>
  );
};

export default BookCourier;
