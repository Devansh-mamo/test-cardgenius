import React from "react";

const Detail2 = () => {
  return (
    <section className="bg-white py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center md:text-left">
          <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">Contactless</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mt-3 mb-6 leading-tight">
            The top contactless
            <br />business card.
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6 font-normal">
            No physical touch needed. Exchange digital business cards with anyone, anywhere, at any time. Easily update your contact info without reprinting.
          </p>
          <div className="flex flex-col gap-3 items-center md:items-start">
            {["No app required for recipients", "Instant updates across all shares", "Works via QR, link, email & more"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-600 font-normal text-base">
                <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl blur-2xl" />
            <img
              src="./img7.jpg"
              alt="Contactless sharing"
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-3xl border border-gray-200 shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail2;
