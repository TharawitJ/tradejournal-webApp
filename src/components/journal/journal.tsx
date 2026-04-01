import React from "react";
import type { JournalEntry } from "../../stores/journalStore";
import { useJournalStore } from "../../stores/journalStore";
import {
  calculateRR,
  calDuration,
  calPnL,
  calculatePercentTP,
  calculatePercentSL,
} from "../../commons/utils/PnLfunction";

interface JournalCardProps {
  entry: JournalEntry;
  handleToggleResult: (recordId: string | number) => void;
  handleEditClick: (entry: JournalEntry) => void;
  handleDelete: (recordId: string | number) => void;
}

const makeToFixed = (data: any) => {
  if (data) {
    const toString = data.toString();
    if (toString >= 5) {
      const toFix = Number(data);
      return toFix;
    } else if (toString <= 2) {
      const toFix = Number(data).toFixed(3);
      return toFix;
    } else {
      const toFix = Number(data).toFixed(3);
      return toFix;
    }
  }
};

const JournalCard: React.FC<JournalCardProps> = ({
  entry,
  handleToggleResult,
  handleEditClick,
  handleDelete,
}) => {
  const tpPercent = calculatePercentTP(entry.entryPrice, entry.TP);
  const slPercent = calculatePercentSL(entry.entryPrice, entry.SL);
  const rr = calculateRR(entry);
  // const id = entry.recordId;
  // console.log(entry.winLose)
  const timeToFormat = new Date().toISOString().slice(0, 16);
  const formatedTime = timeToFormat;

  const toFixedentryPrice = makeToFixed(entry.entryPrice);
  const toFixedmargin = makeToFixed(entry.margin);
  const toFixedslPercent = makeToFixed(slPercent);
  const toFixedtpPercent = makeToFixed(tpPercent);
  const toFixedEntrySL = makeToFixed(entry.SL);
  const toFixedEntryTP = makeToFixed(entry.TP);

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-stretch group border-2 border-gray-800 rounded-3xl p-3 hover:border-[#9cff93]/20 transition-all duration-300">
      <div className="w-full xl:w-1/4 bg-[#131313] p-8 rounded-xl border border-transparent transition-all shadow-[0_0_32px_rgba(255,255,255,0.04)]">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="font-label text-[13px] uppercase tracking-[0.2em] text-[#9cff93] mb-2 block">
              Tier - {entry.setUpTier}
            </p>
            <p className="font-label text-[13px] uppercase tracking-[0.2em] text-[#18bcd1] mb-2 block">
              Model - <span className="bold">{entry.entryModelName}</span>
            </p>
            <h3 className="font-headline font-extrabold text-3xl text-white tracking-tighter">
              {entry.entryAssetName}
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <span className="font-label text-[10px] text-[#adaaaa] uppercase">
              PnL
            </span>
            <span
              className={`px-4 py-1.5 rounded-full font-label text-[16px] font-bold uppercase tracking-widest ${
                entry.positionPnL !== null
                  ? entry.positionPnL >= 0
                    ? "bg-[#006c47] text-[#e1ffeb]"
                    : "bg-[#6c0000] text-[#ffe1e1]"
                  : "bg-gray-800 text-gray-400"
              }`}
            >
              {entry.positionPnL !== null
                ? `${entry.positionPnL >= 0 ? "+" : ""}${entry.positionPnL}%`
                : "On Going"}
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
                {toFixedentryPrice}
              </p>
            </div>
            <div>
              <p className="font-label text-[16px] text-[#adaaaa] uppercase tracking-tighter mb-1">
                Margin
              </p>
              <p className="font-label text-base text-white font-bold">
                {toFixedmargin}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-label text-[16px] text-[#adaaaa] uppercase tracking-tighter mb-1">
                SL / TP
              </p>
              <div className="font-label text-xs flex flex-row gap-2">
                <div>
                  <div>
                    <span className="text-[#ff716c] font-bold">
                      {toFixedEntrySL}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#ff716c] font-bold">
                      {toFixedslPercent}%
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="text-[#00ec3b] font-bold">
                      {toFixedEntryTP}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#00ec3b] font-bold">
                      {toFixedtpPercent}%
                    </span>
                  </div>
                </div>
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
                {formatedTime || "-"}{" "}
                {entry.exitDateTime ? `→ ${entry.exitDateTime}` : ""}
              </p>
            </div>
            <p className="font-label text-[11px] text-[#adaaaa]">
              {entry.duration ? `${entry.duration}m` : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-1/4 bg-[#1a1919] p-8 rounded-xl flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-[#9cff93] text-lg">
              check_circle
            </span>
            <span className="font-label text-[16px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold">
              Advantages
            </span>
          </div>
          <p className="font-body text-sm text-white/70">
            {entry.advantage || "No advantages recorded"}
          </p>
        </div>
        <div className="mt-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-[#ff716c] text-lg">
              cancel
            </span>
            <span className="font-label text-[16px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold">
              Disadvantages
            </span>
          </div>
          <p className="font-body text-sm text-white/70">
            {entry.disadvantage || "No disadvantages recorded"}
          </p>
        </div>
      </div>

      <div className="w-full xl:flex-1 bg-[#1a1919] p-8 rounded-xl flex flex-col justify-between">
        <div>
          <span className="font-label text-[16px] uppercase tracking-[0.2em] text-[#adaaaa] font-bold mb-6 block">
            Notes & Reflection
          </span>
          <p className="font-body text-base leading-8 text-white/90 border-l-2 border-[#9cff93]/10 pl-6">
            {entry.notes || "No notes recorded."}
          </p>
        </div>
        <div className="mt-12 pt-6 border-t border-[#494847]/10">
          <span className="font-label text-[16px] uppercase tracking-[0.2em] text-[#9cff93] font-bold mb-2 block">
            Feedback
          </span>
          <p className="font-body text-xs text-[#adaaaa] tracking-wide">
            {entry.feedback || "N/A"}
          </p>
        </div>
      </div>

      <div className="w-full xl:w-48 flex xl:flex-col gap-4">
        <button
          onClick={() => handleToggleResult(entry.recordId)}
          className={`flex-1 ${
            entry.winLose === "WIN"
              ? "bg-[#9cff93]/10 border-[#9cff93]/30 text-[#9cff93]"
              : entry.winLose === "LOSE"
                ? "bg-[#ff716c]/10 border-[#ff716c]/30 text-[#ff716c]"
                : "bg-white/5 border-white/10 text-white/40"
          } hover:brightness-125 font-label text-[13px] font-bold py-5 rounded-lg transition-all border flex flex-col items-center justify-center gap-2 group uppercase tracking-widest`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {entry.winLose === "WIN"
              ? "emoji_events"
              : entry.winLose === "LOSE"
                ? "trending_down"
                : "pending"}
          </span>
          {entry.winLose === "WIN"
            ? "Win"
            : entry.winLose === "LOSE"
              ? "Lose"
              : "No Result"}
        </button>
        <button
          onClick={() => handleEditClick(entry)}
          className="flex-1 bg-[#201f1f] hover:bg-[#262626] text-white font-label text-[13px] font-bold py-5 rounded-lg transition-all flex flex-col items-center justify-center gap-2 uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-2xl">edit</span>
          Edit
        </button>
        <button
          onClick={() => handleDelete(entry.recordId)}
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
