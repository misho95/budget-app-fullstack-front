import { create } from "zustand";
import { UserDataType } from "./data.types";

interface userGlobalStoreType {
  user: UserDataType | null;
  setUser: (userData: UserDataType) => void;
  clearUser: () => void;
}

export const userGlobalStore = create<userGlobalStoreType>((set) => ({
  user: null,
  setUser: (userData: UserDataType) => set(() => ({ user: userData })),
  clearUser: () => set(() => ({ user: null })),
}));
