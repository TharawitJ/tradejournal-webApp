import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FundHistory {
  id: string;
  amount: number;
  timestamp: number;
  type: "deposit" | "withdrawal";
}

interface PnLUserState {
  currentBalance: number;
  history: FundHistory[];
  
  // Actions
  addFund: (amount: number) => void;
  withdrawFund: (amount: number) => void;
  updateBalanceFromTrade: (pnl: number) => void;
  clearHistory: () => void;
}

export const usePnLUserStore = create<PnLUserState>()(
  persist(
    (set, get) => ({
      currentBalance: 10000, // Initial default balance
      history: [],

      addFund: (amount: number) => {
        const newHistory: FundHistory = {
          id: crypto.randomUUID(),
          amount,
          timestamp: Date.now(),
          type: "deposit",
        };
        set((state) => ({
          currentBalance: state.currentBalance + amount,
          history: [newHistory, ...state.history],
        }));
      },

      withdrawFund: (amount: number) => {
        const { currentBalance } = get();
        if (amount > currentBalance) {
          console.error("Insufficient funds");
          return;
        }
        const newHistory: FundHistory = {
          id: crypto.randomUUID(),
          amount,
          timestamp: Date.now(),
          type: "withdrawal",
        };
        set((state) => ({
          currentBalance: state.currentBalance - amount,
          history: [newHistory, ...state.history],
        }));
      },

      updateBalanceFromTrade: (pnl: number) => {
        set((state) => ({
          currentBalance: state.currentBalance + pnl,
        }));
      },

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "pnl-user-storage", // unique name for localStorage
    }
  )
);
