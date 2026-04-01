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
  position: "LONG" | "SHORT";
  entryPrice: number | "";
  SL: number | "";
  TP: number | "";
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
  setPosition: (pos: "LONG" | "SHORT" ) => void;
  setCurrentAssetName: (asset: string) => void;
  setEntryPrice: (price: number | "") => void;
  setSL: (price: number | "") => void;
  setTP: (price: number | "") => void;
  togglePosition: (type: "LONG" | "SHORT") => void;
  loadHistoricalData: () => Promise<void>;
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
  position:null,
  entryPrice: "",
  SL: "",
  TP: "",
  currentAssetName: localStorage.getItem("selectedAsset") || "BTCUSDT",
  timezone: localStorage.getItem("selectedTimezone") || "UTC",

  maxPrice: null,
  minPrice: null,
  avgPrice: null,
  // showMaxLine: false,
  // showMinLine: false,
  // showAvgLine: false,

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
  setCurrentAssetName: (asset) => {
    localStorage.setItem("selectedAsset", asset);
    set({ currentAssetName: asset });
  },
  setEntryPrice: (price) => set({ entryPrice: price }),
  setSL: (price) => set({ SL: price }),
  setTP: (price) => set({ TP: price }),

  togglePosition: (type) => {
    const { position, lastPrice } = get();
    if (position === type) {
      set({
        position: "OPEN",
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
          position: type,
          entryPrice: entry,
          SL: Number(sl.toFixed(3)),
          TP: Number(tp.toFixed(3)),
        });
      } else {
        set({ position: type });
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
