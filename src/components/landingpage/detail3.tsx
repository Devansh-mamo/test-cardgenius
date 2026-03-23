import React from "react";

const Detail3 = () => {
  return (
    <section className="bg-slate-50 py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center md:text-left">
          <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">Customization</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mt-3 mb-6 leading-tight">
            Customize your card
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              to match your brand.
            </span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 font-normal">
            Add your photo, pronouns, credentials, social media, company logo, Venmo, Yelp page, PDFs, and more. Make your card truly yours.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Profile Photo", "Social Links", "Company Logo", "QR Code", "Custom Colors", "PDF Attachments"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-600 text-base font-normal shadow-sm">
                <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl blur-2xl" />
            <img
              src="./img3.jpg"
              alt="Customize your card"
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-3xl border border-gray-200 shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail3;
