import create from "zustand";

interface RefreshStore {
  nextRefreshTime: number;
  isReady: () => boolean;
  refresh: () => void;
}

export const useRefresh = create<RefreshStore>((set, get) => ({
  nextRefreshTime: 0,
  isReady: () => (Date.now() > get().nextRefreshTime),
  refresh: () => set({ nextRefreshTime: Date.now() + 1000 * 60 * 15 })
}));
