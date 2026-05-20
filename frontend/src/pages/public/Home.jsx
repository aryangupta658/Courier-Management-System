import { Link } from "react-router-dom";
import {
  Box,
  CalendarCheck,
  CheckCircle,
  MapPin,
  ShieldCheck,
  Truck,
  UserRound,
  Navigation,
  Route,
  PackageCheck,
  Clock,
  Search,
  CreditCard,
  BarChart3,
} from "lucide-react";
import PublicNavbar from "../../components/PublicNavbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-slate-950 overflow-x-hidden">
      <PublicNavbar />

      <section className="bg-gradient-to-br from-white via-blue-50/40 to-white border-b border-slate-200">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[0.82fr_1.28fr] gap-10 lg:gap-14 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 sm:px-5 py-3 rounded-full font-bold mb-7">
              <ShieldCheck size={18} />
              <span className="text-sm sm:text-base">
                Reliable · Fast · Secure
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
              Manage Your Couriers
              <span className="block text-blue-700 mt-2">The Smart Way</span>
            </h2>

            <p className="mt-6 sm:mt-7 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Book couriers, assign delivery boys, update delivery status, and
              track parcels live on an interactive map.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-3 bg-blue-700 text-white px-7 sm:px-8 py-4 rounded-xl font-bold text-base sm:text-lg shadow-xl shadow-blue-200 hover:bg-blue-800 transition"
              >
                <Navigation size={21} />
                Get Started
              </Link>

              <Link
                to="/track"
                className="inline-flex items-center justify-center gap-3 bg-white border-2 border-blue-700 text-slate-950 px-7 sm:px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-50 transition"
              >
                Track a Courier
                <MapPin size={21} className="text-blue-700" />
              </Link>
            </div>
          </div>

          <div className="relative w-full">
            <div className="relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-blue-100 via-blue-50 to-green-50 p-4 sm:p-5 md:p-7 shadow-lg overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-300/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-green-300/30 rounded-full blur-3xl"></div>

              <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1.35fr_1fr] gap-5 lg:gap-6">
                <div className="bg-white rounded-[26px] sm:rounded-[32px] p-4 sm:p-6 shadow-sm min-h-[390px] sm:min-h-[430px] lg:min-h-[455px] flex flex-col">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-slate-500 font-bold">
                        Live Courier
                      </p>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                        Tracking Dashboard
                      </h3>
                    </div>

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-lg shrink-0">
                      <Truck size={25} />
                    </div>
                  </div>

                  <div className="relative flex-1 min-h-[280px] sm:min-h-[315px] rounded-[24px] sm:rounded-[28px] bg-slate-50 overflow-hidden border border-slate-100">
                    <div className="absolute inset-0 opacity-80">
                      <div className="absolute left-[18%] top-0 bottom-0 w-[2px] bg-white"></div>
                      <div className="absolute left-[45%] top-0 bottom-0 w-[2px] bg-white"></div>
                      <div className="absolute left-[72%] top-0 bottom-0 w-[2px] bg-white"></div>

                      <div className="absolute top-[22%] left-0 right-0 h-[2px] bg-white"></div>
                      <div className="absolute top-[48%] left-0 right-0 h-[2px] bg-white"></div>
                      <div className="absolute top-[73%] left-0 right-0 h-[2px] bg-white"></div>
                    </div>

                    <svg
                      viewBox="0 0 620 330"
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M60 270 C145 215, 230 245, 300 185 C380 115, 465 135, 565 65"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="16 16"
                      />

                      <path
                        d="M70 95 C155 165, 250 75, 350 115 C450 155, 485 215, 585 190"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />

                      <path
                        d="M25 185 C115 145, 160 210, 230 172 C330 118, 410 260, 605 265"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="absolute left-[7%] bottom-[17%]">
                      <div className="w-11 h-11 sm:w-13 sm:h-13 bg-green-500 text-white rounded-2xl shadow-lg flex items-center justify-center">
                        <PackageCheck size={22} />
                      </div>
                      <div className="mt-2 bg-white rounded-xl px-3 py-1 text-[10px] sm:text-xs font-black shadow-sm">
                        Pickup
                      </div>
                    </div>

                    <div className="absolute right-[7%] top-[12%]">
                      <div className="w-11 h-11 sm:w-13 sm:h-13 bg-red-500 text-white rounded-2xl shadow-lg flex items-center justify-center">
                        <MapPin size={22} />
                      </div>
                      <div className="mt-2 bg-white rounded-xl px-3 py-1 text-[10px] sm:text-xs font-black shadow-sm">
                        Drop
                      </div>
                    </div>

                    <div className="absolute left-[47%] top-[41%]">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-25"></div>
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-blue-700 text-white rounded-[24px] sm:rounded-[28px] shadow-xl flex items-center justify-center border-4 border-white">
                          <Truck size={30} />
                        </div>
                      </div>
                    </div>

                    <div className="absolute left-3 right-3 sm:left-5 sm:right-5 bottom-3 sm:bottom-5 bg-white/95 backdrop-blur rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-lg border border-slate-100">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] sm:text-xs text-slate-500 font-bold">
                            Current Delivery
                          </p>
                          <h4 className="font-black text-slate-950 text-sm sm:text-base truncate">
                            CMS2026982705
                          </h4>
                        </div>

                        <div className="px-3 py-2 rounded-full bg-green-50 text-green-700 text-[10px] sm:text-xs font-black shrink-0">
                          Live
                        </div>
                      </div>

                      <div className="mt-3 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[68%] bg-blue-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-[26px] sm:rounded-[32px] shadow-xl p-4 sm:p-6 min-h-[390px] sm:min-h-[430px] lg:min-h-[455px] flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-xs sm:text-sm text-slate-500 font-bold">
                        CourierMS
                      </p>
                      <h3 className="text-xl sm:text-2xl font-black">
                        Overview
                      </h3>
                    </div>

                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center">
                      <BarChart3 size={24} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <OverviewCard
                      icon={<Box size={22} />}
                      label="Total Couriers"
                      value="120"
                      color="text-blue-700"
                    />

                    <OverviewCard
                      icon={<CheckCircle size={23} />}
                      label="Delivered"
                      value="80"
                      color="text-green-600"
                    />

                    <OverviewCard
                      icon={<Truck size={23} />}
                      label="In Transit"
                      value="25"
                      color="text-orange-500"
                    />
                  </div>

                  <div className="mt-5 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border border-blue-100 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-center">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-30"></div>
                          <div className="relative w-12 h-12 bg-white text-purple-700 rounded-2xl flex items-center justify-center shadow-sm">
                            <MapPin size={24} />
                          </div>
                        </div>

                        <div>
                          <p className="font-black text-slate-950">
                            Live Tracking
                          </p>
                          <p className="text-xs text-slate-500 font-semibold leading-tight">
                            Real-time map updates
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/track"
                        className="bg-purple-700 text-white px-4 py-3 rounded-xl text-sm font-black hover:bg-purple-800 transition text-center"
                      >
                        View Map
                      </Link>
                    </div>

                    <div className="mt-4 bg-white rounded-2xl p-4">
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-slate-500 font-bold">
                          Current Status
                        </span>
                        <span className="text-green-600 font-black">
                          Active
                        </span>
                      </div>

                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-[72%] bg-blue-700 rounded-full"></div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                        <MiniStatus
                          icon={<PackageCheck size={16} />}
                          text="Booked"
                        />
                        <MiniStatus icon={<Route size={16} />} text="Transit" />
                        <MiniStatus icon={<Clock size={16} />} text="ETA" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 bg-slate-50 rounded-3xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-blue-700 text-white rounded-2xl flex items-center justify-center shrink-0">
                        <Search size={21} />
                      </div>

                      <div>
                        <p className="font-black text-slate-950">
                          Quick Search
                        </p>
                        <p className="text-xs text-slate-500 font-semibold">
                          Track by courier ID
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20 bg-white">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center">
            <div className="w-16 h-1 bg-blue-700 rounded-full mx-auto mb-7" />

            <h2 className="text-3xl md:text-4xl font-black">
              Everything You Need in One Place
            </h2>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <FeatureCard
              icon={<CalendarCheck size={38} />}
              title="Easy Booking"
              text="Book couriers in just a few steps with all the required details."
              bg="bg-blue-50"
              color="text-blue-700"
            />

            <FeatureCard
              icon={<UserRound size={38} />}
              title="Assign Delivery Boys"
              text="Assign delivery boys and manage deliveries efficiently."
              bg="bg-green-50"
              color="text-green-600"
            />

            <FeatureCard
              icon={<MapPin size={38} />}
              title="Live Tracking"
              text="Track parcels in real-time on our interactive live map."
              bg="bg-orange-50"
              color="text-orange-500"
            />

            <FeatureCard
              icon={<CreditCard size={38} />}
              title="Secure Payment"
              text="Generate invoice and payment proof after successful booking."
              bg="bg-purple-50"
              color="text-purple-600"
            />
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-white py-8">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black">
              Courier<span className="text-blue-500">MS</span>
            </h3>

            <p className="text-slate-400 text-sm mt-1">
              Fast. Reliable. Smart courier management.
            </p>
          </div>

          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} CourierMS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const OverviewCard = ({ icon, label, value, color }) => {
  return (
    <div className="border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3 bg-white hover:shadow-md transition">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`${color} shrink-0`}>{icon}</div>
        <span className="font-bold text-slate-600 text-sm sm:text-base truncate">
          {label}
        </span>
      </div>

      <span className={`text-xl sm:text-2xl font-black ${color} shrink-0`}>
        {value}
      </span>
    </div>
  );
};

const MiniStatus = ({ icon, text }) => {
  return (
    <div className="bg-slate-50 rounded-xl py-2 px-2">
      <div className="flex justify-center text-blue-700">{icon}</div>
      <p className="text-[11px] font-black text-slate-600 mt-1">{text}</p>
    </div>
  );
};

const FeatureCard = ({ icon, title, text, bg, color }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition">
      <div
        className={`w-20 h-20 rounded-2xl ${bg} ${color} flex items-center justify-center mb-5`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-black mb-3">{title}</h3>

      <p className="text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
};

export default Home;
