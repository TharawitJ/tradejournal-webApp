import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface JournalEntry {
  id: string;
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
}

interface JournalState {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, "id" | "timestamp" | "status">) => void;
  closeEntry: (id: string, pnl: number) => void;
  deleteEntry: (id: string) => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (entry) => {
        const newEntry: JournalEntry = {
          ...entry,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
          status: "open",
        };
        set((state) => ({
          entries: [newEntry, ...state.entries],
        }));
      },
      closeEntry: (id, pnl) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id ? { ...e, status: "closed", pnl } : e
          ),
        }));
      },
      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        }));
      },
    }),
    {
      name: "journal-storage",
    }
  )
);
