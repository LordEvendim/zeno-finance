import { ethers } from "ethers";
import { useProvider } from "../../stores/useProvider";

export const createDexDataFeed = (address: string) => {
  const provider = useProvider.getState().provider;

  const contractInstance = new ethers.Contract(address, "", provider);

  // function to fetch Mint events
  // function to fetch Burn events
  // function to calculate impernament loss

  return {
    getLockedLiquidityValue: async () => { },
    getImpernamentLossTotal: async () => { },
    getActivePoolsPositions: async () => { },
  };
};
