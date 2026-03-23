import type { NextPage } from "next";
import { BsShareFill, BsFillPencilFill } from "react-icons/bs";
import { MdManageHistory, MdNature, MdUpdate, MdOutlineEdit } from "react-icons/md";

const features = [
  {
    icon: <BsFillPencilFill className="w-6 h-6 text-white" />,
    title: "Easily Create Digital Business Cards",
    desc: "Build a professional card in minutes with our intuitive editor.",
    tag: "✦ Quick setup",
    iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-700",
    cardBg: "bg-blue-50",
    tagColor: "text-indigo-500",
  },
  {
    icon: <BsShareFill className="w-6 h-6 text-white" />,
    title: "Share With Anyone",
    desc: "Send your card via QR code, link, email, or social media instantly.",
    tag: "✦ Instant sharing",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-700",
    cardBg: "bg-purple-50",
    tagColor: "text-purple-500",
  },
  {
    icon: <MdManageHistory className="w-6 h-6 text-white" />,
    title: "Manage Contacts Seamlessly",
    desc: "Keep all your connections organized in one place.",
    tag: "✦ Stay organized",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-700",
    cardBg: "bg-green-50",
    tagColor: "text-emerald-600",
  },
  {
    icon: <MdNature className="w-6 h-6 text-white" />,
    title: "Environment Friendly",
    desc: "Go paperless and reduce your carbon footprint with digital cards.",
    tag: "✦ Go green",
    iconBg: "bg-gradient-to-br from-orange-400 to-orange-600",
    cardBg: "bg-orange-50",
    tagColor: "text-orange-500",
  },
  {
    icon: <MdOutlineEdit className="w-6 h-6 text-white" />,
    title: "Fully Customizable",
    desc: "Match your card to your brand with colors, logos, and more.",
    tag: "✦ Your style",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
    cardBg: "bg-pink-50",
    tagColor: "text-pink-500",
  },
  {
    icon: <MdUpdate className="w-6 h-6 text-white" />,
    title: "Update Anytime",
    desc: "Changed jobs? Update your card once and everyone sees it instantly.",
    tag: "✦ Always current",
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-600",
    cardBg: "bg-teal-50",
    tagColor: "text-teal-600",
  },
];

const Feature: NextPage = () => {
  return (
    <section id="features" className="bg-white py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Our Product Features
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto font-normal">
            Everything you need to create and manage your professional digital identity in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`${f.cardBg} rounded-3xl p-7 sm:p-8 flex flex-col gap-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}
            >
              <div className={`w-14 h-14 rounded-2xl ${f.iconBg} flex items-center justify-center shadow-md flex-shrink-0`}>
                {f.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-semibold text-xl mb-2 leading-snug">{f.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed font-normal">{f.desc}</p>
              </div>
              <p className={`text-base font-semibold ${f.tagColor}`}>{f.tag}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
