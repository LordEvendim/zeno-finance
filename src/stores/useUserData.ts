import create from "zustand";

interface UserDataStore {
  isLogged: boolean;
  address: string;
  balance: string;
  stableBalance: string;
  login: (address: string) => void;
  logout: () => void;
}

export const useUserData = create<UserDataStore>((set) => ({
  isLogged: false,
  address: "0xB6c0C00b3FdcAD0c3994257a7c668b8fEeeF467E",
  balance: "-",
  stableBalance: "-",
  login: (address: string) => set({ address, isLogged: true }),
  logout: () => set({ address: "", isLogged: false }),
}));
