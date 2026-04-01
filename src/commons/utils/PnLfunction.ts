export const calculateRR = (entry: JournalEntry) => {
  const risk = Math.abs(entry.entryPrice - entry.SL);
  const reward = Math.abs(entry.entryPrice - entry.TP);
  if (risk === 0) return "0";
  return (reward / risk).toFixed(2);
};

export const calculateWinPnL = (entry: JournalEntry) => {
  const risk = Math.abs(entry.entryPrice - entry.SL);
  const reward = Math.abs(entry.entryPrice - entry.TP);
  if (risk === 0) return "0";
  return (reward / risk).toFixed(1);
};
export const calculateLosePnL = (entry: JournalEntry) => {
  const risk = Math.abs(entry.entryPrice - entry.SL);
  const reward = Math.abs(entry.entryPrice - entry.TP);
  if (risk === 0) return "0";
  return (reward / risk).toFixed(1);
};

export const calDuration = (exitDateTime, entryDateTime) => {
  if (exitDateTime && entryDateTime) {
    const duration =
      (new Date(exitDateTime).getTime() - new Date(entryDateTime).getTime()) /
      1000;

    return duration;
  } else {
    return null;
  }
};
export const calculatePercentTP = (entryPrice, TP) => {
  let tpPercentChange = null;

  tpPercentChange = Math.abs((TP - entryPrice) / entryPrice);
  return tpPercentChange;
};
export const calculatePercentSL = (entryPrice, SL) => {
  let slPercentChange = null;

  slPercentChange = Math.abs((entryPrice - SL) / entryPrice);
  return slPercentChange;
};

export const calPnL = (margin, leverage, entryPrice, SL, TP, winLose) => {
  const slPercentChange = Math.abs((entryPrice - SL) / entryPrice);
  const tpPercentChange = Math.abs((TP - entryPrice) / entryPrice);

  let profitPosition = 0;
  if (winLose.toUpperCase() === "OPEN") {
    if (winLose && slPercentChange !== null && tpPercentChange !== null) {
      if (winLose.toUpperCase() === "WIN") {
        profitPosition = margin * leverage * tpPercentChange;
        return profitPosition;
      } else {
        profitPosition = -margin * leverage * slPercentChange;
        return profitPosition;
      }
    }
    return { slPercentChange, tpPercentChange, profitPosition };
  }
};
