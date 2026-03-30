import { mainApi, getUserModel, createUserModel, deleteUserModel as deleteUserModelApi } from "../api/apiMain";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: any | null;
  token: string;
  userModels: any[];
  login: (body: any) => Promise<any>;
  logout: () => void;
  setUpdateUser: (userData: any, token?: string) => void;
  fetchUserModels: () => Promise<void>;
  createUserModel: (body: any) => Promise<void>;
  deleteUserModel: (id: number) => Promise<void>;
}

const useUserStore = create<UserState>(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      userModels: [],
      login: async (body: any) => {
        const resp = await mainApi.post("/login", body);
        set({ token: resp.data.token, user: resp.data.user });
        return resp;
      },
      logout: () => set({ token: "", user: null, userModels: [] }),
      setUpdateUser: (userData: any, token?: string) =>
        set((state) => ({
          user: userData,
          token: token || state.token,
        })),
      fetchUserModels: async () => {
        try {
          const resp = await getUserModel();
          set({ userModels: resp.data.userModel || [] });
        } catch (err) {
          console.error("Failed to fetch user models", err);
        }
      },
      createUserModel: async (body: any) => {
        try {
          await createUserModel(body);
          // Refetch to update the list and re-render UI
          const resp = await getUserModel();
          set({ userModels: resp.data.userModel || [] });
        } catch (err) {
          console.error("Failed to create user model", err);
          throw err;
        }
      },
      deleteUserModel: async (id: number) => {
        try {
          await deleteUserModelApi(id);
          // Update state locally or refetch
          set((state) => ({
            userModels: state.userModels.filter((m) => m.id !== id),
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
  ) as any,
);

export default useUserStore;
