import create from "zustand";
import { newsDataFeed } from "../modules/news/newsDataFeed";

interface useDataFeedsStore {
  totalValue: string;
  stablecoinsTotalValue: string;
  dexLiquidityTotalValue: string;
  lendingPositionsTotalValue: string;
  biggestLendingPositionValue: string;
  averagedLendingAPY: string;
  bastionPositions: BastionPosition[];
  fetchData: () => void;
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
  fetchData: async () => {
    try {
      await newsDataFeed.getNewsData();

    } catch (error: any) {
      console.log(error);
    }
  }
}));