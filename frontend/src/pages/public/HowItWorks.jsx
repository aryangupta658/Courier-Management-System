import {
  ClipboardList,
  CreditCard,
  UserCheck,
  MapPinned,
  PackageCheck,
} from "lucide-react";
import PublicNavbar from "../../components/PublicNavbar";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <section className="bg-gradient-to-br from-white via-blue-50/40 to-white py-20">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <h1 className="text-5xl md:text-6xl font-black text-slate-950">
              How It Works
            </h1>

            <p className="text-slate-600 mt-5 text-lg">
              A simple courier management workflow from booking to delivery.
            </p>
          </div>

          <div className="space-y-6">
            <Step
              number="01"
              icon={<ClipboardList />}
              title="Customer Books Courier"
              text="Customer enters sender, receiver, parcel, pickup and delivery details."
            />

            <Step
              number="02"
              icon={<CreditCard />}
              title="Customer Confirms & Pays"
              text="System calculates estimated price. Customer confirms details and completes payment."
            />

            <Step
              number="03"
              icon={<UserCheck />}
              title="Admin Assigns Delivery Partner"
              text="Admin reviews courier order and assigns it to a delivery boy."
            />

            <Step
              number="04"
              icon={<MapPinned />}
              title="Live Tracking Starts"
              text="Delivery boy updates status and shares live location during delivery."
            />

            <Step
              number="05"
              icon={<PackageCheck />}
              title="Proof & OTP Delivery"
              text="Delivery boy uploads proof photo, receiver verifies OTP, and courier becomes delivered."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Step = ({ number, icon, title, text }) => {
  return (
    <div className="bg-white border rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-5 md:items-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-black text-xl">
        {number}
      </div>

      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h3 className="text-xl font-black">{title}</h3>
        <p className="text-slate-600 mt-1">{text}</p>
      </div>
    </div>
  );
};

export default HowItWorks;
