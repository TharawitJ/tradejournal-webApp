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
  getDashboardPnL
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
    totalPnL: 0
  });

  // Modal form state
  const [form, setForm] = useState({
    assetName: "",
    side: "long" as "long" | "short",
    entryPrice: "",
    stopLoss: "",
    takeProfit: "",
    entryDateTime: "",
    exitDateTime: "",
    notes: "",
    systemFeedback: "",
    exitPrice: "",
    entryModel: ""
  });

  const fetchJournals = async () => {
    try {
      const resp = await getAllJournal();
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
        getDashboardPnL()
      ]);
      
      setStats({
        avgRR: rrResp.data.AverageRR || 0,
        winRate: winResp.data.winrate || 0,
        totalPnL: pnlResp.data.result?.reduce((acc: number, curr: any) => acc + (curr.profitPosition || 0), 0) || 0
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
    const risk = Math.abs(entry.entryPrice - entry.stopLoss);
    const reward = Math.abs(entry.entryPrice - entry.takeProfit);
    if (risk === 0) return "0";
    return (reward / risk).toFixed(1);
  };

  const calculatePercent = (price: number, entryPrice: number, side: "long" | "short") => {
    if (entryPrice === 0) return 0;
    const diff = price - entryPrice;
    const percent = (diff / entryPrice) * 100;
    return side === "long" ? percent : -percent;
  };

  const calculatePnL = (entry: JournalEntry) => {
    if (!entry.exitPrice || entry.result === "none") return null;
    return calculatePercent(entry.exitPrice, entry.entryPrice, entry.side);
  };

  const handleEditClick = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setForm({
      assetName: entry.assetName,
      side: entry.side,
      entryPrice: entry.entryPrice.toString(),
      stopLoss: entry.stopLoss.toString(),
      takeProfit: entry.takeProfit.toString(),
      entryDateTime: entry.entryDateTime || "",
      exitDateTime: entry.exitDateTime || "",
      notes: entry.notes || "",
      systemFeedback: entry.systemFeedback || "",
      exitPrice: entry.exitPrice?.toString() || "",
      entryModel: entry.entryModel || ""
    });
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setForm({
      assetName: "",
      side: "long",
      entryPrice: "",
      stopLoss: "",
      takeProfit: "",
      entryDateTime: new Date().toISOString().slice(0, 16).replace("T", " "),
      exitDateTime: "",
      notes: "",
      systemFeedback: "",
      exitPrice: "",
      entryModel: ""
    });
  };

  const handleSave = async () => {
    try {
      const data = {
        assetName: form.assetName,
        side: form.side,
        entryPrice: parseFloat(form.entryPrice),
        stopLoss: parseFloat(form.stopLoss),
        takeProfit: parseFloat(form.takeProfit),
        entryDateTime: form.entryDateTime,
        exitDateTime: form.exitDateTime || undefined,
        notes: form.notes,
        systemFeedback: form.systemFeedback,
        exitPrice: form.exitPrice ? parseFloat(form.exitPrice) : undefined,
        entryModel: form.entryModel
      };

      if (editingEntry) {
        const id = editingEntry.id || (editingEntry as any)._id;
        const resp = await updateJournalApi(id, data);
        updateJournal(id, resp.data.journal || data);
        toast.success("Trade updated successfully");
        setEditingEntry(null);
      } else {
        const resp = await createJournalApi(data);
        fetchJournals(); // Refresh list
        toast.success("Trade added successfully");
        setIsAdding(false);
      }
      fetchStats(); // Update stats
    } catch (err) {
      toast.error(editingEntry ? "Failed to update trade" : "Failed to add trade");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this trade?")) {
      try {
        await deleteJournalApi(id);
        deleteEntry(id);
        toast.success("Trade deleted");
        fetchStats();
      } catch (err) {
        toast.error("Failed to delete trade");
      }
    }
  };

  const handleToggleResult = async (id: string) => {
    const entry = entries.find(e => (e.id === id || (e as any)._id === id));
    if (!entry) return;
    
    let nextResult: "win" | "loss" | "none" = "none";
    if (entry.result === "none") nextResult = "win";
    else if (entry.result === "win") nextResult = "loss";
    else nextResult = "none";

    try {
      await updateJournalApi(id, { result: nextResult });
      updateJournal(id, { result: nextResult });
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
                key={entry.id || (entry as any)._id}
                entry={entry}
                calculatePercent={calculatePercent}
                calculatePnL={calculatePnL}
                calculateRR={calculateRR}
                handleToggleResult={handleToggleResult}
                handleEditClick={handleEditClick}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center py-32 border-2 border-dashed border-gray-800 rounded-3xl">
              <p className="text-[#adaaaa] font-label uppercase tracking-widest">No trades recorded yet</p>
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
                <div className="md:col-span-2 grid grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">Asset Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. BTCUSDT"
                      value={form.assetName}
                      onChange={(e) => setForm({...form, assetName: e.target.value})}
                      className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">Side</label>
                    <select 
                      value={form.side}
                      onChange={(e) => setForm({...form, side: e.target.value as "long" | "short"})}
                      className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all appearance-none"
                    >
                      <option value="long">LONG</option>
                      <option value="short">SHORT</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">Entry Price</label>
                  <input 
                    type="number" 
                    step="0.00001"
                    value={form.entryPrice}
                    onChange={(e) => setForm({...form, entryPrice: e.target.value})}
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">Exit Price</label>
                  <input 
                    type="number" 
                    step="0.00001"
                    value={form.exitPrice}
                    onChange={(e) => setForm({...form, exitPrice: e.target.value})}
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">Stop Loss</label>
                  <input 
                    type="number" 
                    step="0.00001"
                    value={form.stopLoss}
                    onChange={(e) => setForm({...form, stopLoss: e.target.value})}
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#ff716c] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">Take Profit</label>
                  <input 
                    type="number" 
                    step="0.00001"
                    value={form.takeProfit}
                    onChange={(e) => setForm({...form, takeProfit: e.target.value})}
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#00fc40] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">Entry Date/Time</label>
                  <input 
                    type="text" 
                    placeholder="YYYY.MM.DD HH:MM"
                    value={form.entryDateTime}
                    onChange={(e) => setForm({...form, entryDateTime: e.target.value})}
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">Entry Model</label>
                  <input 
                    type="text" 
                    placeholder="e.g. MSS / FVG"
                    value={form.entryModel}
                    onChange={(e) => setForm({...form, entryModel: e.target.value})}
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">Notes & Reflection</label>
                  <textarea 
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({...form, notes: e.target.value})}
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
