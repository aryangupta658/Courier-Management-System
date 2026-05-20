import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import PublicNavbar from "../../components/PublicNavbar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      <section className="bg-gradient-to-br from-white via-blue-50/40 to-white py-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <h1 className="text-5xl md:text-6xl font-black text-slate-950">
              Contact Us
            </h1>

            <p className="text-slate-600 mt-5 text-lg">
              Need help with courier booking, tracking or payment? Contact us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
            <div className="space-y-5">
              <ContactCard
                icon={<Phone />}
                title="Phone"
                value="+91 XXXXX XXXXX"
                bg="bg-blue-50"
                color="text-blue-700"
              />

              <ContactCard
                icon={<Mail />}
                title="Email"
                value="support@courierms.com"
                bg="bg-green-50"
                color="text-green-700"
              />

              <ContactCard
                icon={<MapPin />}
                title="Office"
                value="CourierMS Office, India"
                bg="bg-purple-50"
                color="text-purple-700"
              />

              <ContactCard
                icon={<Clock />}
                title="Support Time"
                value="Monday - Saturday, 9 AM - 6 PM"
                bg="bg-orange-50"
                color="text-orange-600"
              />
            </div>

            <div className="bg-white border rounded-[32px] shadow-xl p-7">
              <h2 className="text-2xl font-black mb-6">Send Message</h2>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input label="Full Name" placeholder="Enter your name" />
                  <Input label="Email Address" placeholder="Enter your email" />
                </div>

                <Input label="Subject" placeholder="Enter subject" />

                <div>
                  <label className="text-sm font-bold text-slate-700">
                    Message
                  </label>

                  <textarea
                    placeholder="Write your message..."
                    className="w-full border rounded-xl px-4 py-3 mt-2 min-h-36 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="button"
                  className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold inline-flex items-center gap-3 hover:bg-blue-800 transition"
                >
                  <Send size={19} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactCard = ({ icon, title, value, bg, color }) => {
  return (
    <div className={`${bg} rounded-3xl p-5 flex items-center gap-4`}>
      <div
        className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center ${color} shadow-sm`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500 font-bold">{title}</p>
        <p className="font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
};

const Input = ({ label, placeholder }) => {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full border rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Contact;
