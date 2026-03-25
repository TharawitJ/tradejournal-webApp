import React from 'react';

/**
 * Journal_page Component
 * 
 * Non-responsive, desktop-only layout (1280px - 1920px).
 * Following the "Quantitative Editorial" design system:
 * - Triple-font approach: Manrope (Headlines), Inter (Body), Space Grotesk (Data).
 * - "No-Line" Rule: Depth via surface tiers instead of borders.
 * - "Luminous Shadows": Soft, white-tinted halos for elevation.
 * - Intentional Asymmetry: Breaking rigid grids for a sophisticated feel.
 * - Header removed (External header component expected).
 */
const JournalPage: React.FC = () => {
  return (
    <div className="bg-[#0e0e0e] text-[#ffffff] font-body selection:bg-[#9cff93] selection:text-[#006413] min-h-screen w-full overflow-x-auto">
      {/* Desktop-Only Container (Fixed at 1280px minimum) */}
      <main className="min-w-[1280px] max-w-[1920px] mx-auto px-12 py-16">
        {/* Journal Header Section - Intentional Asymmetry */}
        <div className="flex justify-between items-end mb-24">
          <div className="max-w-3xl">
            <h1 className="font-headline font-bold text-7xl tracking-tight mb-4 uppercase text-white">
              Trade Journal
            </h1>
            <p className="font-label text-[#adaaaa] text-xl tracking-[0.3em] uppercase">
              Institutional precision / historical logs
            </p>
          </div>
          <button className="bg-gradient-to-br from-[#9cff93] to-[#00fc40] hover:brightness-110 text-[#006413] font-label font-bold px-12 py-5 rounded-lg flex items-center gap-4 transition-all active:scale-95 shadow-[0_0_32px_rgba(255,255,255,0.04)] uppercase tracking-[0.2em] text-sm">
            <span className="material-symbols-outlined text-xl">add</span>
            New Entry
          </button>
        </div>

        {/* Trade Entries List */}
        <div className="space-y-24">
          {/* Entry 1: Win Example */}
          <div className="flex gap-8 items-stretch group">
            {/* ZONE 1: CORE DATA (Left) - Surface Tier Stacking */}
            <div className="w-[320px] bg-[#131313] p-8 rounded-xl border border-transparent group-hover:border-[#9cff93]/20 transition-all shadow-[0_0_32px_rgba(255,255,255,0.04)]">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#9cff93] mb-2 block">Tier 1 Setup</span>
                  <h3 className="font-headline font-extrabold text-3xl text-white tracking-tighter">EURUSD</h3>
                </div>
                <span className="bg-[#006c47] text-[#e1ffeb] px-4 py-1.5 rounded-full font-label text-[10px] font-bold uppercase tracking-widest">Breakout</span>
              </div>
              
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-label text-[10px] text-[#adaaaa] uppercase tracking-tighter mb-1">Entry Price</p>
                    <p className="font-label text-base text-white font-bold">1.08450</p>
                  </div>
                  <div>
                    <p className="font-label text-[10px] text-[#adaaaa] uppercase tracking-tighter mb-1">Exit Price</p>
                    <p className="font-label text-base text-white font-bold">1.09200</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-label text-[10px] text-[#adaaaa] uppercase tracking-tighter mb-1">SL / TP</p>
                    <div className="font-label text-[11px]">
                      <span className="text-[#ff716c] font-bold">1.08200</span>
                      <span className="text-[#adaaaa] mx-2">/</span>
                      <span className="text-[#00ec3b] font-bold">1.09500</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-label text-[10px] text-[#adaaaa] uppercase tracking-tighter mb-1">Duration</p>
                    <p className="font-label text-[11px] text-white">4h 12m</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-[#494847]/10">
                  <p className="font-label text-[10px] text-[#adaaaa] uppercase tracking-tighter mb-2">Timeline</p>
                  <p className="font-label text-[11px] text-white/90 tracking-wide">2023.10.24 09:15 → 13:27</p>
                </div>
              </div>
            </div>

            {/* ZONE 2: ADV/DISADV - Middle-Left */}
            <div className="w-[320px] bg-[#1a1919] p-8 rounded-xl flex flex-col gap-10">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="material-symbols-outlined text-[#9cff93] text-lg">check_circle</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold">Advantages</span>
                </div>
                <ul className="space-y-4 font-body text-sm text-white/70">
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-[#9cff93] mt-1">•</span> Perfect alignment with 4H trend
                  </li>
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-[#9cff93] mt-1">•</span> High volume confirmation on entry
                  </li>
                </ul>
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-3 mb-5">
                  <span className="material-symbols-outlined text-[#ff716c] text-lg">cancel</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold">Disadvantages</span>
                </div>
                <ul className="space-y-4 font-body text-sm text-white/70">
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-[#ff716c] mt-1">•</span> SL was slightly too tight
                  </li>
                </ul>
              </div>
            </div>

            {/* ZONE 3: NOTES - Middle-Right (Dynamic Expansion) */}
            <div className="flex-1 bg-[#1a1919] p-10 rounded-xl flex flex-col justify-between">
              <div>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold mb-8 block">Notes & Reflection</span>
                <p className="font-body text-lg leading-9 text-white/90 italic border-l-2 border-[#9cff93]/10 pl-8">
                  Entry was executed exactly as per the Tier 1 playbook. Price showed strong rejection at the psychological 1.084 level before accelerating. Exited manually when momentum slowed near the session close.
                </p>
              </div>
              <div className="mt-12 pt-8 border-t border-[#494847]/10">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#9cff93] font-bold mb-3 block">System Feedback</span>
                <p className="font-body text-sm text-[#adaaaa] tracking-widest uppercase">Execution: A+ | Discipline: High. Ensure next time you hold until TP if HTF targets remain valid.</p>
              </div>
            </div>

            {/* ZONE 4: ACTIONS - Right Column */}
            <div className="w-[180px] flex flex-col gap-4">
              <button className="flex-1 bg-[#9cff93]/5 hover:bg-[#9cff93]/10 text-[#9cff93] font-label text-[10px] font-bold py-6 rounded-lg transition-all border border-[#9cff93]/20 flex flex-col items-center justify-center gap-2 group uppercase tracking-[0.2em]">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                Win
              </button>
              <button className="flex-1 bg-[#201f1f] hover:bg-[#262626] text-white font-label text-[10px] font-bold py-6 rounded-lg transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-[0.2em]">
                <span className="material-symbols-outlined text-3xl">edit</span>
                Edit
              </button>
              <button className="flex-1 bg-[#201f1f] hover:bg-[#ff716c]/10 hover:text-[#ff716c] text-[#adaaaa] font-label text-[10px] font-bold py-6 rounded-lg transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-[0.2em]">
                <span className="material-symbols-outlined text-3xl">delete</span>
                Delete
              </button>
            </div>
          </div>

          {/* Entry 2: Loss Example (Asymmetric Shift) */}
          <div className="flex gap-8 items-stretch group opacity-90 hover:opacity-100 transition-opacity">
            <div className="w-[320px] bg-[#131313] p-8 rounded-xl border border-transparent group-hover:border-[#ff716c]/20 transition-all shadow-[0_0_32px_rgba(255,255,255,0.04)]">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2 block">Tier 3 Setup</span>
                  <h3 className="font-headline font-extrabold text-3xl text-white tracking-tighter">XAUUSD</h3>
                </div>
                <span className="bg-[#262626] text-white px-4 py-1.5 rounded-full font-label text-[10px] font-bold uppercase tracking-widest">Reversal</span>
              </div>
              
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="font-label text-[10px] text-[#adaaaa] uppercase tracking-tighter mb-1">Entry Price</p>
                    <p className="font-label text-base text-white font-bold">1982.40</p>
                  </div>
                  <div>
                    <p className="font-label text-[10px] text-[#adaaaa] uppercase tracking-tighter mb-1">Exit Price</p>
                    <p className="font-label text-base text-white font-bold">1975.00</p>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-[#494847]/10">
                  <p className="font-label text-[10px] text-[#adaaaa] uppercase tracking-tighter mb-2">System Result</p>
                  <p className="font-label text-3xl text-[#ff716c] font-bold tracking-tight">-$740.00</p>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-[#1a1919] p-10 rounded-xl flex flex-col justify-between">
              <div>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold mb-8 block">Notes & Reflection</span>
                <p className="font-body text-lg leading-9 text-white/90 italic border-l-2 border-[#ff716c]/10 pl-8">
                  Impulsive entry. I saw the drop and tried to catch it midway. Market immediately reversed to fill the imbalance above. Stop loss hit within minutes. Poor emotional control.
                </p>
              </div>
              <div className="mt-12 pt-8 border-t border-[#494847]/10">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#ff716c] font-bold mb-3 block">System Feedback</span>
                <p className="font-body text-sm text-[#adaaaa] tracking-widest uppercase">Execution: D | Discipline: Low. Avoid trading when not at desk for full session open.</p>
              </div>
            </div>

            <div className="w-[180px] flex flex-col gap-4">
              <button className="flex-1 bg-[#ff716c]/5 hover:bg-[#ff716c]/10 text-[#ff716c] font-label text-[10px] font-bold py-6 rounded-lg transition-all border border-[#ff716c]/20 flex flex-col items-center justify-center gap-2 group uppercase tracking-[0.2em]">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>heart_broken</span>
                Loss
              </button>
              <button className="flex-1 bg-[#201f1f] hover:bg-[#262626] text-white font-label text-[10px] font-bold py-6 rounded-lg transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-[0.2em]">
                <span className="material-symbols-outlined text-3xl">edit</span>
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Pagination / Footer Area */}
        <div className="mt-40 flex justify-between items-center border-t border-[#494847]/10 pt-16">
          <span className="font-label text-sm text-[#adaaaa] uppercase tracking-[0.3em]">Showing 3 of 124 recorded trades</span>
          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-lg bg-[#131313] flex items-center justify-center text-[#adaaaa] hover:text-[#9cff93] transition-colors group">
              <span className="material-symbols-outlined text-2xl group-active:scale-90 transition-transform">chevron_left</span>
            </button>
            <button className="w-14 h-14 rounded-lg bg-[#262626] border border-[#9cff93]/40 flex items-center justify-center text-[#9cff93] font-bold font-label text-base">
              1
            </button>
            <button className="w-14 h-14 rounded-lg bg-[#131313] flex items-center justify-center text-[#adaaaa] hover:text-[#9cff93] transition-colors">
              2
            </button>
            <button className="w-14 h-14 rounded-lg bg-[#131313] flex items-center justify-center text-[#adaaaa] hover:text-[#9cff93] transition-colors group">
              <span className="material-symbols-outlined text-2xl group-active:scale-90 transition-transform">chevron_right</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JournalPage;