import React from 'react';

/**
 * FullPerformanceDashboard Component
 * 
 * This component represents an expanded performance dashboard for a trading platform.
 * It includes a top navigation bar, performance charts, an expanded set of key metrics,
 * and a detailed asset performance table.
 * 
 * Note: This component uses custom Tailwind CSS colors and fonts defined 
 * in the project's tailwind.config.js.
 */
const FullPerformanceDashboard: React.FC = () => {
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

          {/* Zone 2: Key Metrics (Expanded) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-surface-container-low rounded-2xl overflow-hidden">
            {/* Current PnL */}
            <div className="p-8 border-r border-b border-outline-variant/10 flex flex-col justify-between min-h-[160px]">
              <span className="font-label text-on-surface-variant uppercase tracking-widest text-xs">Current PnL</span>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-4xl text-primary">+$4,210.00</h3>
                <p className="font-label text-[10px] text-primary-dim uppercase tracking-tighter">Trailing 30 Days</p>
              </div>
            </div>
            {/* Risk-Reward */}
            <div className="p-8 border-r border-b border-outline-variant/10 flex flex-col justify-between min-h-[160px]">
              <span className="font-label text-on-surface-variant uppercase tracking-widest text-xs">Avg Risk:Reward</span>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-4xl text-white">1:2.85</h3>
                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-tighter">Efficiency Optimized</p>
              </div>
            </div>
            {/* Win Rate */}
            <div className="p-8 border-b border-outline-variant/10 flex flex-col justify-between min-h-[160px]">
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
            {/* Avg SL % */}
            <div className="p-8 border-r border-outline-variant/10 flex flex-col justify-between min-h-[160px]">
              <span className="font-label text-on-surface-variant uppercase tracking-widest text-xs">Avg SL %</span>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-4xl text-error">0.45%</h3>
                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-tighter">Strict Risk Control</p>
              </div>
            </div>
            {/* Avg TP % */}
            <div className="p-8 border-r border-outline-variant/10 flex flex-col justify-between min-h-[160px]">
              <span className="font-label text-on-surface-variant uppercase tracking-widest text-xs">Avg TP %</span>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-4xl text-primary-dim">1.28%</h3>
                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-tighter">Target Capture</p>
              </div>
            </div>
            {/* Avg Position Duration */}
            <div className="p-8 flex flex-col justify-between min-h-[160px]">
              <span className="font-label text-on-surface-variant uppercase tracking-widest text-xs">Avg Duration</span>
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-4xl text-white">4h 12m</h3>
                <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-tighter">Intraday Trading Profile</p>
              </div>
            </div>
          </section>

          {/* Zone 3: Asset Performance */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-headline font-bold text-xl text-white tracking-tight">Asset Performance</h2>
              <div className="flex items-center gap-2">
                <span className="font-label text-on-surface-variant text-[10px] uppercase tracking-widest">Total Win Rate:</span>
                <span className="font-label text-primary font-bold text-sm">68.4%</span>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-highest/30">
                    <th className="px-6 py-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Asset</th>
                    <th className="px-6 py-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Win Rate %</th>
                    <th className="px-6 py-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Total Trades</th>
                    <th className="px-6 py-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant text-right">Net PnL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-body font-medium text-white">EURUSD</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <span className="font-label text-sm text-white">64%</span>
                        <div className="hidden sm:block h-1 w-24 bg-surface-variant rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '64%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-label text-xs text-on-surface-variant">42</td>
                    <td className="px-6 py-4 font-label text-sm text-primary font-bold text-right">+$2,140.00</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span className="font-body font-medium text-white">BTCUSD</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <span className="font-label text-sm text-white">58%</span>
                        <div className="hidden sm:block h-1 w-24 bg-surface-variant rounded-full overflow-hidden">
                          <div className="h-full bg-secondary" style={{ width: '58%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-label text-xs text-on-surface-variant">28</td>
                    <td className="px-6 py-4 font-label text-sm text-primary font-bold text-right">+$1,450.50</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                        <span className="font-body font-medium text-white">GBPUSD</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <span className="font-label text-sm text-white">72%</span>
                        <div className="hidden sm:block h-1 w-24 bg-surface-variant rounded-full overflow-hidden">
                          <div className="h-full bg-tertiary" style={{ width: '72%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-label text-xs text-on-surface-variant">15</td>
                    <td className="px-6 py-4 font-label text-sm text-primary font-bold text-right">+$820.20</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-error"></div>
                        <span className="font-body font-medium text-white">NASDAQ</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <span className="font-label text-sm text-white">45%</span>
                        <div className="hidden sm:block h-1 w-24 bg-surface-variant rounded-full overflow-hidden">
                          <div className="h-full bg-error" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-label text-xs text-on-surface-variant">12</td>
                    <td className="px-6 py-4 font-label text-sm text-error font-bold text-right">-$200.28</td>
                  </tr>
                </tbody>
              </table>
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

export default FullPerformanceDashboard;