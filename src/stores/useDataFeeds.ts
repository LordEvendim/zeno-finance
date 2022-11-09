import create from "zustand";
import { newsDataFeed } from "../modules/news/newsDataFeed";

interface useDataFeedsStore {
  totalValue: string;
  stablecoinsTotalValue: string;
  dexLiquidityTotalValue: string;
  fetchData: () => void;
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
  },
}));
