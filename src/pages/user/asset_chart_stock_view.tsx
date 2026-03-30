import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import BinanceChart from "../../components/Chart/Chart";
import useUserStore from "../../stores/userStore"
import { useChartStore } from "../../stores/chartStore";
import { useJournalStore } from "../../stores/journalStore";
import { getBinanceWSUrl } from "../../api/apiChart";

const AssetChartStockView: React.FC = () => {
  const userModels = useUserStore((state) => state.userModels);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [entryModel, setEntryModel] = useState("Breakout");
  const [entryDateTime, setEntryDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );

  const {
    position,
    entryPrice,
    stopLoss,
    takeProfit,
    assetName,
    timeframe,
    setAssetName,
    updateLastCandle,
    loadHistoricalData,
  } = useChartStore();
  const { addEntry } = useJournalStore();

  const handleRecordJournal = () => { 
    if (
      !position ||
      entryPrice === "" ||
      stopLoss === "" ||
      takeProfit === ""
    ) {
      alert("Please set a position (Long/Short) on the chart first!");
      return;
    }
    setIsModalOpen(true);
  };

  const saveJournal = () => {
    const tradeData = {
      assetId: 1, // Placeholder: need logic to map assetName to assetId
      entryModelId: 1, // Placeholder: need selection logic
      setUpTier: "A",
      entryPrice: Number(entryPrice),
      SL: Number(stopLoss),
      TP: Number(takeProfit),
      margin: 100, // Placeholder
      riskPerTrade: 1, // Placeholder
      notes,
      entryModel,
      entryDateTime,
    };

    console.log("Saving Journal Entry:", tradeData);

    addEntry(tradeData);
    setIsModalOpen(false);
    setNotes("");
    setEntryModel("");
    setEntryDateTime(new Date().toISOString().slice(0, 16));
    alert("Journal recorded successfully!");
  };

    useEffect(() => {
      loadHistoricalData();
    }, [assetName, loadHistoricalData]);
    useEffect(() => {
      console.log(assetName)
      const WS_URL = getBinanceWSUrl(assetName,timeframe);
      const ws = new WebSocket(WS_URL);
  
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const k = message.k;
  
        const candle = {
          time: k.t / 1000,
          open: +k.o,
          high: +k.h,
          low: +k.l,
          close: +k.c,
        };
  
        updateLastCandle(candle);
      };
  
      return () => ws.close();
    }, [assetName,timeframe, updateLastCandle]);
  
  const handleAssetChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAssetName(e.target.value);
  };
  
  const calculateRR = () => {
    if (entryPrice === "" || stopLoss === "" || takeProfit === "")
      return "0.00";
    const entry = Number(entryPrice);
    const sl = Number(stopLoss);
    const tp = Number(takeProfit);

    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp - entry);

    if (risk === 0) return "0.00";
    return (reward / risk).toFixed(2);
  };

  return (
    <div className="bg-[#0e0e0e] text-[#ffffff] min-h-screen">
      <main className="pt-5 pb-12 px-6 max-w-screen-2xl mx-auto">
        <div className="w-[93%] flex flex-col md:flex-row justify-between items-start md:items-end mb-5 gap-6 mx-auto">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 ">
                <div className="bg-secondary-container pr-3 py-1 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2962ff] animate-pulse"></span>
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    Live Market
                  </span>
                </div>
                <select
                  value={assetName}
                  onChange={handleAssetChange}
                  className="bg-transparent text-white border-none focus:outline-none cursor-pointer"
                >
                  <option className="text-black" value="BTCUSDT">BTCUSDT</option>
                  <option className="text-black" value="ETHUSDT">ETHUSDT</option>
                  <option className="text-black" value="SOLUSDT">SOLUSDT</option>
                </select>
              </div>
              <h2 className="font-bold text-3xl tracking-tighter">
                {assetName}
              </h2>
            </div>

            <button
              onClick={handleRecordJournal}
              className="border border-white/20 text-white px-2 py-2 rounded-md font-bold tracking-widest flex items-center  hover:bg-white/10 active:scale-95 transition-all text-[10px]"
            >
              RECORD JOURNAL
            </button>
          </div>
        </div>

        <section className="mb-14">
          <div className="w-[95%] h-[600px] bg-[#1a1a1a] rounded-xl relative overflow-hidden border border-white/5 mx-auto">
            <BinanceChart />
          </div>
        </section>
      </main>

      {/* Journal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">
              Record Trade Journal
            </h3>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    Asset
                  </label>
                  <p className="text-sm font-medium">{assetName}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    Side
                  </label>
                  <p
                    className={`text-sm font-bold ${position === "long" ? "text-[#26a69a]" : "text-[#ef5350]"}`}
                  >
                    {position?.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    Entry
                  </label>
                  <p className="text-sm font-medium">{entryPrice}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    RR Ratio
                  </label>
                  <p className="text-sm font-bold text-[#2962ff]">
                    1 : {calculateRR()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    SL
                  </label>
                  <p className="text-sm font-medium text-[#ef5350]">
                    {stopLoss}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    TP
                  </label>
                  <p className="text-sm font-medium text-[#26a69a]">
                    {takeProfit}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                    Entry Model
                  </label>
                  <div className="border bg-[#0e0e0e] border-white/10 rounded-lg flex " >
                  <select
                    value={entryModel}
                    onChange={(e) => setEntryModel(e.target.value)}
                    className="w-[90%] mx-auto bg-[#0e0e0e]  p-2 text-sm focus:outline-none focus:border-[#2962ff] text-white"
                  >{userModels.map((model: any) => (
                    <option className="font-medium" key={model.id}>{model.name}</option>
                ))}
                  </select>
                </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                    Entry Date time
                  </label>
                  <input
                    type="datetime-local"
                    value={entryDateTime}
                    onChange={(e) => setEntryDateTime(e.target.value)}
                    className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-[#2962ff] text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                  Trade Notes / Setup
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Why did you take this trade?"
                  className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#2962ff] min-h-[100px] text-white"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 rounded-lg border border-white/10 text-sm font-bold hover:bg-white/5 transition-all"
              >
                CANCEL
              </button>
              <button
                onClick={saveJournal}
                className="flex-1 px-4 py-3 rounded-lg bg-[#2962ff] text-white text-sm font-bold hover:bg-[#1e4bd8] transition-all shadow-lg shadow-[#2962ff]/20"
              >
                SAVE ENTRY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Buttons */}
      {/* <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <button className="w-14 h-14 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center border border-white/10 hover:bg-[#252525] transition-all active:scale-90">
          <span className="material-symbols-outlined">camera</span>
        </button>
        <button
          onClick={handleRecordJournal}
          className="w-14 h-14 bg-[#2962ff] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#2962ff]/20 hover:scale-105 transition-all active:scale-90"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div> */}
    </div>
  );
};

export default AssetChartStockView;
