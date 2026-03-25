import React from "react";
import { NavLink } from "react-router";

function Header() {
  return (
    <>
      {/* TopAppBar */}
      <header className="bg-[#0e0e0e] w-full sticky top-0 z-50 border-b border-b-gray-700">
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
            <NavLink to="/home">
              <a
                className="text-[#adaaaa] font-medium hover:text-white transition-colors"
                href="#"
              >
                Home
              </a>
            </NavLink>{" "}{" "}
            <NavLink to="/chart">
              <a
                className="text-[#adaaaa] font-medium hover:text-white transition-colors"
                href="#"
              >
                Chart
              </a>
            </NavLink>{" "}{" "}
            <NavLink to="/journal">
              <a
                className="text-[#9cff93] border-b-2 border-[#9cff93] pb-1 font-bold"
                href="#"
              >
                Journal
              </a>
            </NavLink>{" "}{" "}
            <NavLink to="/dashboard">
              <a
                className="text-[#adaaaa] font-medium hover:text-white transition-colors"
                href="#"
              >
                Dashboard
              </a>
            </NavLink>{" "}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
