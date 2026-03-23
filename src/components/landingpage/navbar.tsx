import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Navbar: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (session) {
      router.push("/app");
    } else {
      signIn(undefined, { callbackUrl: "/app" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md shadow-gray-200/80 border-b border-gray-100"
          : "bg-white/90 backdrop-blur-md border-b border-gray-100/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a className="flex items-center gap-2.5 cursor-pointer">
          <img src="./card genius icon-01.png" className="h-9 w-9" alt="CardGenius logo" />
          <span className="text-gray-900 text-xl font-semibold tracking-tight">CardGenius.me</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Features", href: "#features" },
            { label: "About", href: "#about" },
            { label: "Privacy", href: "/app/policy", isLink: true },
          ].map((item) =>
            item.isLink ? (
              <Link key={item.label} href={item.href} className="px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={handleClick} className="text-base font-semibold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
            Sign in
          </button>
          <button onClick={handleClick} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md">
            Get Started →
          </button>
        </div>

        <button className="md:hidden text-gray-600 hover:text-gray-900 p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-5 pt-3 flex flex-col gap-1">
          <a href="#features" className="px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#about" className="px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setMenuOpen(false)}>About</a>
          <Link href="/app/policy" className="px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setMenuOpen(false)}>Privacy</Link>
          <div className="flex gap-3 mt-3">
            <button onClick={handleClick} className="flex-1 border border-gray-200 text-gray-700 font-semibold text-base py-3 rounded-full hover:bg-gray-50 transition-all">Sign in</button>
            <button onClick={handleClick} className="flex-1 bg-indigo-600 text-white font-semibold text-base py-3 rounded-full hover:bg-indigo-700 transition-all">Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
