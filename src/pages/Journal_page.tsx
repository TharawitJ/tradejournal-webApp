import React from 'react';

/**
 * Journal_page Component
 * 
 * Following the "Quantitative Editorial" design system:
 * - Triple-font approach: Manrope (Headlines), Inter (Body), Space Grotesk (Data).
 * - "No-Line" Rule: Depth via surface tiers instead of borders.
 * - "Luminous Shadows": Soft, white-tinted halos for elevation.
 * - Intentional Asymmetry: Breaking rigid grids for a sophisticated feel.
 */
const JournalPage: React.FC = () => {

  
  return (
    <div className="bg-[#0e0e0e] text-[#ffffff] font-body selection:bg-[#9cff93] selection:text-[#006413] min-h-screen">
      <main className="max-w-screen-2xl mx-auto px-6 py-12">
        {/* Journal Header Section - Intentional Asymmetry */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h1 className="font-headline font-bold text-5xl md:text-7xl tracking-tight mb-4 uppercase">
              Trade Journal
            </h1>
            <p className="font-label text-[#adaaaa] text-lg tracking-widest uppercase">
              Institutional precision / historical logs
            </p>
          </div>
          <button className="bg-gradient-to-br from-[#9cff93] to-[#00fc40] hover:brightness-110 text-[#006413] font-label font-bold px-10 py-4 rounded-lg flex items-center gap-3 transition-all active:scale-95 shadow-[0_0_32px_rgba(255,255,255,0.04)] uppercase tracking-widest text-sm">
            <span className="material-symbols-outlined">add</span>
            New Entry
          </button>
        </div>

        {/* Trade Entries List */}
        <div className="space-y-24">
          {/* Entry 1: Win Example */}
          <div className="flex flex-col xl:flex-row gap-8 items-stretch group border-2 border-gray-800 rounded-3xl p-3">
            {/* ZONE 1: CORE DATA (Left) - Surface Tier Stacking */}
            <div className="w-full xl:w-1/4 bg-[#131313] p-8 rounded-xl border border-transparent group-hover:border-[#9cff93]/20 transition-all shadow-[0_0_32px_rgba(255,255,255,0.04)]">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#9cff93] mb-2 block">Tier 1 Setup</span>
                  <h3 className="font-headline font-extrabold text-3xl text-white tracking-tighter">EURUSD</h3>
                </div>
                <span className="bg-[#006c47] text-[#e1ffeb] px-4 py-1.5 rounded-full font-label text-[10px] font-bold uppercase tracking-widest">Breakout</span>
              </div>
              
              <div className="space-y-6">
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
                    <div className="font-label text-xs">
                      <span className="text-[#ff716c] font-bold">1.08200</span>
                      <span className="text-[#adaaaa] mx-2">/</span>
                      <span className="text-[#00ec3b] font-bold">1.09500</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-label text-[10px] text-[#adaaaa] uppercase tracking-tighter mb-1">Duration</p>
                    <p className="font-label text-xs text-white">4h 12m</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-[#494847]/10">
                  <p className="font-label text-[10px] text-[#adaaaa] uppercase tracking-tighter mb-2">Timeline</p>
                  <p className="font-label text-[11px] text-white/90 tracking-wide">2023.10.24 09:15 → 13:27</p>
                </div>
              </div>
            </div>

            {/* ZONE 2: ADV/DISADV - Middle-Left */}
            <div className="w-full xl:w-1/4 bg-[#1a1919] p-8 rounded-xl flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-[#9cff93] text-lg">check_circle</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold">Advantages</span>
                </div>
                <ul className="space-y-3 font-body text-sm text-white/70">
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-[#9cff93] mt-1">•</span> Perfect alignment with 4H trend
                  </li>
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-[#9cff93] mt-1">•</span> High volume confirmation on entry
                  </li>
                </ul>
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-[#ff716c] text-lg">cancel</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold">Disadvantages</span>
                </div>
                <ul className="space-y-3 font-body text-sm text-white/70">
                  <li className="flex items-start gap-3 leading-relaxed">
                    <span className="text-[#ff716c] mt-1">•</span> SL was slightly too tight
                  </li>
                </ul>
              </div>
            </div>

            {/* ZONE 3: NOTES - Middle-Right (Wide Margin) */}
            <div className="w-full xl:flex-1 bg-[#1a1919] p-8 rounded-xl flex flex-col justify-between">
              <div>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold mb-6 block">Notes & Reflection</span>
                <p className="font-body text-base leading-8 text-white/90 italic border-l-2 border-[#9cff93]/10 pl-6">
                  Entry was executed exactly as per the Tier 1 playbook. Price showed strong rejection at the psychological 1.084 level before accelerating. Exited manually when momentum slowed near the session close.
                </p>
              </div>
              <div className="mt-12 pt-6 border-t border-[#494847]/10">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#9cff93] font-bold mb-2 block">System Feedback</span>
                <p className="font-body text-xs text-[#adaaaa] tracking-wide">Execution: A+ | Discipline: High. Ensure next time you hold until TP if HTF targets remain valid.</p>
              </div>
            </div>

            {/* ZONE 4: ACTIONS - Right Column */}
            <div className="w-full xl:w-48 flex xl:flex-col gap-4">
              <button className="flex-1 bg-[#9cff93]/5 hover:bg-[#9cff93]/10 text-[#9cff93] font-label text-[10px] font-bold py-5 rounded-lg transition-all border border-[#9cff93]/20 flex flex-col items-center justify-center gap-2 group uppercase tracking-widest">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                Win
              </button>
              <button className="flex-1 bg-[#201f1f] hover:bg-[#262626] text-white font-label text-[10px] font-bold py-5 rounded-lg transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-widest">
                <span className="material-symbols-outlined text-2xl">edit</span>
                Edit
              </button>
              <button className="flex-1 bg-[#201f1f] hover:bg-[#ff716c]/10 hover:text-[#ff716c] text-[#adaaaa] font-label text-[10px] font-bold py-5 rounded-lg transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-widest">
                <span className="material-symbols-outlined text-2xl">delete</span>
                Delete
              </button>
            </div>
          </div>

          {/* Entry 2: Loss Example (Asymmetric Shift)
          <div className="flex flex-col xl:flex-row gap-8 items-stretch group opacity-90 hover:opacity-100 transition-opacity">
            <div className="w-full xl:w-1/4 bg-[#131313] p-8 rounded-xl border border-transparent group-hover:border-[#ff716c]/20 transition-all shadow-[0_0_32px_rgba(255,255,255,0.04)]">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2 block">Tier 3 Setup</span>
                  <h3 className="font-headline font-extrabold text-3xl text-white tracking-tighter">XAUUSD</h3>
                </div>
                <span className="bg-[#262626] text-white px-4 py-1.5 rounded-full font-label text-[10px] font-bold uppercase tracking-widest">Reversal</span>
              </div>
              
              <div className="space-y-6">
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
                
                <div className="pt-6 border-t border-[#494847]/10">
                  <p className="font-label text-[10px] text-[#adaaaa] uppercase tracking-tighter mb-2">System Result</p>
                  <p className="font-label text-xl text-[#ff716c] font-bold tracking-tight">-$740.00</p>
                </div>
              </div>
            </div>

            <div className="w-full xl:flex-1 bg-[#1a1919] p-8 rounded-xl flex flex-col justify-between">
              <div>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold mb-6 block">Notes & Reflection</span>
                <p className="font-body text-base leading-8 text-white/90 italic border-l-2 border-[#ff716c]/10 pl-6">
                  Impulsive entry. I saw the drop and tried to catch it midway. Market immediately reversed to fill the imbalance above. Stop loss hit within minutes. Poor emotional control.
                </p>
              </div>
              <div className="mt-12 pt-6 border-t border-[#494847]/10">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[#ff716c] font-bold mb-2 block">System Feedback</span>
                <p className="font-body text-xs text-[#adaaaa] tracking-wide">Execution: D | Discipline: Low. Avoid trading when not at desk for full session open.</p>
              </div>
            </div>

            <div className="w-full xl:w-48 flex xl:flex-col gap-4">
              <button className="flex-1 bg-[#ff716c]/5 hover:bg-[#ff716c]/10 text-[#ff716c] font-label text-[10px] font-bold py-5 rounded-lg transition-all border border-[#ff716c]/20 flex flex-col items-center justify-center gap-2 group uppercase tracking-widest">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>heart_broken</span>
                Loss
              </button>
              <button className="flex-1 bg-[#201f1f] hover:bg-[#262626] text-white font-label text-[10px] font-bold py-5 rounded-lg transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-widest">
                <span className="material-symbols-outlined text-2xl">edit</span>
                Edit
              </button>
            </div>
          </div>*/}
        </div> 

        {/* Pagination / Footer Area */}
        <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#494847]/10 pt-12">
          <span className="font-label text-xs text-[#adaaaa] uppercase tracking-[0.2em]">Showing 3 of 124 recorded trades</span>
          <div className="flex gap-3">
            <button className="w-12 h-12 rounded-lg bg-[#131313] flex items-center justify-center text-[#adaaaa] hover:text-[#9cff93] transition-colors group">
              <span className="material-symbols-outlined group-active:scale-90 transition-transform">chevron_left</span>
            </button>
            <button className="w-12 h-12 rounded-lg bg-[#262626] border border-[#9cff93]/40 flex items-center justify-center text-[#9cff93] font-bold font-label text-sm">
              1
            </button>
            <button className="w-12 h-12 rounded-lg bg-[#131313] flex items-center justify-center text-[#adaaaa] hover:text-[#9cff93] transition-colors">
              2
            </button>
            <button className="w-12 h-12 rounded-lg bg-[#131313] flex items-center justify-center text-[#adaaaa] hover:text-[#9cff93] transition-colors group">
              <span className="material-symbols-outlined group-active:scale-90 transition-transform">chevron_right</span>
            </button>
          </div>
        </div>
      </main>

      {/* Floating Menu for Mobile Precision */}
      <div className="fixed bottom-8 right-8 z-50 md:hidden">
        <button className="w-16 h-16 bg-[#9cff93] rounded-full shadow-[0_0_32px_rgba(156,255,147,0.2)] flex items-center justify-center text-[#006413] active:scale-90 transition-all">
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>
    </div>
  );
};

export default JournalPage;