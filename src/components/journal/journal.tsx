import React from "react";
import type { JournalEntry } from "../../stores/journalStore";

interface JournalCardProps {
  entry: JournalEntry;
  calculatePercent: (price: number, entryPrice: number, side: "long" | "short") => number;
  calculatePnL: (entry: JournalEntry) => number | null;
  calculateRR: (entry: JournalEntry) => string;
  handleToggleResult: (id: string) => void;
  handleEditClick: (entry: JournalEntry) => void;
  handleDelete: (id: string) => void;
}

const JournalCard: React.FC<JournalCardProps> = ({
  entry,
  calculatePercent,
  calculatePnL,
  calculateRR,
  handleToggleResult,
  handleEditClick,
  handleDelete,
}) => {
  const slPercent = calculatePercent(entry.stopLoss, entry.entryPrice, entry.side);
  const tpPercent = calculatePercent(entry.takeProfit, entry.entryPrice, entry.side);
  const pnl = calculatePnL(entry);
  const rr = calculateRR(entry);
  const id = entry.id || (entry as any)._id;

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-stretch group border-2 border-gray-800 rounded-3xl p-3 hover:border-[#9cff93]/20 transition-all duration-300">
      <div className="w-full xl:w-1/4 bg-[#131313] p-8 rounded-xl border border-transparent transition-all shadow-[0_0_32px_rgba(255,255,255,0.04)]">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="font-label text-[13px] uppercase tracking-[0.2em] text-[#9cff93] mb-2 block">
              {entry.side === "long" ? "LONG" : "SHORT"} • {entry.entryModel || "N/A"}
            </span>
            <h3 className="font-headline font-extrabold text-3xl text-white tracking-tighter">
              {entry.assetName}
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <span className="font-label text-[10px] text-[#adaaaa] uppercase">PnL</span>
            <span
              className={`px-4 py-1.5 rounded-full font-label text-[16px] font-bold uppercase tracking-widest ${
                pnl !== null
                  ? pnl >= 0
                    ? "bg-[#006c47] text-[#e1ffeb]"
                    : "bg-[#6c0000] text-[#ffe1e1]"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {pnl !== null ? `${pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}%` : "OPEN"}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-label text-[16px] text-[#adaaaa] uppercase tracking-tighter mb-1">
                Entry Price
              </p>
              <p className="font-label text-base text-white font-bold">
                {entry.entryPrice.toFixed(5)}
              </p>
            </div>
            <div>
              <p className="font-label text-[16px] text-[#adaaaa] uppercase tracking-tighter mb-1">
                Exit Price
              </p>
              <p className="font-label text-base text-white font-bold">
                {entry.exitPrice?.toFixed(5) || "-"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-label text-[16px] text-[#adaaaa] uppercase tracking-tighter mb-1">
                SL / TP (%)
              </p>
              <div className="font-label text-xs">
                <span className="text-[#ff716c] font-bold">{slPercent.toFixed(2)}%</span>
                <span className="text-[#adaaaa] mx-2">/</span>
                <span className="text-[#00ec3b] font-bold">{tpPercent.toFixed(2)}%</span>
              </div>
            </div>
            <div>
              <p className="font-label text-[13px] text-[#adaaaa] uppercase tracking-tighter mb-1">
                RR Ratio
              </p>
              <p className="font-label text-s text-white font-bold">1 : {rr}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#494847]/10 flex justify-between items-end">
            <div>
              <p className="font-label text-[16px] text-[#adaaaa] uppercase tracking-tighter mb-2">
                Timeline
              </p>
              <p className="font-label text-[13px] text-white/90 tracking-wide">
                {entry.entryDateTime || "-"} {entry.exitDateTime ? `→ ${entry.exitDateTime}` : ""}
              </p>
            </div>
            <p className="font-label text-[11px] text-[#adaaaa]">{entry.duration || ""}</p>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-1/4 bg-[#1a1919] p-8 rounded-xl flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-[#9cff93] text-lg">check_circle</span>
            <span className="font-label text-[16px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold">
              Advantages
            </span>
          </div>
          <ul className="space-y-3 font-body text-sm text-white/70">
            {entry.advantages?.map((adv, i) => (
              <li key={i} className="flex items-start gap-3 leading-relaxed">
                <span className="text-[#9cff93] mt-1">•</span> {adv}
              </li>
            )) || <li className="italic opacity-50">No advantages recorded</li>}
          </ul>
        </div>
        <div className="mt-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-[#ff716c] text-lg">cancel</span>
            <span className="font-label text-[16px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold">
              Disadvantages
            </span>
          </div>
          <ul className="space-y-3 font-body text-sm text-white/70">
            {entry.disadvantages?.map((dis, i) => (
              <li key={i} className="flex items-start gap-3 leading-relaxed">
                <span className="text-[#ff716c] mt-1">•</span> {dis}
              </li>
            )) || <li className="italic opacity-50">No disadvantages recorded</li>}
          </ul>
        </div>
      </div>

      <div className="w-full xl:flex-1 bg-[#1a1919] p-8 rounded-xl flex flex-col justify-between">
        <div>
          <span className="font-label text-[16px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold mb-6 block">
            Notes & Reflection
          </span>
          <p className="font-body text-base leading-8 text-white/90 italic border-l-2 border-[#9cff93]/10 pl-6">
            {entry.notes || "No notes recorded."}
          </p>
        </div>
        <div className="mt-12 pt-6 border-t border-[#494847]/10">
          <span className="font-label text-[16px] uppercase tracking-[0.2em] text-[#9cff93] font-bold mb-2 block">
            System Feedback
          </span>
          <p className="font-body text-xs text-[#adaaaa] tracking-wide">
            {entry.systemFeedback || "N/A"}
          </p>
        </div>
      </div>

      <div className="w-full xl:w-48 flex xl:flex-col gap-4">
        <button
          onClick={() => handleToggleResult(id)}
          className={`flex-1 ${
            entry.result === "win"
              ? "bg-[#9cff93]/10 border-[#9cff93]/30 text-[#9cff93]"
              : entry.result === "loss"
              ? "bg-[#ff716c]/10 border-[#ff716c]/30 text-[#ff716c]"
              : "bg-white/5 border-white/10 text-white/40"
          } hover:brightness-125 font-label text-[13px] font-bold py-5 rounded-lg transition-all border flex flex-col items-center justify-center gap-2 group uppercase tracking-widest`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {entry.result === "win" ? "emoji_events" : entry.result === "loss" ? "trending_down" : "pending"}
          </span>
          {entry.result === "win" ? "Win" : entry.result === "loss" ? "Lose" : "No Result"}
        </button>
        <button
          onClick={() => handleEditClick(entry)}
          className="flex-1 bg-[#201f1f] hover:bg-[#262626] text-white font-label text-[13px] font-bold py-5 rounded-lg transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-2xl">edit</span>
          Edit
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="flex-1 bg-[#201f1f] hover:bg-[#ff716c]/10 hover:text-[#ff716c] text-[#adaaaa] font-label text-[13px] font-bold py-5 rounded-lg transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-2xl">delete</span>
          Delete
        </button>
      </div>
    </div>
  );
};

export default JournalCard;
