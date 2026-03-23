import React from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const shareOptions = ["QR Code", "Email", "Text", "Airdrop", "Social Media", "Link Sharing"];

const Detail4 = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session) {
      router.push("/app");
    } else {
      signIn(undefined, { callbackUrl: "/app" });
    }
  };

  return (
    <section className="bg-white py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center md:text-left">
          <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">Sharing</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mt-3 mb-6 leading-tight">
            Share with anyone,
            <br />anywhere.
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 font-normal">
            Even if they do not have the app, you can share your digital business card with anyone. Distribute your card in a variety of ways:
          </p>
          <div className="grid grid-cols-2 gap-3 mb-10">
            {shareOptions.map((opt, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-600 text-base font-normal">
                <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                {opt}
              </div>
            ))}
          </div>
          <button
            onClick={handleClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-full text-base sm:text-lg transition-all shadow-lg shadow-indigo-100 hover:shadow-indigo-200"
          >
            Start Sharing Free →
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl blur-2xl" />
            <img
              src="./img6.jpg"
              alt="Share your card"
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-3xl border border-gray-200 shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail4;
