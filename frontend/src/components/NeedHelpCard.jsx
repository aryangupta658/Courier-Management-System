import {
  Headphones,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

const NeedHelpCard = () => {
  return (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center shadow-md">
            <Headphones size={24} />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-gray-900">Need Help?</h3>
            <p className="text-sm text-gray-500">
              Get support for booking, payment and tracking
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <SupportInfo
            icon={<Phone size={18} />}
            title="Call Support"
            value="+91 XXXXX XXXXX"
            bg="bg-blue-50"
            color="text-blue-700"
          />

          <SupportInfo
            icon={<Mail size={18} />}
            title="Email Support"
            value="support@courierms.com"
            bg="bg-green-50"
            color="text-green-700"
          />

          <SupportInfo
            icon={<MessageCircle size={18} />}
            title="Courier Chat"
            value="Available after delivery assignment"
            bg="bg-purple-50"
            color="text-purple-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          <MiniFeature
            icon={<Clock size={17} />}
            title="Fast Reply"
            text="Quick response for your courier queries"
            bg="bg-orange-50"
            color="text-orange-600"
          />

          <MiniFeature
            icon={<ShieldCheck size={17} />}
            title="Secure Support"
            text="Safe help for payment and tracking issues"
            bg="bg-indigo-50"
            color="text-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};

const SupportInfo = ({ icon, title, value, bg, color }) => {
  return (
    <div className={`${bg} rounded-2xl p-4 flex items-center gap-3`}>
      <div
        className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${color} shadow-sm`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-semibold">{title}</p>
        <p className="text-sm font-extrabold text-gray-900 break-words">
          {value}
        </p>
      </div>
    </div>
  );
};

const MiniFeature = ({ icon, title, text, bg, color }) => {
  return (
    <div className={`${bg} rounded-2xl p-4`}>
      <div className="flex items-center gap-2">
        <div className={color}>{icon}</div>
        <p className="font-extrabold text-sm text-gray-900">{title}</p>
      </div>

      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{text}</p>
    </div>
  );
};

export default NeedHelpCard;
