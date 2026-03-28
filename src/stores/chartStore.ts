import { create } from "zustand";
import { fetchHistoricalData } from "../api/apiChart";
import { TIMEZONES } from "../commons/chartOption";

interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ChartState {
  data: ChartData[];
  lastPrice: number | null;
  timeframe: string;
  position: "long" | "short" | null;
  entryPrice: number | "";
  stopLoss: number | "";
  takeProfit: number | "";
  assetName: string;
  timezone: string;

  // Extra Price Lines State
  maxPrice: number | null;
  minPrice: number | null;
  avgPrice: number | null;
  showMaxLine: boolean;
  showMinLine: boolean;
  showAvgLine: boolean;

  setData: (data: ChartData[]) => void;
  updateLastCandle: (candle: ChartData) => void;
  setLastPrice: (price: number) => void;
  setTimeframe: (tf: string) => void;
  setTimezone: (tz: string) => void;
  setPosition: (pos: "long" | "short" | null) => void;
  setAssetName: (asset: string) => void;
  setEntryPrice: (price: number | "") => void;
  setStopLoss: (price: number | "") => void;
  setTakeProfit: (price: number | "") => void;
  togglePosition: (type: "long" | "short") => void;
  loadHistoricalData: () => Promise<void>;

  // Extra Line Controls
  setShowMaxLine: (show: boolean) => void;
  setShowMinLine: (show: boolean) => void;
  setShowAvgLine: (show: boolean) => void;
}

const calculateStats = (data: ChartData[]) => {
  if (data.length === 0) return { max: null, min: null, avg: null };
  let max = -Infinity;
  let min = Infinity;
  let sum = 0;

  for (const candle of data) {
    if (candle.high > max) max = candle.high;
    if (candle.low < min) min = candle.low;
    sum += candle.close;
  }

  return {
    max: Number(max.toFixed(3)),
    min: Number(min.toFixed(3)),
    avg: Number((sum / data.length).toFixed(3)),
  };
};

export const useChartStore = create<ChartState>((set, get) => ({
  data: [],
  lastPrice: null,
  timeframe: localStorage.getItem("selectedTimeframe") || "1d",
  position: null,
  entryPrice: "",
  stopLoss: "",
  takeProfit: "",
  assetName: localStorage.getItem("selectedAsset") || "BTCUSDT",
  timezone: localStorage.getItem("selectedTimezone") || "UTC",

  maxPrice: null,
  minPrice: null,
  avgPrice: null,
  showMaxLine: false,
  showMinLine: false,
  showAvgLine: false,

  setData: (data) => {
    const lastPrice = data.length > 0 ? data[data.length - 1].close : null;
    const stats = calculateStats(data);
    set({
      data,
      lastPrice,
      maxPrice: stats.max,
      minPrice: stats.min,
      avgPrice: stats.avg,
    });
  },

  updateLastCandle: (candle) => {
    const { data } = get();
    let updatedData;
    if (data.length === 0) {
      updatedData = [candle];
    } else {
      const last = data[data.length - 1];
      if (candle.time < last.time) return;
      if (last.time === candle.time) {
        updatedData = [...data];
        updatedData[updatedData.length - 1] = candle;
      } else {
        updatedData = [...data, candle];
      }
    }

    const stats = calculateStats(updatedData);
    set({
      data: updatedData,
      lastPrice: candle.close,
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
  setPosition: (pos) => set({ position: pos }),
  setAssetName: (asset) => {
    localStorage.setItem("selectedAsset", asset);
    set({ assetName: asset });
  },
  setEntryPrice: (price) => set({ entryPrice: price }),
  setStopLoss: (price) => set({ stopLoss: price }),
  setTakeProfit: (price) => set({ takeProfit: price }),

  togglePosition: (type) => {
    const { position, lastPrice } = get();
    if (position === type) {
      set({
        position: null,
        entryPrice: "",
        stopLoss: "",
        takeProfit: "",
      });
    } else {
      if (lastPrice) {
        const entry = Number(lastPrice.toFixed(3));
        const offset = entry * 0.01;
        const sl = type === "long" ? entry - offset : entry + offset;
        const tp = type === "long" ? entry + offset : entry - offset;

        set({
          position: type,
          entryPrice: entry,
          stopLoss: Number(sl.toFixed(3)),
          takeProfit: Number(tp.toFixed(3)),
        });
      } else {
        set({ position: type });
      }
    }
  },

  loadHistoricalData: async () => {
    const { assetName, timeframe, timezone } = get();
    set({ data: [] });
    const formattedData = await fetchHistoricalData(assetName, timeframe);
    
    // Apply timezone offset
    const offset = TIMEZONES.find(tz => tz.label === timezone)?.offset || 0;
    const adjustedData = formattedData.map(d => ({
      ...d,
      time: d.time + offset
    }));

    get().setData(adjustedData);
  },

  setShowMaxLine: (show) => set({ showMaxLine: show }),
  setShowMinLine: (show) => set({ showMinLine: show }),
  setShowAvgLine: (show) => set({ showAvgLine: show }),
}));
