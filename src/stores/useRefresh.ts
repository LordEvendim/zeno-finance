import create from "zustand";
import { persist } from "zustand/middleware";
import { bastionDataFeed } from "../modules/bastion/bastionDataFeed";
import { dexDataFeed } from "../modules/dex/dexDataFeeds";
import { newsDataFeed } from "../modules/news/newsDataFeed";
import { stablecoinDataFeed } from "../modules/stablecoins/stablecoinDataFeeds";
import { useDataFeeds } from "./useDataFeeds";

interface RefreshStore {
  nextRefreshTime: number;
  isReady: () => boolean;
  refresh: () => Promise<void>;
}

export const useRefresh = create(
  persist<RefreshStore>(
    (set, get) => ({
      nextRefreshTime: Date.now(),
      isReady: () => Date.now() > get().nextRefreshTime,
      refresh: async () => {
        console.log("refreshing");

        const bastion = bastionDataFeed.fetchData();
        const stable = stablecoinDataFeed.getStablecoinData();
        const dex = dexDataFeed.getData();
        const news = newsDataFeed.getNewsData();

        await Promise.allSettled([bastion, stable, dex]);

        useDataFeeds.getState().calculateDashboardData();

        set({ nextRefreshTime: Date.now() + 1000 * 60 * 10 });
      },
    }),
    {
      name: "refresh-storage",
      getStorage: () => localStorage,
    }
  )
);
