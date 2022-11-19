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
  // address: "0xB6c0C00b3FdcAD0c3994257a7c668b8fEeeF467E",
  address: "0x631A44F635c8fF85848324Be5F8f5aCbed0b9ce5",
  balance: "-",
  stableBalance: "-",
  login: (address: string) => set({ address, isLogged: true }),
  logout: () => set({ address: "", isLogged: false }),
}));
