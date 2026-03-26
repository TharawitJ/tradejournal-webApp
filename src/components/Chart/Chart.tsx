import React, { useEffect } from "react";
import {
  Chart,
  CandlestickSeries,
  PriceLine,
} from "lightweight-charts-react-components";
import { CrosshairMode, LineStyle } from "lightweight-charts";
import { useChartStore } from "../../stores/chartStore";
import { getBinanceWSUrl } from "../../api/apiChart";

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
  const {
    data,
    timeframe,
    setTimeframe,
    position,
    entryPrice,
    stopLoss,
    takeProfit,
    assetName,
    setEntryPrice,
    setStopLoss,
    setTakeProfit,
    togglePosition,
    loadHistoricalData,
    updateLastCandle,
  } = useChartStore();

  // 📥 Load historical data
  useEffect(() => {
    loadHistoricalData();
  }, [timeframe, loadHistoricalData]);

  // 🔌 WebSocket live updates
  useEffect(() => {
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
            onClick={() => setTimeframe(tf)}
            style={{
              padding: "4px 8px",
              fontSize: "16px",
              background: timeframe === tf ? "#2962ff" : "transparent",
              color: timeframe === tf ? "white" : "#d1d4dc",
              border: "none",
              borderRadius: "2px",
              cursor: "pointer",
              fontWeight: timeframe === tf ? "bold" : "normal",
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
            onClick={() => togglePosition("long")}
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
            onClick={() => togglePosition("short")}
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

      <Chart key={timeframe} autoSize options={chartOptions} >
        <CandlestickSeries data={data} options={seriesOptions}>
          {entryPrice !== "" && (
            <PriceLine
              price={Number(entryPrice)}
              options={{
                title: position === "long" ? "ENTRY LONG" : "ENTRY SHORT",
                color: "#7E89AC",
                lineWidth: 2,
                axisLabelVisible: true,
                lineStyle: LineStyle.LargeDashed,
              }}
            />
          )}
          {stopLoss !== "" && (
            <PriceLine
              price={Number(stopLoss)}
              options={{
                title: "SL",
                color: "#ff6b6b",
                lineWidth: 2,
                axisLabelVisible: true,
                lineStyle: LineStyle.Solid,
              }}
            />
          )}
          {takeProfit !== "" && (
            <PriceLine
              price={Number(takeProfit)}
              options={{
                title: "TP",
                color: "#28a49c",
                lineWidth: 2,
                axisLabelVisible: true,
                lineStyle: LineStyle.Solid,
              }}
            />
          )}
        </CandlestickSeries>
      </Chart>
    </div>
  );
}
