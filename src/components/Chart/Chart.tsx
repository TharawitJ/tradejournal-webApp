import React, { useEffect } from "react";
import {
  Chart,
  CandlestickSeries,
  PriceLine,
} from "lightweight-charts-react-components";
import { LineStyle } from "lightweight-charts";
import { useChartStore } from "../../stores/chartStore";
import { getBinanceWSUrl } from "../../api/apiChart";
import {TIMEFRAMES, TIMEZONES, chartOptions, seriesOptions} from "../../commons/chartOption"


export default function BinanceChart() {
  const {
    data,
    timeframe,
    setTimeframe,
    timezone,
    setTimezone,
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

  const timezoneOffset = TIMEZONES.find(tz => tz.label === timezone)?.offset || 0;

  // 📥 Load historical data
  useEffect(() => {
    loadHistoricalData();
  }, [timeframe, timezone, loadHistoricalData]);

  // 🔌 WebSocket live updates
  useEffect(() => {
    const WS_URL = getBinanceWSUrl(assetName,timeframe);
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const k = message.k;

      const candle = {
        time: (k.t / 1000) + timezoneOffset,
        open: +k.o,
        high: +k.h,
        low: +k.l,
        close: +k.c,
      };

      updateLastCandle(candle);
    };

    return () => ws.close();
  }, [assetName,timeframe, timezoneOffset, updateLastCandle]);

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
        background: "rgba(20, 20, 20)",
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

      {/* Timezone Selector Overlay (Bottom Right) */}
      <div style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 10,
        background: "#1a1a1a",
        padding: "0 10px",
        height: "26px", // Typical height of the time bar area
        display: "flex",
        alignItems: "center",
        // borderTop: "1px solid rgba(255,255,255,0.1)",
        // borderLeft: "1px solid rgba(255,255,255,0.1)",
      }}>
        <select 
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          style={{
            background: "transparent",
            color: "#d1d4dc",
            border: "none",
            fontSize: "11px",
            outline: "none",
            cursor: "pointer",
            fontWeight: "bold",
            paddingRight: "5px"
          }}
        >
          {TIMEZONES.map(tz => (
            <option key={tz.label} value={tz.label} style={{ background: "#1e222d" }}>
              {tz.label}
            </option>
          ))}
        </select>
      </div>

      {/* Position Controls Overlay */}
      <div style={{
        position: "absolute",
        top: 20,
        left: 30,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        background: "rgba(20, 20, 20, 0.95)",
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
                color: "white",
                lineWidth: 1,
                axisLabelVisible: true,
                lineStyle: LineStyle.Solid,
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
