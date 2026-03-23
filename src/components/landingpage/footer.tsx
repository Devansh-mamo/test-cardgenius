import type { NextPage } from "next";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Footer: NextPage = () => {
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
    <footer className="bg-gray-950">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-500 rounded-3xl px-8 sm:px-10 py-12 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative text-center md:text-left">
            <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-2">Get started today</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-tight">
              Ready to go digital?
            </h2>
            <p className="text-indigo-100/80 text-base sm:text-lg font-normal mt-2">
              Create your free digital business card. No credit card required.
            </p>
          </div>
          <button
            onClick={handleClick}
            className="relative flex-shrink-0 bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full text-base sm:text-lg hover:bg-indigo-50 transition-all shadow-xl whitespace-nowrap"
          >
            Create Free Card →
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border-t border-white/10" />
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Brand */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <a className="flex items-center gap-2.5 cursor-pointer w-fit">
            <img src="./card genius icon-01.png" className="h-9 w-9" alt="CardGenius" />
            <span className="text-white text-xl font-semibold">CardGenius.me</span>
          </a>
          <p className="text-gray-400 text-base leading-relaxed font-normal max-w-sm">
            The smartest way to share your professional identity. Create, customize, and share your digital business card in minutes — no app needed on the other end.
          </p>
          <div className="flex gap-3 mt-1">
            {[
              {
                href: "https://www.facebook.com/mamotechnolabs/",
                label: "Facebook",
                hoverClass: "hover:bg-blue-600 hover:border-blue-600",
                icon: (
                  <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                ),
              },
              {
                href: "https://www.instagram.com/cardgenius.me/",
                label: "Instagram",
                hoverClass: "hover:bg-pink-600 hover:border-pink-600",
                icon: (
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                  </svg>
                ),
              },
              {
                href: "https://www.linkedin.com/company/mamo-technolabs/",
                label: "LinkedIn",
                hoverClass: "hover:bg-blue-700 hover:border-blue-700",
                icon: (
                  <svg fill="currentColor" className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all ${s.hoverClass}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1" />

        {/* Product */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Product</h3>
          <div className="flex flex-col gap-3">
            <a href="#features" className="text-gray-400 text-base font-normal hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-gray-400 text-base font-normal hover:text-white transition-colors">About Us</a>
            <Link href="/app/policy" className="text-gray-400 text-base font-normal hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Contact</h3>
          <div className="flex flex-col gap-3">
            <a href="https://cardgenius.me" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-base font-normal hover:text-white transition-colors">cardgenius.me</a>
            <a href="https://www.instagram.com/cardgenius.me/" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-base font-normal hover:text-white transition-colors">@cardgenius.me</a>
          </div>
        </div>

        {/* Download */}
        <div className="lg:col-span-2">
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Download</h3>
          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all group">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <p className="text-gray-500 text-xs font-normal leading-none mb-0.5">Download on the</p>
                <p className="text-white text-sm font-semibold leading-none">App Store</p>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all group">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-7.27-2.72-2.72-10.87 9.79zM.5 1.4C.19 1.74 0 2.28 0 2.98v18.04c0 .7.19 1.24.51 1.58l.08.08 10.1-10.1v-.24L.58 1.32.5 1.4zM20.49 10.34l-2.89-1.67-3.04 3.04 3.04 3.04 2.91-1.68c.83-.48.83-1.26-.02-1.73zM4.17.24L16.77 7.5l-2.72 2.72L3.18.43c.3-.17.65-.22.99-.19z" />
              </svg>
              <div>
                <p className="text-gray-500 text-xs font-normal leading-none mb-0.5">Get it on</p>
                <p className="text-white text-sm font-semibold leading-none">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-600 text-base font-normal">© 2023 Card Genius. All rights reserved.</p>
          <p className="text-gray-600 text-base font-normal">Made with ♥ by Mamo Technolabs</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
