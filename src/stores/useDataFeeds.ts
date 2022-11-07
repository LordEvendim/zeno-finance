import create from "zustand";

interface useDataFeedsStore {
  totalValue: string;
  stablecoinsTotalValue: string;
  dexLiquidityTotalValue: string;
  lendingPositionsTotalValue: string;
  biggestLendingPositionValue: string;
  averagedLendingAPY: string;
  bastionPositions: BastionPosition[];
}

interface BastionPosition {
  name: string;
  value: string;
  apy: string;
}

export const useDataFeeds = create<useDataFeedsStore>((set) => ({
  totalValue: "-",
  stablecoinsTotalValue: "-",
  dexLiquidityTotalValue: "-",
  lendingPositionsTotalValue: "-",
  biggestLendingPositionValue: "-",
  averagedLendingAPY: "-",
  bastionPositions: [],
}));