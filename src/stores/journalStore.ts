import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getAllAsset,
  apiCreateJournal,
  apiGetAllJournal,
  apiUpdateJournal,
  apiDeleteJournal,
} from "../api/apiMain";

interface JournalState {
  entries: JournalEntry[];
  setEntries: (entries: JournalEntry[]) => void;
  fetchJournal: () => void;
  createJournal: (body: JournalEntry[]) => void;
  deleteJournal: (id: string | number) => void;
  updateJournal: (id: string | number, updates: Partial<JournalEntry>) => void;
}
interface allAsset {
  assetId: number;
  assetName: string;
}
interface allAssetState {
  allAsset: allAsset[];
  fetchAllAsset: () => Promise<void>;
}

// allAsset: allAsset[]
export const useFetchAllAsset = create<allAssetState>((set) => ({
  allAsset: [],
  fetchAllAsset: async () => {
    try {
      const resp = await getAllAsset();
      set({ allAsset: resp.data.data || [] });
      // console.log(resp.data.data);
    } catch (err) {
      console.error("Failed to fetch user fund history");
    }
  },
}));

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: [],
      setEntries: (entries) => set({ entries }),
      fetchJournal: async () => {
        try {
          const resp = await apiGetAllJournal();

          set({ entries: resp.data.journalFound || [] });
        } catch (err) {
          console.error("Failed to fetch journal");
        }
      },

      createJournal: async (body) => {
        try {
          console.log("createJournal",body)
          await apiCreateJournal(body);

          const resp = await apiGetAllJournal();
          console.log("createJournal", resp.data);

          set({ data: resp.data.journalFound || [] });
        } catch (err) {
          console.error("Failed to create journal");
        }
      },
      deleteJournal: async (recordId) => {
        try {
          await apiDeleteJournal(recordId.toString());
          set((state) => ({
            entries: state.entries.filter((e) => e.recordId !== recordId),
          }));
        } catch (err) {
          console.error("Failed to create journal");
        }
      },

      updateJournal: async (recordId:string|number, updates) => {
        try {
          const resp = await apiUpdateJournal(recordId, updates);
          console.log("updateJournalStore", resp.data);
          set((state) => ({
            entries: state.entries.map((data) =>
              data.recordId === recordId ? { ...data, ...updates } : data,
            ),
          }));
        } catch (err) {
          console.error("Failed to update journal");
        }
      },
    }),
    {
      name: "journal-storage",
    },
  ),
);
