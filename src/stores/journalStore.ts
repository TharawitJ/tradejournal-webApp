import { create } from "zustand";
import { persist } from "zustand/middleware";

export type JournalEntry = {
  id: string;
  _id?: string;
  assetName: string;
  side: "long" | "short";
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  timestamp: number;
  notes?: string;
  status: "open" | "closed";
  pnl?: number;
  entryModel?: string;
  entryDateTime?: string;
  exitDateTime?: string;
  result?: "win" | "loss" | "none";
  exitPrice?: number;
  duration?: string;
  advantages?: string[];
  disadvantages?: string[];
  systemFeedback?: string;
};

interface JournalState {
  entries: JournalEntry[];
  setEntries: (entries: JournalEntry[]) => void;
  addEntry: (entry: Omit<JournalEntry, "id" | "timestamp" | "status">) => void;
  closeEntry: (id: string, pnl: number) => void;
  deleteEntry: (id: string) => void;
  toggleResult: (id: string) => void;
  updateJournal: (id: string, updates: Partial<JournalEntry>) => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: [],
      setEntries: (entries) => set({ entries }),
      addEntry: (entry) => {
        const newEntry: JournalEntry = {
          ...entry,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          status: "open",
          result: entry.result || "none",
        };
        set((state) => ({
          entries: [newEntry, ...state.entries],
        }));
      },
      closeEntry: (id, pnl) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            (e.id === id || e._id === id) ? { ...e, status: "closed", pnl } : e
          ),
        }));
      },
      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id && e._id !== id),
        }));
      },
      toggleResult: (id) => {
        set((state) => ({
          entries: state.entries.map((e) => {
            if (e.id !== id && e._id !== id) return e;
            let nextResult: "win" | "loss" | "none" = "none";
            if (e.result === "none") nextResult = "win";
            else if (e.result === "win") nextResult = "loss";
            else nextResult = "none";
            return { ...e, result: nextResult };
          }),
        }));
      },

      updateJournal: (id, updates) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            (e.id === id || e._id === id) ? { ...e, ...updates } : e
          ),
        }));
      },
    }),
    {
      name: "journal-storage",
    }
  )
);
