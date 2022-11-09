import create from "zustand";

export interface BastionPosition {
  name: string;
  value: string;
  apy: string;
}

interface BastionStore {
  totalValue: string;
  biggestPositionValue: string;
  averageAPY: string;
  positions: BastionPosition[];
}

export const useBastion = create<BastionStore>((set) => ({
  totalValue: "-",
  biggestPositionValue: "-",
  averageAPY: "-",
  positions: [],
}));
