import create from "zustand";

export interface DexPositionDetails {
  name: string;
  depositDate: string;
  initialValue: string;
  impernamentLoss: string;
  impernamentLossP: string;
  profit: string;
  apy: string;
  value: string;
}

interface useDexDataFeedStore {
  positions: DexPositionDetails[];
  positionsWanna: DexPositionDetails[];
  totalValue: string;
  averageApy: string;
  impernamentLoss: string;
  impernamentLossP: string;
}

export const useDexDataFeed = create<useDexDataFeedStore>((set) => ({
  positions: [],
  positionsWanna: [],
  totalValue: "-",
  averageApy: "-",
  impernamentLoss: "-",
  impernamentLossP: "-",
}));
