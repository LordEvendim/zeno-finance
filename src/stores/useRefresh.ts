import create from "zustand";
import { bastionDataFeed } from "../modules/bastion/bastionDataFeed";
import { dexDataFeed } from "../modules/dex/dexDataFeeds";
import { stablecoinDataFeed } from "../modules/stablecoins/stablecoinDataFeeds";

interface RefreshStore {
  nextRefreshTime: number;
  isReady: () => boolean;
  refresh: () => void;
}

export const useRefresh = create<RefreshStore>((set, get) => ({
  nextRefreshTime: Date.now(),
  isReady: () => Date.now() > get().nextRefreshTime,
  refresh: () => {
    console.log("refreshing");

    console.log("Fetching bastion data feed");
    bastionDataFeed.fetchData();
    stablecoinDataFeed.getStablecoinData();
    dexDataFeed.getData();

    set({ nextRefreshTime: Date.now() + 1000 * 60 * 1 });
  },
}));
