import { ethers } from "ethers";
import { useProvider } from "../../stores/useProvider";
import V2CorePair from "../../contracts/WannaSwapPair.json";

export const createDexDataFeed = (address: string) => {
  const provider = useProvider.getState().provider;

  // TODO: Implement Trisolaris pools interactions

  const contractInstance = new ethers.Contract(
    address,
    V2CorePair.abi,
    provider
  );

  // each pools gives back LP tokens for providing liquidity
  // we can calculate impernament loss based on reserve raio changes
  // also estimate how much funds user can withdraw keeping in mind that 1LP token will receive 50/50 pool ratio
  // get the current price of the tokens and estimate IP loss

  // get pools based on emitted Events (Mint and filter by Burn);
  const getPositions = async () => {};

  // find a formula for calculating average APY for uniswap-v2
  const calculateAverageApy = async (
    generatedFees: string,
    userPercentageHoldings: string
  ) => {};

  // get reserves when user deposited funds based on emitted events and compare it with current reserves
  // using simple formula calculate impernament loss based on that data
  // Do not calculate exited positions
  const calculateImpremanentLoss = async (
    balance: string,
    startPriceRatio: string,
    endPriceRatio: string
  ) => {};

  // function to fetch Mint events
  // function to fetch Burn events
  // function to calculate impernament loss

  return {
    getLockedLiquidityValue: async () => {},
    getImpernamentLossTotal: async () => {},
    getActivePoolsPositions: async () => {},
  };
};
