import create from "zustand";
import { Contract } from "ethers";

interface ContractStore {
  core: Contract | undefined;
  setCore: (core: Contract) => void;
}

export const useContracts = create<ContractStore>((set) => ({
  core: undefined,
  setCore: (core: Contract) => set(() => ({ core })),
}));
