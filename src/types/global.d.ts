export {};

declare global {
  interface User {
    userId: number;
    username: string;
    email: string;
  }

  interface EntryModel {
    modelId: number;
    modelName: string;
    userId: number;
  }
  interface FundHistory {
    fundId: number;
    date: string;
    amouth: number;
  }
  interface allAsset {
    assetId: number;
    assetName: string;
  }

  interface JournalEntry {
    recordId: string;
    userId: number;
    entryAssetId: number;
    entryAssetName: string;
    entryModelId: number;
    entryModelName: string;
    setUpTier: string;
    entryDateTime?: string | number;
    exitDateTime?: string | number;
    entryPrice: number;
    SL: number;
    TP: number;
    advantage?: string;
    disadvantage?: string;
    notes?: string;
    feedback?: string;
    imageUrl?: string;
    winLose?: "WIN" | "LOSE" | "OPEN";
    profit?: number;
    currentBalance?: number;
    duration?: number;
    margin: number;
    positionPnL?: number;
    riskPerTrade: number;
    leverage: number;

    // Frontend display helpers
    assetName?: string;
    entryModel?: string;
    side?: ""|"LONG" | "SHORT";
  }
}
