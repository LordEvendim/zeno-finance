import create from "zustand";
import { bastionDataFeed } from "../modules/bastion/bastionDataFeed";

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

    set({ nextRefreshTime: Date.now() + 1000 * 60 * 1 });
  },
}));
