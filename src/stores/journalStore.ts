import { create } from "zustand";
import { persist } from "zustand/middleware";

export type JournalEntry = {
  id: string;
  _id?: string;
  recordId?: number;
  userId: number;
  assetId: number;
  entryModelId: number;
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

  // Frontend helpers for display
  assetName?: string;
  entryModel?: string;
  side?: "long" | "short";
};

interface JournalState {
  entries: JournalEntry[];
  setEntries: (entries: JournalEntry[]) => void;
  deleteEntry: (id: string | number) => void;
  updateJournal: (id: string | number, updates: Partial<JournalEntry>) => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: [],
      setEntries: (entries) => set({ entries }),
      
      deleteEntry: (id) => {
        set((state) => ({
          entries: state.entries.filter(
            (e) => e.id !== id && e._id !== id && e.recordId !== id
          ),
        }));
      },

      updateJournal: (id, updates) => {
        set((state) => ({
          entries: state.entries.map((e) =>
            (e.id === id || e._id === id || e.recordId === id) 
              ? { ...e, ...updates } 
              : e
          ),
        }));
      },
    }),
    {
      name: "journal-storage",
    }
  )
);
