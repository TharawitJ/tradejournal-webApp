import { create } from "zustand";
import { fetchHistoricalData } from "../api/apiChart";
import { TIMEZONES } from "../commons/chartOption";

interface ChartData {
  time: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
}

const TIMEFRAME_SECONDS: Record<string, number> = {
  "1m": 60,
  "5m": 300,
  "15m": 900,
  "1h": 3600,
  "4h": 14400,
  "1d": 86400,
};

const generateWhitespace = (lastTime: number, firstTime: number, timeframe: string) => {
  const seconds = TIMEFRAME_SECONDS[timeframe] || 60;
  // Define a fixed time buffer (e.g., 60 days of empty space)
  const BUFFER_DURATION = 300 * 24 * 3600; 
  const count = Math.ceil(BUFFER_DURATION / seconds);

  const future = Array.from({ length: count*24 }, (_, i) => ({
    time: lastTime + (i + 1) * seconds,
  }));
  const past = Array.from({ length: count }, (_, i) => ({
    time: firstTime - (i + 1) * seconds,
  })).reverse();
  return { past, future };
};

interface ChartState {
  data: ChartData[];
  lastPrice: number | null;
  timeframe: string;
  side: "LONG" | "SHORT" | "";
  entryPrice: number | "";
  SL: number | "";
  TP: number | "";
  currentAssetId:number;
  currentAssetName: string;
  timezone: string;

  // Extra Price Lines State
  maxPrice: number | null;
  minPrice: number | null;
  avgPrice: number | null;
  // setAllAsset:() => void;
  setData: (data: ChartData[]) => void;
  updateLastCandle: (candle: ChartData) => void;
  setLastPrice: (price: number) => void;
  setTimeframe: (tf: string) => void;
  setTimezone: (tz: string) => void;
  setPosition: (pos: "LONG" | "SHORT" | "") => void;
  setCurrentAssetId: (asset: number|string) => void;
  setCurrentAssetName: (asset: string) => void;
  setEntryPrice: (price: number | "") => void;
  setSL: (price: number | "") => void;
  setTP: (price: number | "") => void;
  togglePosition: (type: "LONG" | "SHORT") => void;
  loadHistoricalData: () => Promise<void>;
}


const calculateStats = (data: ChartData[]) => {
  const realData = data.filter(d => d.close !== undefined);
  if (realData.length === 0) return { max: null, min: null, avg: null };
  let max = -Infinity;
  let min = Infinity;
  let sum = 0;

  for (const candle of realData) {
    if (candle.high! > max) max = candle.high!;
    if (candle.low! < min) min = candle.low!;
    sum += candle.close!;
  }

  return {
    max: Number(max.toFixed(3)),
    min: Number(min.toFixed(3)),
    avg: Number((sum / realData.length).toFixed(3)),
  };
};

export const useChartStore = create<ChartState>((set, get) => ({
  data: [],
  lastPrice: null,
  timeframe: localStorage.getItem("selectedTimeframe") || "1d",
  side:"",
  entryPrice: "",
  SL: "",
  TP: "",
  currentAssetName: localStorage.getItem("selectedAssetName") || "BTCUSDT",
  currentAssetId: Number(localStorage.getItem("selectedAssetId")) || 1,
  timezone: localStorage.getItem("selectedTimezone") || "UTC",

  maxPrice: null,
  minPrice: null,
  avgPrice: null,

  setData: (data) => {
    const { timeframe } = get();
    const realData = data.filter(d => d.close !== undefined);
    const lastPrice = realData.length > 0 ? realData[realData.length - 1].close! : null;
    const stats = calculateStats(realData);
    
    let displayData = data;
    if (realData.length > 0) {
      const firstTime = realData[0].time;
      const lastTime = realData[realData.length - 1].time;
      const { past, future } = generateWhitespace(lastTime, firstTime, timeframe);
      displayData = [...past, ...realData, ...future];
    }

    set({
      data: displayData,
      lastPrice,
        maxPrice: stats.max,
        minPrice: stats.min,
        avgPrice: stats.avg,
    });
  },

  updateLastCandle: (candle) => {
    const { data, timeframe } = get();
    const realData = data.filter(d => d.close !== undefined);
    let updatedRealData;

    if (realData.length === 0) {
      updatedRealData = [candle];
    } else {
      const last = realData[realData.length - 1];
      if (candle.time < last.time) return;
      if (last.time === candle.time) {
        updatedRealData = [...realData];
        updatedRealData[updatedRealData.length - 1] = candle;
      } else {
        updatedRealData = [...realData, candle];
      }
    }

    const stats = calculateStats(updatedRealData);
    const firstTime = updatedRealData[0].time;
    const lastTime = updatedRealData[updatedRealData.length - 1].time;
    const { past, future } = generateWhitespace(lastTime, firstTime, timeframe);
    const displayData = [...past, ...updatedRealData, ...future];

    set({
      data: displayData,
      lastPrice: candle.close!,
      maxPrice: stats.max,
      minPrice: stats.min,
      avgPrice: stats.avg,
    });
  },

  setLastPrice: (price) => set({ lastPrice: price }),
  setTimeframe: (tf) => {
    localStorage.setItem("selectedTimeframe", tf);
    set({ timeframe: tf });
  },
  setTimezone: (tz) => {
    localStorage.setItem("selectedTimezone", tz);
    set({ timezone: tz });
  },
  setPosition: (pos) => set({ side: pos }),
  setCurrentAssetName: (assetName) => {
    localStorage.setItem("selectedAssetName", assetName);
    set({ currentAssetName: assetName });
  },
  setCurrentAssetId:(assetId)=>{
    set({currentAssetId:Number(assetId)})
    localStorage.setItem("selectedAssetId",assetId.toString())
    // localStorage converts data to string internally
  },
  setEntryPrice: (price) => set({ entryPrice: price }),
  setSL: (price) => set({ SL: price }),
  setTP: (price) => set({ TP: price }),

  togglePosition: (type) => {
    const { side, lastPrice } = get();
    if (side === type) {
      set({
        side: "",
        entryPrice: "",
        SL: "",
        TP: "",
      });
    } else {
      if (lastPrice) {
        const entry = Number(lastPrice.toFixed(3));
        const offsetSL = entry * 0.01;
        const offsetTP = entry * 0.02;
        const sl = type === "SHORT" ? entry + offsetSL : entry - offsetSL;
        const tp = type === "LONG" ? entry + offsetTP : entry - offsetTP;

        set({
          side: type,
          entryPrice: entry,
          SL: Number(sl.toFixed(3)),
          TP: Number(tp.toFixed(3)),
        });
      } else {
        set({ side: type });
      }
    }
  },

  loadHistoricalData: async () => {
    const { currentAssetName, timeframe, timezone } = get();
    set({ data: [] });
    const formattedData = await fetchHistoricalData(
      currentAssetName,
      timeframe,
    );

    // Apply timezone offset
    const offset = TIMEZONES.find((tz) => tz.label === timezone)?.offset || 0;
    const adjustedData = formattedData.map((d) => ({
      ...d,
      time: d.time + offset,
    }));

    get().setData(adjustedData);
  },
}));
