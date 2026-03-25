import React from 'react';

/**
 * UpdatedSummaryDashboard Component
 * 
 * This component represents a performance dashboard for a trading platform.
 * It includes a top navigation bar, performance charts, key metrics, 
 * and recent journal records.
 * 
 * Note: This component uses custom Tailwind CSS colors and fonts defined 
 * in the project's tailwind.config.js.
 * - Colors: surface-container-low, primary, on-surface-variant, etc.
 * - Fonts: Manrope (headline), Inter (body), Space Grotesk (label).
 */
const UpdatedSummaryDashboard: React.FC = () => {
  return (
    <div className="bg-[#0e0e0e] text-[#ffffff] bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen overflow-x-hidden">

      {/* Main Content Area - Full Width */}
      <main className="pb-24 md:pb-8">
        {/* Dashboard Content */}
        <div className="px-6 py-8 max-w-7xl mx-auto space-y-12">
          {/* Zone 1: Performance Chart */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="font-label text-on-surface-variant uppercase tracking-widest text-xs">Total Performance</p>
                <h2 className="font-headline font-bold text-5xl md:text-7xl text-white mt-2">+$12,840.42</h2>
              </div>
              <div className="text-right hidden sm:block">
                <p className="font-label text-primary uppercase tracking-widest text-xs">+14.2% Month</p>
                <p className="font-label text-on-surface-variant text-[10px]">Refreshed: 1m ago</p>
              </div>
            </div>
            <div className="relative w-full h-[320px] bg-surface-container-low rounded-xl overflow-hidden group">
              {/* SVG Chart Mockup */}
              <svg className="w-full h-full" viewBox="0 0 1000 300">
                <defs>
                  <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#9cff93" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#9cff93" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 250 Q 100 240, 200 220 T 400 180 T 600 120 T 800 140 T 1000 60 L 1000 300 L 0 300 Z" fill="url(#chartFill)" />
                <path className="drop-shadow-[0_0_8px_rgba(156,255,147,0.5)]" d="M0 250 Q 100 240, 200 220 T 400 180 T 600 120 T 800 140 T 1000 60" fill="none" stroke="#9cff93" strokeLinecap="round" strokeWidth="3" />
                {/* Data Nodes */}
                <circle className="opacity-0 group-hover:opacity-100 transition-opacity" cx="200" cy="220" fill="#9cff93" r="4" />
                <circle className="opacity-0 group-hover:opacity-100 transition-opacity" cx="600" cy="120" fill="#9cff93" r="4" />
                <circle cx="1000" cy="60" fill="#9cff93" r="6" />
              </svg>
              {/* Chart Overlay Details */}
              <div className="absolute top-6 left-6 flex gap-4">
                <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label text-on-surface-variant">JAN 01 - FEB 28</span>
              </div>
            </div>
          </section>

          {/* Zone 2: Key Metrics */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-surface-container-low rounded-2xl overflow-hidden">
            {/* Current PnL */}
            <div className="p-8 border-r border-outline-variant/10 flex flex-col justify-between min-h-[180px]">
              <span className="font-label text-on-surface-variant uppercase tracking-widest text-xs">Current PnL</span>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-4xl text-primary">+$4,210.00</h3>
                <p className="font-label text-[10px] text-primary-dim uppercase tracking-tighter">Trailing 30 Days</p>
              </div>
            </div>
            {/* Risk-Reward */}
            <div className="p-8 border-r border-outline-variant/10 flex flex-col justify-between min-h-[180px]">
              <span className="font-label text-on-surface-variant uppercase tracking-widest text-xs">Avg Risk:Reward</span>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-4xl text-white">1:2.85</h3>
                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-tighter">Efficiency Optimized</p>
              </div>
            </div>
            {/* Win Rate */}
            <div className="p-8 flex flex-col justify-between min-h-[180px]">
              <span className="font-label text-on-surface-variant uppercase tracking-widest text-xs">Win Rate %</span>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-4xl text-white">68.4%</h3>
                <div className="flex items-center gap-2">
                  <div className="h-1 flex-1 bg-surface-variant rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '68.4%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Zone 3: Recent Journal Records */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline font-bold text-xl text-white tracking-tight">Recent Journal Records</h2>
              <button className="text-primary font-label text-[10px] uppercase tracking-widest hover:underline transition-all">View All Entries</button>
            </div>
            <div className="space-y-1">
              {/* Entry 1 */}
              <div className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container-high transition-all rounded-xl border-l-2 border-transparent hover:border-primary">
                <div className="flex items-center gap-6">
                  <div className="hidden sm:block">
                    <p className="font-label text-on-surface-variant text-[10px] uppercase">Feb 28</p>
                    <p className="font-label text-white text-xs">09:42</p>
                  </div>
                  <div>
                    <h4 className="font-body font-medium text-white group-hover:text-primary transition-colors">EURUSD Scalp - News Break</h4>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[9px] font-label rounded-full uppercase">Forex</span>
                      <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant text-[9px] font-label rounded-full uppercase">High Volatility</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 mt-4 md:mt-0">
                  <div className="text-right">
                    <p className="font-label text-primary text-sm font-bold">+$840.00</p>
                    <p className="font-label text-on-surface-variant text-[10px]">RR 1:3.2</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-white transition-colors">chevron_right</span>
                </div>
              </div>
              {/* Entry 2 */}
              <div className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container-high transition-all rounded-xl border-l-2 border-transparent hover:border-primary">
                <div className="flex items-center gap-6">
                  <div className="hidden sm:block">
                    <p className="font-label text-on-surface-variant text-[10px] uppercase">Feb 27</p>
                    <p className="font-label text-white text-xs">14:15</p>
                  </div>
                  <div>
                    <h4 className="font-body font-medium text-white group-hover:text-primary transition-colors">BTCUSD Long - Support Bounce</h4>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[9px] font-label rounded-full uppercase">Crypto</span>
                      <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant text-[9px] font-label rounded-full uppercase">Trend Following</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 mt-4 md:mt-0">
                  <div className="text-right">
                    <p className="font-label text-primary text-sm font-bold">+$1,220.50</p>
                    <p className="font-label text-on-surface-variant text-[10px]">RR 1:2.1</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-white transition-colors">chevron_right</span>
                </div>
              </div>
              {/* Entry 3 (Loss Example) */}
              <div className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container-high transition-all rounded-xl border-l-2 border-transparent hover:border-error">
                <div className="flex items-center gap-6">
                  <div className="hidden sm:block">
                    <p className="font-label text-on-surface-variant text-[10px] uppercase">Feb 26</p>
                    <p className="font-label text-white text-xs">21:05</p>
                  </div>
                  <div>
                    <h4 className="font-body font-medium text-white group-hover:text-error transition-colors">NASDAQ Short - False Breakout</h4>
                    <div className="flex gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[9px] font-label rounded-full uppercase">Indices</span>
                      <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant text-[9px] font-label rounded-full uppercase">Counter-Trend</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 mt-4 md:mt-0">
                  <div className="text-right">
                    <p className="font-label text-error text-sm font-bold">-$450.00</p>
                    <p className="font-label text-on-surface-variant text-[10px]">RR 1:2.0 (Stopped)</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-white transition-colors">chevron_right</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile BottomNavBar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-[#0e0e0e]/80 backdrop-blur-xl z-50 border-t border-[#494847]/20 shadow-2xl">
        <a className="flex flex-col items-center justify-center bg-[#9cff93]/10 text-[#9cff93] rounded-xl py-1 px-4 scale-95 duration-100" href="#">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label text-[10px] font-medium">Summary</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#adaaaa] py-1 px-4 active:bg-[#262626] scale-95 duration-100" href="#">
          <span className="material-symbols-outlined">show_chart</span>
          <span className="font-label text-[10px] font-medium">Trades</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#adaaaa] py-1 px-4 active:bg-[#262626] scale-95 duration-100" href="#">
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-label text-[10px] font-medium">Metrics</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#adaaaa] py-1 px-4 active:bg-[#262626] scale-95 duration-100" href="#">
          <span className="material-symbols-outlined">edit_note</span>
          <span className="font-label text-[10px] font-medium">Journal</span>
        </a>
      </nav>
    </div>
  );
};

export default UpdatedSummaryDashboard;