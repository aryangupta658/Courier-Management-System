import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import jsPDF from "jspdf";
import { Download, ArrowLeft } from "lucide-react";
import { getCourierByIdApi } from "../../api/courierApi";

const Invoice = () => {
  const { id } = useParams();

  const [courier, setCourier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        const data = await getCourierByIdApi(id);
        setCourier(data.courier);
      } catch (error) {
        console.log(error.response?.data?.message);
        alert(error.response?.data?.message || "Failed to load invoice");
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [id]);

  const downloadInvoice = () => {
    if (!courier) return;

    try {
      setDownloading(true);

      const pdf = new jsPDF("p", "mm", "a4");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(24);
      pdf.text("CourierMS", 15, 18);

      pdf.setFontSize(14);
      pdf.text("Payment Invoice / Proof", 15, 28);

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 150, 18);

      pdf.line(15, 35, 195, 35);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(13);
      pdf.text("Courier Details", 15, 48);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);

      let y = 60;

      const addRow = (label, value) => {
        pdf.setFont("helvetica", "bold");
        pdf.text(`${label}:`, 15, y);

        pdf.setFont("helvetica", "normal");
        const text = String(value || "N/A");
        const splitText = pdf.splitTextToSize(text, 120);
        pdf.text(splitText, 65, y);

        y += splitText.length > 1 ? splitText.length * 7 : 8;
      };

      addRow("Tracking ID", courier.trackingId);
      addRow("Status", courier.status);
      addRow("Payment Status", courier.paymentStatus);
      addRow("Payment ID", courier.razorpayPaymentId);
      addRow("Sender", `${courier.senderName} (${courier.senderPhone})`);
      addRow("Receiver", `${courier.receiverName} (${courier.receiverPhone})`);
      addRow("Pickup Address", courier.pickupAddress);
      addRow("Delivery Address", courier.deliveryAddress);
      addRow("Parcel Type", courier.parcelType);
      addRow("Weight", `${courier.parcelWeight} kg`);
      addRow("Delivery Type", courier.deliveryType);
      addRow(
        "Estimated Delivery",
        courier.estimatedDeliveryDate
          ? new Date(courier.estimatedDeliveryDate).toLocaleDateString()
          : "Not available"
      );

      pdf.line(15, y + 5, 195, y + 5);

      y += 18;

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("Total Paid", 15, y);

      pdf.setFontSize(20);
      pdf.text(`Rs. ${courier.price}`, 160, y);

      y += 20;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(
        "This invoice is computer generated and acts as payment proof for your courier booking.",
        15,
        y
      );

      pdf.save(`CourierMS-Invoice-${courier.trackingId}.pdf`);
    } catch (error) {
      console.log(error);
      alert("Invoice download failed");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading invoice...</p>;
  }

  if (!courier) {
    return <p className="text-red-600">Invoice not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={downloadInvoice}
          disabled={downloading}
          className="bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <Download size={18} />
          {downloading ? "Downloading..." : "Download Payment Proof"}
        </button>

        <Link
          to="/customer/my-couriers"
          className="bg-white border px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border p-6 md:p-8 max-w-4xl">
        <div className="flex items-start justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700">
              CourierMS
            </h1>
            <p className="text-gray-500 mt-1">Payment Invoice / Proof</p>
          </div>

          <div className="text-right">
            <p className="font-bold text-gray-800">Invoice</p>
            <p className="text-sm text-gray-500">
              Date: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <div className="bg-blue-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">Tracking ID</p>
            <h2 className="font-extrabold text-blue-700 mt-1">
              {courier.trackingId}
            </h2>
          </div>

          <div className="bg-green-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500">Payment Status</p>
            <h2 className="font-extrabold text-green-700 mt-1">
              {courier.paymentStatus}
            </h2>
          </div>

          <Info
            label="Sender"
            value={`${courier.senderName} | ${courier.senderPhone}`}
          />
          <Info
            label="Receiver"
            value={`${courier.receiverName} | ${courier.receiverPhone}`}
          />
          <Info label="Pickup Address" value={courier.pickupAddress} />
          <Info label="Delivery Address" value={courier.deliveryAddress} />
          <Info label="Parcel Type" value={courier.parcelType} />
          <Info label="Weight" value={`${courier.parcelWeight} kg`} />
          <Info label="Delivery Type" value={courier.deliveryType} />

          <Info
            label="Estimated Delivery"
            value={
              courier.estimatedDeliveryDate
                ? new Date(courier.estimatedDeliveryDate).toLocaleDateString()
                : "Not available"
            }
          />

          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Payment ID</p>
            <p className="font-bold break-all">
              {courier.razorpayPaymentId || "N/A"}
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-6">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">Total Paid</p>
            <p className="text-3xl font-extrabold text-blue-700">
              ₹{courier.price}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 rounded-2xl p-4">
          <p className="text-sm text-gray-500">
            This invoice is computer generated and acts as payment proof for
            your courier booking.
          </p>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-bold capitalize">{value || "N/A"}</p>
    </div>
  );
};

export default Invoice;
