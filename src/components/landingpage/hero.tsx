import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Carousel from "./carousel";

const Hero: NextPage = () => {
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 flex flex-col md:flex-row items-center gap-12 lg:gap-16 w-full">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="inline-flex items-center gap-2 bg-indigo-100 border border-indigo-200 text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            Digital Business Cards
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900 leading-tight mb-6">
            The Smartest
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Digital Card
            </span>
            <br />
            Platform
          </h1>

          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed max-w-md mb-10 font-normal">
            Create stunning digital business cards in minutes. Share with anyone, anywhere — no app required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={handleClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-full text-base sm:text-lg transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5"
            >
              Create Your Card Free →
            </button>
            <a
              href="#features"
              className="border border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-full text-base sm:text-lg hover:bg-gray-100 transition-all text-center"
            >
              See Features
            </a>
          </div>

          <div className="flex items-center gap-4 mt-10">
            <div className="flex -space-x-3">
              {["./bhaumik.png", "./deep.png", "./dhruv.png"].map((src, i) => (
                <img key={i} src={src} alt="user" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" />
              ))}
            </div>
            <p className="text-gray-400 text-base">
              <span className="text-gray-800 font-semibold">1,000+</span> professionals using CardGenius
            </p>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center w-full max-w-sm md:max-w-lg">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/50 to-blue-200/50 rounded-3xl blur-2xl" />
            <div className="relative bg-white/70 border border-gray-200 rounded-3xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
              <Carousel />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
