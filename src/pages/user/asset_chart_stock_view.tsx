import React from "react";
// import { useEffect, useState } from "react";
// import { Chart, CandlestickSeries } from "lightweight-charts-react-components";
import BinanceChart from "../../components/Chart/Chart";
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
  // test chart

  return (
    <div className=" bg-[#0e0e0e] text-[#ffffff] bg-background text-on-surface selection:bg-primary selection:text-on-primary min-h-screen">
      {/* Top Navigation Shell */}
      <main className="pt-5 pb-12 px-6 max-w-screen-2xl mx-auto">
        {/* Hero Section / Asset Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="bg-secondary-container px-3 py-1 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
                  <span className="font-label text-[10px] font-bold text-on-secondary-container tracking-widest uppercase">
                    Live Market
                  </span>
                </div>
                <div className="flex items-center gap-1 group cursor-pointer bg-surface-container-low px-3 py-1 rounded-lg border border-outline-variant/5 hover:border-primary/20 transition-all">
                  <span className="font-label text-sm text-on-surface-variant">
                    Asset Pool
                  </span>
                  <span className="material-symbols-outlined text-sm text-primary">
                    expand_more
                  </span>
                </div>
              </div>
              <h2 className="font-headline font-bold text-5xl md:text-6xl tracking-tighter text-on-surface">
                EURUSD
              </h2>
              <div className="flex items-center gap-4">
                <span className="font-label text-xl text-primary font-bold">
                  1.08422
                </span>
                <span className="font-label text-sm text-primary-dim">
                  +0.14%
                </span>
              </div>
            </div>
            
            <button className="border border-outline text-on-surface px-8 py-4 rounded-md font-label font-bold text-sm tracking-widest flex items-center gap-3 hover:bg-surface-container-high active:scale-95 transition-all">
              RECORD JOURNAL
            </button>
          </div>
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
            <BinanceChart />
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
