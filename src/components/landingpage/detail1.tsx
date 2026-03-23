import React from "react";

const Detail1 = () => {
  return (
    <section id="about" className="bg-slate-50 py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center md:text-left">
          <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">About Us</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mt-3 mb-6 leading-tight">
            The future of
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              networking is digital
            </span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 font-normal">
            Information exchange in the modern era is done through digital business cards. More interactive, economical, and environmentally friendly than traditional cards — share with anyone, anywhere, at any time.
          </p>
          <div className="flex gap-6 sm:gap-8 justify-center md:justify-start">
            <div>
              <p className="text-3xl sm:text-4xl font-semibold text-gray-900">1K+</p>
              <p className="text-gray-400 text-sm sm:text-base mt-1 font-normal">Active Users</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <p className="text-3xl sm:text-4xl font-semibold text-gray-900">5K+</p>
              <p className="text-gray-400 text-sm sm:text-base mt-1 font-normal">Cards Created</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div>
              <p className="text-3xl sm:text-4xl font-semibold text-gray-900">100%</p>
              <p className="text-gray-400 text-sm sm:text-base mt-1 font-normal">Paperless</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-3xl blur-2xl" />
            <img
              src="./img1.jpg"
              alt="About CardGenius"
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-3xl border border-gray-200 shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail1;
