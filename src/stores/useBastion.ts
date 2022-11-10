import create from "zustand";

export interface BastionPosition {
  name: string;
  value: string;
  apy: string;
}

interface BastionStore {
  totalValue: string;
  biggestPositionValue: string;
  biggestPositionName: string;
  averageAPY: string;
  yearlyProfit: string;
  positions: BastionPosition[];
}

export const useBastion = create<BastionStore>((set) => ({
  totalValue: "-",
  biggestPositionValue: "-",
  biggestPositionName: "",
  averageAPY: "-",
  yearlyProfit: "-",
  positions: [],
}));
