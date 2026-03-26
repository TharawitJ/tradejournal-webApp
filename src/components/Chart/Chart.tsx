import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  CandlestickSeries,
  PriceLine,
} from "lightweight-charts-react-components";
import { CrosshairMode, LineStyle } from "lightweight-charts";

const SYMBOL = "BTCUSDT";
const TIMEFRAMES = ["1m", "5m", "15m", "1h", "4h", "1d"];

const chartOptions = {
  height: 600,
  layout: {
    background: { color: "transparent" },
    textColor: "#d1d4dc",
  },
  grid: {
    vertLines: { color: "rgba(42, 46, 57, 0.1)" },
    horzLines: { color: "rgba(42, 46, 57, 0.1)" },
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
  },
};

const seriesOptions = {
  upColor: "#26a69a",
  downColor: "#ef5350",
  borderVisible: false,
  wickUpColor: "#26a69a",
  wickDownColor: "#ef5350",
};

export default function BinanceChart() {
  const [data, setData] = useState<any[]>([]);
  const [interval, setInterval] = useState("1m");
  const [position, setPosition] = useState<"long" | "short" | null>(null);
  const [entryPrice, setEntryPrice] = useState<number | "">("");
  const [stopLoss, setStopLoss] = useState<number | "">("");
  const [takeProfit, setTakeProfit] = useState<number | "">("");
  
  const lastPrice = data.length > 0 ? data[data.length - 1].close : null;
  const lastCandleRef = useRef<any>(null);

  const handleSetPosition = (type: "long" | "short") => {
    if (position === type) {
      // Toggle off
      setPosition(null);
      setEntryPrice("");
      setStopLoss("");
      setTakeProfit("");
      return;
    }

    if (lastPrice) {
      setPosition(type);
      const entry = Number(lastPrice.toFixed(3));
      setEntryPrice(entry);
      
      const offset = entry * 0.01; // 1% default
      const sl = type === "long" ? entry - offset : entry + offset;
      const tp = type === "long" ? entry + offset : entry - offset;
      
      setStopLoss(Number(sl.toFixed(3)));
      setTakeProfit(Number(tp.toFixed(3)));
    }
  };

  // 📥 Load historical data
  useEffect(() => {
    let isMounted = true;
    setData([]); // 🟢 Fix: Clear data immediately on interval change
    const REST_URL = `https://api.binance.com/api/v3/klines?symbol=${SYMBOL}&interval=${interval}&limit=1000`;
    
    fetch(REST_URL)
      .then((res) => res.json())
      .then((raw) => {
        if (!isMounted) return;
        const formatted = raw.map((c: any) => ({
          time: c[0] / 1000,
          open: +c[1],
          high: +c[2],
          low: +c[3],
          close: +c[4],
        }));

        setData(formatted);
        lastCandleRef.current = formatted[formatted.length - 1];
      });
    return () => { isMounted = false; };
  }, [interval]);

  // 🔌 WebSocket live updates
  useEffect(() => {
    const WS_URL = `wss://stream.binance.com:9443/ws/${SYMBOL.toLowerCase()}@kline_${interval}`;
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

      setData((prev) => {
        if (prev.length === 0) return [candle];
        const last = prev[prev.length - 1];

        // 🔴 Safety check: ignore out-of-order candles from previous interval or delays
        if (last && candle.time < last.time) {
          return prev;
        }

        // 🟡 If same candle → update
        if (last && last.time === candle.time) {
          const updated = [...prev];
          updated[updated.length - 1] = candle;
          return updated;
        }

        // 🟢 New candle → append
        return [...prev, candle];
      });
    };

    return () => ws.close();
  }, [interval]);

  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      {/* Timeframe Buttons Overlay */}
      <div style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
        display: "flex",
        gap: "5px",
        background: "rgba(20, 20, 20, 0.8)",
        padding: "5px",
        borderRadius: "4px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf}
            onClick={() => setInterval(tf)}
            style={{
              padding: "4px 8px",
              fontSize: "16px",
              background: interval === tf ? "#2962ff" : "transparent",
              color: interval === tf ? "white" : "#d1d4dc",
              border: "none",
              borderRadius: "2px",
              cursor: "pointer",
              fontWeight: interval === tf ? "bold" : "normal",
              transition: "all 0.2s"
            }}
          >
            {tf.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Position Controls Overlay */}
      <div style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        background: "rgba(20, 20, 20, 0.8)",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "white",
        fontSize: "12px",
        width: "200px"
      }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => handleSetPosition("long")}
            style={{
              flex: 1,
              padding: "8px",
              background: position === "long" ? "#26a69a" : "transparent",
              border: "1px solid #26a69a",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            LONG
          </button>
          <button 
            onClick={() => handleSetPosition("short")}
            style={{
              flex: 1,
              padding: "8px",
              background: position === "short" ? "#ef5350" : "transparent",
              border: "1px solid #ef5350",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            SHORT
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label>Entry Price</label>
          <input 
            type="number" 
            value={entryPrice} 
            onChange={(e) => setEntryPrice(Number(e.target.value))}
            style={{ background: "#1e222d", border: "1px solid #363c4e", color: "white", padding: "4px" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label>Stop Loss</label>
          <input 
            type="number" 
            value={stopLoss} 
            onChange={(e) => setStopLoss(Number(e.target.value))}
            style={{ background: "#1e222d", border: "1px solid #363c4e", color: "white", padding: "4px" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label>Take Profit</label>
          <input 
            type="number" 
            value={takeProfit} 
            onChange={(e) => setTakeProfit(Number(e.target.value))}
            style={{ background: "#1e222d", border: "1px solid #363c4e", color: "white", padding: "4px" }}
          />
        </div>

        {position && (
          <div style={{ marginTop: "5px", fontSize: "10px", color: "#868993" }}>
            Current Position: <span style={{ color: position === "long" ? "#26a69a" : "#ef5350", fontWeight: "bold" }}>{position.toUpperCase()}</span>
          </div>
        )}
      </div>

      <Chart key={interval} autoSize options={chartOptions} >
        <CandlestickSeries data={data} options={seriesOptions}>
          {entryPrice !== "" && (
            <PriceLine
              price={Number(entryPrice)}
              color="#ffffff"
              lineWidth={2}
              lineStyle={LineStyle.Solid}
              axisLabelVisible={true}
              title={position === "long" ? "LONG" : "SHORT"}
            />
          )}
          {stopLoss !== "" && (
            <PriceLine
              price={Number(stopLoss)}
              color="#ffffff"
              lineWidth={2}
              lineStyle={LineStyle.Dashed}
              axisLabelVisible={true}
              title="SL"
            />
          )}
          {takeProfit !== "" && (
            <PriceLine
              price={Number(takeProfit)}
              color="#ffffff"
              lineWidth={2}
              lineStyle={LineStyle.Dashed}
              axisLabelVisible={true}
              title="TP"
            />
          )}
        </CandlestickSeries>
      </Chart>
    </div>
  );
}
