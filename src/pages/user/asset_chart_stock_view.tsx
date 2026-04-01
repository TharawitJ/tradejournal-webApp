import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import BinanceChart from "../../components/chart/Chart";
import useUserStore from "../../stores/userStore";
import { useChartStore } from "../../stores/chartStore";
import { useJournalStore, useFetchAllAsset } from "../../stores/journalStore";
import { getBinanceWSUrl } from "../../api/apiChart";
import {
  calculateRR,
  calculateWinPnL,
  calculateLosePnL,
  calDuration,
  calculatePercentTP,
  calculatePercentSL,
  calPnL,
} from "../../commons/utils/PnLfunction.ts";

const AssetChartStockView: React.FC = () => {
  const userModels = useUserStore((state) => state.userModels);
  const [leverage, setLeverage] = useState(10);
  const [margin, setMargin] = useState(1);
  // const [percentageTP, setPercentageTP] = useState();
  // const [percentageSL, setPercentageSL] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [winLose, setWinLose] = useState("OPEN");
  const [entryAssetId, setEntryAssetId] = useState("");
  const [entryModelId, setEntryModelId] = useState("");
  const [setUpTier, setSetUpTier] = useState("");
  const [entryModelName, setEntryModelName] = useState("");
  const [entryDateTime, setEntryDateTime] = useState(
    new Date().toISOString().slice(0, 16),
  );

  const {
    position,
    entryPrice,
    SL,
    TP,
    currentAssetName,
    timeframe,
    setCurrentAssetName,
    updateLastCandle,
    loadHistoricalData,
  } = useChartStore();
  const { setEntries } = useJournalStore();
  const allAsset = useFetchAllAsset((state) => state.allAsset);
  const fetchAllAsset = useFetchAllAsset((state) => state.fetchAllAsset);

  useEffect(() => {
    fetchAllAsset();
  }, []);

  const handleRecordJournal = () => {
    if (!position || entryPrice === "" || SL === "" || TP === "") {
      alert("Please set a position (Long/Short) on the chart first!");
      return;
    }
    const resultPnL = calPnL(margin, leverage, entryPrice, SL, TP, winLose);
    console.log("PnL", resultPnL);
    // setPercentageTP(resultPnL.tpPercentChange!)
    // setPercentageSL(resultPnL.slPercentChange!)
    setIsModalOpen(true);
  };

  const saveJournal = () => {
    const tradeData = {
      assetId: 1, // Placeholder: need logic to map currentAssetName to assetId
      entryModelId: 1, // Placeholder: need selection logic
      setUpTier: "A",
      entryPrice: Number(entryPrice),
      SL: Number(SL),
      TP: Number(TP),
      margin, // Placeholder
      riskPerTrade: 1, // Placeholder
      notes,
      entryModelName,
      entryDateTime,
      leverage,
    };

    // console.log("Saving Journal Entry:", tradeData);

    setEntries(tradeData);
    setIsModalOpen(false);
    setNotes("");
    setEntryModelName("");
    setEntryDateTime(new Date().toISOString().slice(0, 16));
    alert("Journal recorded successfully!");
  };

  useEffect(() => {
    loadHistoricalData();
  }, [currentAssetName, loadHistoricalData]);
  useEffect(() => {
    // console.log(currentAssetName);
    const WS_URL = getBinanceWSUrl(currentAssetName, timeframe);
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
  }, [currentAssetName, timeframe, updateLastCandle]);

  const handleAssetChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // console.log(currentAssetName)

    setEntryAssetId(e.target.id);
    setCurrentAssetName(e.target.value);
  };

  const calculateRR = () => {
    if (entryPrice === "" || SL === "" || TP === "") return "0.00";
    const entry = Number(entryPrice);
    const sl = Number(SL);
    const tp = Number(TP);

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
                  value={currentAssetName}
                  onChange={handleAssetChange}
                  className="bg-transparent text-white border-none focus:outline-none cursor-pointer"
                >
                  {allAsset.map((asset) => (
                    <option
                      className="font-medium text-black"
                      key={asset.assetId}
                      value={asset.assetName}
                    >
                      {asset.assetName}
                    </option>
                  ))}
                </select>
              </div>
              <h2 className="font-bold text-3xl tracking-tighter">
                {currentAssetName}
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
                  <p className="text-sm font-medium">{currentAssetName}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    Side
                  </label>
                  <p
                    className={`text-sm font-bold ${position === "LONG" ? "text-[#26a69a]" : "text-[#ef5350]"}`}
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
                    {SL} ({calculatePercentSL(entryPrice,SL).toFixed(2)}%)
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">
                    TP
                  </label>
                  <p className="text-sm font-medium text-[#26a69a]">
                    {TP} ({calculatePercentTP(entryPrice,TP).toFixed(2)}%)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                    Entry Model
                  </label>
                  <div className="border bg-[#0e0e0e] border-white/10 rounded-lg flex ">
                    <select
                      value={entryModelName}
                      onChange={(e) => {
                        setEntryModelId(e.target.id);
                        setEntryModelName(e.target.value);
                      }}
                      className="w-[90%] mx-auto bg-[#0e0e0e]  p-2 text-sm focus:outline-none focus:border-[#2962ff] text-white"
                    >
                      {userModels.map((model: any) => (
                        <option className="font-medium" key={model.modelId}>
                          {model.modelName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                      Leverage
                    </label>
                    <input
                      type="text"
                      value={leverage}
                      onChange={(e) => setLeverage(Number(e.target.value))}
                      className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#2962ff] text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
                      Margin
                    </label>
                    <input
                      type="text"
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#2962ff] text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-label text-[13px] uppercase tracking-[0.2em] text-[#adaaaa] mb-2">
                    Set Up Tier
                  </label>
                  <select
                    value={setUpTier}
                    onChange={(e) => setSetUpTier(e.target.value)}
                    className="w-full bg-[#1a1919] border border-gray-800 rounded-xl px-4 py-3 text-white font-label focus:border-[#9cff93] outline-none transition-all appearance-none"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                  </select>
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
                  className="w-full bg-[#0e0e0e] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#2962ff] min-h-25 text-white"
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
    </div>
  );
};

export default AssetChartStockView;
