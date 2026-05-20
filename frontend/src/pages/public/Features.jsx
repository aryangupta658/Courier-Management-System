import {
  CalendarCheck,
  UserRound,
  MapPin,
  BarChart3,
  CreditCard,
  MessageCircle,
} from "lucide-react";
import PublicNavbar from "../../components/PublicNavbar";

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <section className="bg-gradient-to-br from-white via-blue-50/40 to-white py-20">
        <div className="max-w-[1300px] mx-auto px-5 md:px-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-slate-950">
            Powerful Features
          </h1>

          <p className="text-slate-600 mt-5 text-lg max-w-3xl mx-auto">
            CourierMS gives customers, admins, and delivery partners everything
            they need to manage courier operations smoothly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 text-left">
            <FeatureCard
              icon={<CalendarCheck size={36} />}
              title="Easy Courier Booking"
              text="Customers can book couriers with sender, receiver, parcel, pickup and delivery details."
              color="text-blue-700"
              bg="bg-blue-50"
            />

            <FeatureCard
              icon={<CreditCard size={36} />}
              title="Online Payment"
              text="Secure payment flow with invoice/payment proof after successful booking."
              color="text-green-700"
              bg="bg-green-50"
            />

            <FeatureCard
              icon={<UserRound size={36} />}
              title="Delivery Boy Assignment"
              text="Admin can assign delivery partners and manage all courier operations."
              color="text-orange-600"
              bg="bg-orange-50"
            />

            <FeatureCard
              icon={<MapPin size={36} />}
              title="Live Location Tracking"
              text="Customers can track courier location in real-time using an interactive map."
              color="text-purple-700"
              bg="bg-purple-50"
            />

            <FeatureCard
              icon={<MessageCircle size={36} />}
              title="Courier Chat"
              text="Customer and delivery partner can chat after courier assignment."
              color="text-pink-700"
              bg="bg-pink-50"
            />

            <FeatureCard
              icon={<BarChart3 size={36} />}
              title="Reports & Analytics"
              text="Admin can view courier status, payments, users, and revenue insights."
              color="text-indigo-700"
              bg="bg-indigo-50"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, text, bg, color }) => {
  return (
    <div className="bg-white border rounded-3xl p-7 shadow-sm hover:shadow-xl transition">
      <div
        className={`w-18 h-18 ${bg} ${color} rounded-2xl flex items-center justify-center mb-5`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-black mb-3">{title}</h3>

      <p className="text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
};

export default Features;
