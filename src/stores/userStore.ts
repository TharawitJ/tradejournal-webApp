import {
  mainApi,
  getUserModel,
  createUserModel,
  deleteUserModel as deleteUserModelApi,
  getUserFundHistory,
} from "../api/apiMain";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  token: string;
  userModels: EntryModel[];
  fundAddedHistory: FundHistory[];
  login: (body: any) => Promise<any>;
  logout: () => void;
  setUpdateUser: (userData: User, token?: string) => void;
  fetchUserFundAdded: (userId: number) => Promise<void>;
  fetchUserModels: () => Promise<void>;
  createUserModel: (body: { name: string; userId: number }) => Promise<void>;
  deleteUserModel: (userId: number) => Promise<void>;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      userModels: [],
      fundAddedHistory: [],
      login: async (body) => {
        const resp = await mainApi.post("/login", body);
        set({ token: resp.data.token, user: resp.data.user });
        return resp;
      },
      logout: () => set({ token: "", user: null, userModels: [] }),

      setUpdateUser: (userData, token) =>
        set((state) => ({
          user: userData,
          token: token || state.token,
        })),

      fetchUserFundAdded: async (userId: number) => {
        try {
          const resp = await getUserFundHistory(userId);
          set({ fundAddedHistory: resp.data.userFund || [] });
          console.log("userFund",resp.data.userFund);
          console.log("userFund",resp.data.userFund[0].amouth);
        } catch (err) {
          console.error("Failed to fetch user fund history");
        }
      },

      fetchUserModels: async () => {
        try {
          const resp = await getUserModel();
          set({ userModels: resp.data.userModel || [] });
        } catch (err) {
          console.error("Failed to fetch user models", err);
        }
      },
      createUserModel: async (body) => {
        try {
          await createUserModel(body);
          const resp = await getUserModel();
          set({ userModels: resp.data.userModel || [] });
        } catch (err) {
          console.error("Failed to create user model", err);
          throw err;
        }
      },
      deleteUserModel: async (modelId) => {
        try {
          await deleteUserModelApi(modelId);
          set((state) => ({
            userModels: state.userModels.filter((m) => m.modelId !== modelId),
          }));
        } catch (err) {
          console.error("Failed to delete user model", err);
          throw err;
        }
      },
    }),
    {
      name: "userState",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
