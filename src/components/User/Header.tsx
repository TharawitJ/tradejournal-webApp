import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle potential negative scroll (iOS bounce)
      if (currentScrollY <= 0) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Add a small delta to prevent jitter
      const diff = currentScrollY - lastScrollY.current;
      if (Math.abs(diff) < 10) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `pb-1 transition-all duration-200 ${
      isActive
        ? "text-[#9cff93] border-b-2 border-[#9cff93] font-bold"
        : "text-[#adaaaa] font-medium hover:text-white"
    }`;

  return (
    <>
      {/* TopAppBar */}
      <header
        className={`bg-[#0e0e0e] w-full sticky top-0 z-50 border-b border-b-gray-700 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Layer 1: Profile & Logout */}
        <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-[#9cff93] font-headline uppercase">
            Trade Journal
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#201f1f] border border-[#494847]/20 flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-[#adaaaa] text-sm">
                  person
                </span>
              </div>
              <span className="font-label text-sm text-[#ffffff]">
                Trader_0x1
              </span>
            </div>
            <button className="flex items-center gap-2 text-[#adaaaa] hover:text-white transition-colors font-body text-sm group">
              <span className="material-symbols-outlined text-lg group-active:scale-95 transition-transform">
                Logout
              </span>
            </button>
          </div>
        </div>
        {/* Layer 2: Navigation */}
        <div className="bg-[#0e0e0e] w-full">
          <nav className="flex items-center gap-8 px-6 h-14 max-w-screen-2xl mx-auto font-body text-sm">
            <NavLink to="/home" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/chart" className={navLinkClass}>
              Chart
            </NavLink>
            <NavLink to="/journal" className={navLinkClass}>
              Journal
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
