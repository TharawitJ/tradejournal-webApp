import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";
import useUserStore from "../../stores/userStore"

function Header() {
  const user = useUserStore((state) => state.user);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const logout = useUserStore(state => state.logout)
  
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
              <NavLink to="/profile" className="font-label text-sm text-[#ffffff] hover:text-[#9cff93] transition-colors">
                {user?.username || "Trader_0x1"}
              </NavLink>
            </div>
            <button className="flex items-center gap-2 text-[#adaaaa] hover:text-white transition-colors font-body group" onClick={logout}>
              <span className="material-symbols-outlined text-[0.95rem] mr-3 group-active:scale-95 transition-transform">
                Logout
              </span>
            </button>
          </div>
        </div>
        {/* Layer 2: Navigation */}
        <div className="bg-[#0e0e0e] w-full">
          <nav className="flex items-center gap-8 px-6 h-14 max-w-screen-2xl mx-auto font-body text-sm">
            <NavLink to="/" className={navLinkClass}>
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
