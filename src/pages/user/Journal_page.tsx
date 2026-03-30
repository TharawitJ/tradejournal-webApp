import React, { useState, useEffect } from "react";
import { useJournalStore } from "../../stores/journalStore";
import type { JournalEntry } from "../../stores/journalStore";
import {
  getAllJournal,
  updateJournal as updateJournalApi,
  deleteJournal as deleteJournalApi,
  createJournal as createJournalApi,
  getDashboardRR,
  getDashboardWinRate,
  getDashboardPnL,
} from "../../api/apiMain";
import { toast } from "react-toastify";
import JournalCard from "../../components/journal/journal";

const JournalPage: React.FC = () => {
  const { entries, updateJournal, setEntries, deleteEntry } = useJournalStore();
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [stats, setStats] = useState({
    avgRR: 0,
    winRate: 0,
    totalPnL: 0,
  });

  // Modal form state
  const [form, setForm] = useState({
    assetId: "",
    entryModelId: "",
    setUpTier: "TIER1",
    entryPrice: "",
    SL: "",
    TP: "",
    margin: "",
    riskPerTrade: "",
    entryDateTime: "",
    exitDateTime: "",
    advantage: "",
    disadvantage: "",
    notes: "",
    feedback: "",
    winLose: "OPEN" as "WIN" | "LOSE" | "OPEN",
    profit: "",
    currentBalance: "",
    positionPnL: "",
    duration: "",
  });

  const fetchJournals = async () => {
    try {
      const resp = await getAllJournal();
      console.log(resp.data);
      setEntries(resp.data);
    } catch (err) {
      console.error("Failed to get journals", err);
    }
  };

  const fetchStats = async () => {
    try {
      const [rrResp, winResp, pnlResp] = await Promise.all([
        getDashboardRR(),
        getDashboardWinRate(),
        getDashboardPnL(),
      ]);

      setStats({
        avgRR: rrResp.data.AverageRR || 0,
        winRate: winResp.data.winrate || 0,
        totalPnL:
          pnlResp.data.result?.reduce(
            (acc: number, curr: any) => acc + (curr.profitPosition || 0),
            0,
          ) || 0,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  useEffect(() => {
    fetchJournals();
    fetchStats();
  }, []);

  const calculateRR = (entry: JournalEntry) => {
    const risk = Math.abs(entry.entryPrice - entry.SL);
    const reward = Math.abs(entry.entryPrice - entry.TP);
    if (risk === 0) return "0";
    return (reward / risk).toFixed(1);
  };

  const handleEditClick = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setForm({
      assetId: entry.assetId?.toString() || "",
      entryModelId: entry.entryModelId?.toString() || "",
      setUpTier: entry.setUpTier || "TIER1",
      entryPrice: entry.entryPrice.toString(),
      SL: entry.SL.toString(),
      TP: entry.TP.toString(),
      margin: entry.margin.toString(),
      riskPerTrade: entry.riskPerTrade.toString(),
      entryDateTime: entry.entryDateTime?.toString() || "",
      exitDateTime: entry.exitDateTime?.toString() || "",
      advantage: entry.advantage || "",
      disadvantage: entry.disadvantage || "",
      notes: entry.notes || "",
      feedback: entry.feedback || "",
      winLose: entry.winLose || "OPEN",
      profit: entry.profit?.toString() || "",
      currentBalance: entry.currentBalance?.toString() || "",
      positionPnL: entry.positionPnL?.toString() || "",
      duration: entry.duration?.toString() || "",
    });
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setForm({
      assetId: "",
      entryModelId: "",
      setUpTier: "TIER1",
      entryPrice: "",
      SL: "",
      TP: "",
      margin: "",
      riskPerTrade: "",
      entryDateTime: new Date().toISOString().slice(0, 16).replace("T", " "),
      exitDateTime: "",
      advantage: "",
      disadvantage: "",
      notes: "",
      feedback: "",
      winLose: "OPEN",
      profit: "",
      currentBalance: "",
      positionPnL: "",
      duration: "",
    });
  };

  const handleSave = async () => {
    try {
      const data = {
        assetId: parseInt(form.assetId),
        entryModelId: parseInt(form.entryModelId),
        setUpTier: form.setUpTier,
        entryPrice: parseFloat(form.entryPrice),
        SL: parseFloat(form.SL),
        TP: parseFloat(form.TP),
        margin: parseFloat(form.margin),
        riskPerTrade: parseFloat(form.riskPerTrade),
        entryDateTime: form.entryDateTime || undefined,
        exitDateTime: form.exitDateTime || undefined,
        advantage: form.advantage,
        disadvantage: form.disadvantage,
        notes: form.notes,
        feedback: form.feedback,
        winLose: form.winLose === "NONE" ? undefined : form.winLose,
        profit: form.profit ? parseFloat(form.profit) : undefined,
        currentBalance: form.currentBalance
          ? parseFloat(form.currentBalance)
          : undefined,
        positionPnL: form.positionPnL
          ? parseFloat(form.positionPnL)
          : undefined,
        duration: form.duration ? parseInt(form.duration) : undefined,
      };

      if (editingEntry) {
        const id =
          (editingEntry as any).recordId ||
          editingEntry.id ||
          (editingEntry as any)._id;
        const resp = await updateJournalApi(id, data);
        updateJournal(id, resp.data.journal || data);
        toast.success("Trade updated successfully");
        setEditingEntry(null);
      } else {
        await createJournalApi(data);
        fetchJournals();
        toast.success("Trade added successfully");
        setIsAdding(false);
      }
      fetchStats();
    } catch (err) {
      toast.error(
        editingEntry ? "Failed to update trade" : "Failed to add trade",
      );
    }
  };

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this trade?")) {
      try {
        await deleteJournalApi(id.toString());
        deleteEntry(id);
        toast.success("Trade deleted");
        fetchStats();
      } catch (err) {
        toast.error("Failed to delete trade");
      }
    }
  };

  const handleToggleResult = async (id: string | number) => {
    const entry = entries.find((e) => e.id === id || (e as any)._id === id || e.recordId === id);
    if (!entry) return;

    let nextResult: "WIN" | "LOSE" | "OPEN" = "OPEN";
    if (entry.winLose === "OPEN") nextResult = "WIN";
    else if (entry.winLose === "WIN") nextResult = "LOSE";
    else nextResult = "OPEN";

    try {
      await updateJournalApi(id.toString(), { winLose: nextResult });
      updateJournal(id, { winLose: nextResult });
      fetchStats();
    } catch (err) {
      toast.error("Failed to update result");
    }
  };

  return (
    <div className="bg-[#0e0e0e] text-[#ffffff] font-body selection:bg-[#9cff93] selection:text-[#006413] min-h-screen">
      <main className="max-w-screen-2xl mx-auto px-6 pt-6 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-8">
          <div className="max-w-2xl">
            <h1 className="font-headline font-bold text-2xl tracking-tight mb-2 uppercase">
              Trade Journal
            </h1>
            <p className="text-[#adaaaa] text-sm font-label uppercase tracking-widest">
              Documenting the journey to mastery
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="bg-[#9cff93] text-[#006413] px-8 py-3 rounded-full font-label font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            New Trade
          </button>
        </div>

        <div className="space-y-12">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <JournalCard
                key={entry.id || (entry as any)._id || entry.recordId}
                entry={entry}
                calculateRR={calculateRR}
                handleToggleResult={handleToggleResult}
                handleEditClick={handleEditClick}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center py-32 border-2 border-dashed border-gray-800 rounded-3xl">
              <p className="text-[#adaaaa] font-label uppercase tracking-widest">
                No trades recorded yet
              </p>
            </div>
          )}
        </div>

        {/* Modal (Add/Edit) */}
        {(editingEntry || isAdding) && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
            <div className="bg-[#131313] border-2 border-gray-800 rounded-3xl p-8 max-w-2xl w-full shadow-[0_0_64px_rgba(0,0,0,0.5)] max-h-[90vh] overflow-y-auto custom-scrollbar">
              <h2 className="text-2xl font-headline font-bold mb-6 uppercase tracking-tight">
                {editingEntry ? "Edit Trade Details" : "Add New Trade"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Asset ID
                  </label>
                  <input
                    type="number"
                    value={form.assetId}
                    onChange={(e) =>
                      setForm({ ...form, assetId: e.target.value })
                    }
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Entry Model ID
                  </label>
                  <select
                    value={form.setUpTier}
                    onChange={(e) =>
                      setForm({ ...form, setUpTier: e.target.value })
                    }
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all appearance-none"
                  >
                    <option value="TIER1">A</option>
                    <option value="TIER2">B</option>
                    <option value="TIER3">C</option>
                    <option value="TIER3">D</option>
                    <option value="TIER3">E</option>
                  </select>
                  {/* <input
                    type="number"
                    value={form.entryModelId}
                    onChange={(e) => setForm({ ...form, entryModelId: e.target.value })}
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all"
                  /> */}
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Set Up Tier
                  </label>
                  <select
                    value={form.setUpTier}
                    onChange={(e) =>
                      setForm({ ...form, setUpTier: e.target.value })
                    }
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all appearance-none"
                  >
                    <option value="TIER1">A</option>
                    <option value="TIER2">B</option>
                    <option value="TIER3">C</option>
                    <option value="TIER3">D</option>
                    <option value="TIER3">E</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Margin
                  </label>
                  <input
                    type="number"
                    value={form.margin}
                    onChange={(e) =>
                      setForm({ ...form, margin: e.target.value })
                    }
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Risk Per Trade
                  </label>
                  <input
                    type="number"
                    value={form.riskPerTrade}
                    onChange={(e) =>
                      setForm({ ...form, riskPerTrade: e.target.value })
                    }
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Entry Price
                  </label>
                  <input
                    type="number"
                    step="0.00001"
                    value={form.entryPrice}
                    onChange={(e) =>
                      setForm({ ...form, entryPrice: e.target.value })
                    }
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Stop Loss (SL)
                  </label>
                  <input
                    type="number"
                    step="0.00001"
                    value={form.SL}
                    onChange={(e) => setForm({ ...form, SL: e.target.value })}
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#ff716c] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Take Profit (TP)
                  </label>
                  <input
                    type="number"
                    step="0.00001"
                    value={form.TP}
                    onChange={(e) => setForm({ ...form, TP: e.target.value })}
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#00fc40] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Entry Date/Time
                  </label>
                  <input
                    type="text"
                    placeholder="YYYY.MM.DD HH:MM"
                    value={form.entryDateTime}
                    onChange={(e) =>
                      setForm({ ...form, entryDateTime: e.target.value })
                    }
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Notes & Reflection
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-body focus:border-[#9cff93] outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setEditingEntry(null);
                    setIsAdding(false);
                  }}
                  className="flex-1 py-4 rounded-xl font-label font-bold uppercase tracking-widest text-sm bg-[#201f1f] hover:bg-[#262626] text-[#adaaaa] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-4 rounded-xl font-label font-bold uppercase tracking-widest text-sm bg-gradient-to-br from-[#9cff93] to-[#00fc40] text-[#006413] hover:brightness-110 transition-all"
                >
                  {editingEntry ? "Save Changes" : "Create Trade"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#494847]/10 pt-12">
          <span className="font-label text-xs text-[#adaaaa] uppercase tracking-[0.2em]">
            Showing {entries.length} recorded trades
          </span>
        </div>
      </main>
    </div>
  );
};

export default JournalPage;
