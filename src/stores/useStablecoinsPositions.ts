import create from "zustand";

interface useStablecoinsPositionsStore {
  totalValue: string;
  depegLoss: string;
  currentInflationRate: string;
  stablecoinPositions: StablecoinPosition[]
}

interface StablecoinPosition {
  name: string;
  address: string;
  symbol: string;
  image: string;
  value: string;
  price: string;
}

export const useStablecoinsPositions = create<useStablecoinsPositionsStore>((set) => ({
  totalValue: "-",
  depegLoss: "-",
  currentInflationRate: "-",
  stablecoinPositions: [],
}));