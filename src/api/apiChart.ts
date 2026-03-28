

export const fetchHistoricalData = async (assetName:string ,interval: string) => {
  const REST_URL = `https://api.binance.com/api/v3/klines?symbol=${assetName}&interval=${interval}&limit=5000000`;
  const response = await fetch(REST_URL);
  const raw = await response.json();
  
  return raw.map((c: any) => ({
    time: c[0] / 1000,
    open: +c[1],
    high: +c[2],
    low: +c[3],
    close: +c[4],
  }));
};

export const getBinanceWSUrl = (assetName:string,interval: string) => {
  return `wss://stream.binance.com:9443/ws/${assetName.toLowerCase()}@kline_${interval}`;
};
