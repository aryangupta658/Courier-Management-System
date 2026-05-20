import { ShieldCheck, Truck, Users, MapPinned } from "lucide-react";
import PublicNavbar from "../../components/PublicNavbar";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <section className="bg-gradient-to-br from-white via-blue-50/40 to-white py-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-3 rounded-full font-bold mb-7">
                <ShieldCheck size={18} />
                About CourierMS
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                Smart Courier Management for Modern Businesses
              </h1>

              <p className="text-slate-600 text-lg leading-relaxed mt-6">
                CourierMS is a complete courier management system designed to
                help courier businesses manage users, bookings, delivery boys,
                live tracking, payments, invoices, reports and delivery status
                updates from one clean dashboard.
              </p>

              <p className="text-slate-600 text-lg leading-relaxed mt-4">
                The goal of this project is to make courier operations faster,
                safer and more transparent for customers, admins and delivery
                partners.
              </p>
            </div>

            <div className="bg-white rounded-[32px] border shadow-xl p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InfoBox
                  icon={<Truck />}
                  title="Fast Delivery"
                  text="Quick courier processing and status updates."
                  color="text-blue-700"
                  bg="bg-blue-50"
                />

                <InfoBox
                  icon={<Users />}
                  title="Role Based"
                  text="Separate dashboards for admin, customer and delivery."
                  color="text-green-700"
                  bg="bg-green-50"
                />

                <InfoBox
                  icon={<MapPinned />}
                  title="Live Tracking"
                  text="Track delivery boy current location on map."
                  color="text-purple-700"
                  bg="bg-purple-50"
                />

                <InfoBox
                  icon={<ShieldCheck />}
                  title="Secure System"
                  text="Payment, OTP verification and protected routes."
                  color="text-orange-600"
                  bg="bg-orange-50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const InfoBox = ({ icon, title, text, bg, color }) => {
  return (
    <div className={`${bg} rounded-3xl p-5`}>
      <div className={`${color} mb-4`}>{icon}</div>
      <h3 className="font-black text-lg">{title}</h3>
      <p className="text-slate-600 text-sm mt-2">{text}</p>
    </div>
  );
};

export default About;
