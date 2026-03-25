import React from 'react';

/**
 * AssetChartStockView Component
 * 
 * This component represents an asset analysis view with a live market chart.
 * It includes a specialized candlestick chart visualization, price axes, 
 * market metrics, and quick action buttons.
 * 
 * Note: This component uses custom Tailwind CSS colors, fonts, and patterns defined 
 * in the project's tailwind.config.js and global styles.
 */
const AssetChartStockView: React.FC = () => {
  return (
    <div className=" bg-[#0e0e0e] text-[#ffffff] bg-background text-on-surface selection:bg-primary selection:text-on-primary min-h-screen">
      {/* Top Navigation Shell */}
      <main className="pt-32 pb-12 px-6 max-w-screen-2xl mx-auto">
        {/* Hero Section / Asset Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-secondary-container px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
                <span className="font-label text-[10px] font-bold text-on-secondary-container tracking-widest uppercase">Live Market</span>
              </div>
              <div className="flex items-center gap-1 group cursor-pointer bg-surface-container-low px-3 py-1 rounded-lg border border-outline-variant/5 hover:border-primary/20 transition-all">
                <span className="font-label text-sm text-on-surface-variant">Asset Pool</span>
                <span className="material-symbols-outlined text-sm text-primary">expand_more</span>
              </div>
            </div>
            <h2 className="font-headline font-bold text-5xl md:text-6xl tracking-tighter text-on-surface">EURUSD</h2>
            <div className="flex items-center gap-4">
              <span className="font-label text-xl text-primary font-bold">1.08422</span>
              <span className="font-label text-sm text-primary-dim">+0.14%</span>
            </div>
          </div>
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-md font-label font-bold text-sm tracking-widest flex items-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/10">
            <span className="material-symbols-outlined">add_notes</span>
            RECORD JOURNAL
          </button>
        </div>

        {/* Main Chart Area (Full Width Candlestick) */}
        <section className="mb-14">
          <div 
            className="w-full h-[600px] bg-surface-container-low rounded-xl relative overflow-hidden group border border-outline-variant/5"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          >
            {/* Chart Controls Overlay */}
            <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-start pointer-events-none">
              <div className="flex gap-4 pointer-events-auto">
                <div className="flex flex-col">
                  <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">High</span>
                  <span className="font-label text-sm">1.09120</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Low</span>
                  <span className="font-label text-sm">1.08215</span>
                </div>
              </div>
              <div className="flex gap-2 pointer-events-auto">
                <button className="bg-surface-container-highest px-3 py-1 rounded font-label text-xs hover:bg-surface-bright transition-colors">1H</button>
                <button className="bg-surface-container-highest px-3 py-1 rounded font-label text-xs hover:bg-surface-bright transition-colors">4H</button>
                <button className="bg-primary/20 text-primary px-3 py-1 rounded font-label text-xs border border-primary/30">1D</button>
                <button className="bg-surface-container-highest px-2 py-1 rounded font-label text-xs flex items-center hover:bg-surface-bright transition-colors">
                  <span className="material-symbols-outlined text-sm">settings</span>
                </button>
              </div>
            </div>

            {/* Candlestick Visualization */}
            <div className="absolute inset-0 flex items-center justify-center pt-20 pb-20">
              <svg className="w-full h-full px-12" preserveAspectRatio="none" viewBox="0 0 1000 400">
                <line stroke="#ffffff" strokeDasharray="4" strokeOpacity="0.05" x1="0" x2="1000" y1="50" y2="50" />
                <line stroke="#ffffff" strokeDasharray="4" strokeOpacity="0.05" x1="0" x2="1000" y1="150" y2="150" />
                <line stroke="#ffffff" strokeDasharray="4" strokeOpacity="0.05" x1="0" x2="1000" y1="250" y2="250" />
                <line stroke="#ffffff" strokeDasharray="4" strokeOpacity="0.05" x1="0" x2="1000" y1="350" y2="350" />
                <g transform="translate(50, 200)">
                  <rect fill="#9cff93" height="60" width="12" x="0" y="-40" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="6" x2="6" y1="-60" y2="40" />
                  <rect fill="#ff716c" height="40" width="12" x="40" y="-10" />
                  <line stroke="#ff716c" strokeWidth="1.5" x1="46" x2="46" y1="-30" y2="60" />
                  <rect fill="#9cff93" height="50" width="12" x="80" y="-70" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="86" x2="86" y1="-90" y2="10" />
                  <rect fill="#9cff93" height="110" width="12" x="120" y="-120" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="126" x2="126" y1="-140" y2="20" />
                  <rect fill="#ff716c" height="15" width="12" x="160" y="-100" />
                  <line stroke="#ff716c" strokeWidth="1.5" x1="166" x2="166" y1="-120" y2="-70" />
                  <rect fill="#9cff93" height="40" width="12" x="200" y="-130" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="206" x2="206" y1="-150" y2="-70" />
                  <rect fill="#ff716c" height="80" width="12" x="240" y="-120" />
                  <line stroke="#ff716c" strokeWidth="1.5" x1="246" x2="246" y1="-140" y2="-20" />
                  <rect fill="#9cff93" height="30" width="12" x="280" y="-90" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="286" x2="286" y1="-110" y2="-40" />
                  <rect fill="#9cff93" height="60" width="12" x="320" y="-110" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="326" x2="326" y1="-130" y2="-20" />
                  <rect fill="#ff716c" height="40" width="12" x="360" y="-80" />
                  <line stroke="#ff716c" strokeWidth="1.5" x1="366" x2="366" y1="-100" y2="-20" />
                  <rect fill="#ff716c" height="100" width="12" x="400" y="-50" />
                  <line stroke="#ff716c" strokeWidth="1.5" x1="406" x2="406" y1="-70" y2="70" />
                  <rect fill="#9cff93" height="40" width="12" x="440" y="-20" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="446" x2="446" y1="-40" y2="40" />
                  <rect fill="#9cff93" height="60" width="12" x="480" y="-60" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="486" x2="486" y1="-80" y2="20" />
                  <rect fill="#9cff93" height="70" width="12" x="520" y="-100" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="526" x2="526" y1="-120" y2="-10" />
                  <rect fill="#ff716c" height="30" width="12" x="560" y="-80" />
                  <line stroke="#ff716c" strokeWidth="1.5" x1="566" x2="566" y1="-100" y2="-30" />
                  <rect fill="#9cff93" height="80" width="12" x="600" y="-130" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="606" x2="606" y1="-150" y2="-30" />
                  <rect fill="#9cff93" height="100" width="12" x="640" y="-180" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="646" x2="646" y1="-200" y2="-60" />
                  <rect fill="#ff716c" height="40" width="12" x="680" y="-150" />
                  <line stroke="#ff716c" strokeWidth="1.5" x1="686" x2="686" y1="-170" y2="-90" />
                  <rect fill="#9cff93" height="60" width="12" x="720" y="-190" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="726" x2="726" y1="-210" y2="-110" />
                  <rect fill="#ff716c" height="70" width="12" x="760" y="-160" />
                  <line stroke="#ff716c" strokeWidth="1.5" x1="766" x2="766" y1="-180" y2="-70" />
                  <rect fill="#9cff93" height="50" width="12" x="800" y="-200" />
                  <line stroke="#9cff93" strokeWidth="1.5" x1="806" x2="806" y1="-220" y2="-130" />
                  <line stroke="#9cff93" strokeDasharray="4" strokeWidth="1" x1="812" x2="1000" y1="-200" y2="-200" />
                </g>
              </svg>
            </div>

            {/* Price Axis Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-surface-container-low/80 backdrop-blur-sm border-l border-outline-variant/10 flex flex-col justify-between py-12 px-2 text-[10px] font-label text-on-surface-variant pointer-events-none">
              <span>1.10000</span>
              <span>1.09500</span>
              <span>1.09000</span>
              <span>1.08500</span>
              <span className="bg-primary text-on-primary font-bold px-1 py-0.5 rounded-sm">1.08422</span>
              <span>1.08000</span>
              <span>1.07500</span>
              <span>1.07000</span>
            </div>

            {/* Bottom Metrics Overlay */}
            <div className="absolute bottom-6 left-6 right-20 flex justify-between items-end pointer-events-none">
              <div className="bg-surface-container-highest/80 backdrop-blur-md p-4 rounded-lg border border-outline-variant/10 pointer-events-auto">
                <p className="font-label text-[10px] text-on-surface-variant uppercase mb-1">RSI (14)</p>
                <p className="font-label text-lg font-bold text-primary">54.21</p>
              </div>
              <div className="text-right pointer-events-auto">
                <p className="font-label text-[10px] text-on-surface-variant uppercase">Volume</p>
                <p className="font-label text-lg text-white">14.2M</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Quick Actions */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <button className="w-14 h-14 bg-surface-container-high text-on-surface rounded-full flex items-center justify-center shadow-[0_0_32px_rgba(255,255,255,0.04)] border border-outline-variant/20 hover:bg-surface-container-highest transition-all active:scale-90">
          <span className="material-symbols-outlined">camera</span>
        </button>
        <button className="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-90">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
};

export default AssetChartStockView;