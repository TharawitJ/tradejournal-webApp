import { CrosshairMode } from "lightweight-charts";

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d"];

const TIMEZONES = [
  { label: "UTC", offset: 0 },
  { label: "Bangkok (GMT+7)", offset: 7 * 3600 },
  { label: "New York (GMT-5)", offset: -5 * 3600 },
  { label: "London (GMT+0)", offset: 0 },
  { label: "Tokyo (GMT+9)", offset: 9 * 3600 },
  { label: "Sydney (GMT+11)", offset: 11 * 3600 },
];

const chartOptions = {
  height: 600,
  layout: {
    background: { color: "transparent" },
    textColor: "#d1d4dc",
  },
  grid: {
    vertLines: { color: "rgba(42, 46, 57, 0.5)" },
    horzLines: { color: "rgba(42, 46, 57, 0.5)" },
  },
  crosshair: {
    mode: CrosshairMode.Normal, 
  },
  rightPriceScale: {
    borderColor: "rgba(197, 203, 206, 0.1)",
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 0.1)",
    timeVisible: true,
    secondsVisible: false,
    shiftVisibleRangeOnNewBar: true,
    rightOffset: 10,
  },
};
const seriesOptions = {
  upColor: "#26a69a",
  downColor: "#ef5350",
  borderVisible: false,
  wickUpColor: "#26a69a",
  wickDownColor: "#ef5350",
};

export { TIMEFRAMES, TIMEZONES, chartOptions, seriesOptions };
