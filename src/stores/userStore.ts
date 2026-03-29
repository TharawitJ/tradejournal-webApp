import { mainApi } from "../api/apiMain";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user: any | null;
  token: string;
  login: (body: any) => Promise<any>;
  logout: () => void;
  setUpdateUser: (userData: any, token?: string) => void;
}

const useUserStore = create<UserState>(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      login: async (body: any) => {
        const resp = await mainApi.post("/login", body);
        set({ token: resp.data.token, user: resp.data.user });
        return resp;
      },
      logout: () => set({ token: "", user: null }),
      setUpdateUser: (userData: any, token?: string) =>
        set((state) => ({
          user: userData,
          token: token || state.token,
        })),
    }),
    {
      name: "userState",
      storage: createJSONStorage(() => localStorage),
    },
  ) as any,
);

export default useUserStore;
