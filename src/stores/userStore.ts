import { mainApi, getUserModel, createUserModel, deleteUserModel as deleteUserModelApi } from "../api/apiMain";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  token: string;
  userModels: EntryModel[];
  login: (body: any) => Promise<any>;
  logout: () => void;
  setUpdateUser: (userData: User, token?: string) => void;
  fetchUserModels: () => Promise<void>;
  createUserModel: (body: { name: string; userId: number }) => Promise<void>;
  deleteUserModel: (id: number) => Promise<void>;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: "",
      userModels: [],
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
      deleteUserModel: async (id) => {
        try {
          await deleteUserModelApi(id);
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
    }
  )
);

export default useUserStore;
