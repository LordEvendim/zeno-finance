import Decimal from "decimal.js";
import create from "zustand";
import { useBastion } from "./useBastion";
import { useDexDataFeed } from "./useDexDataFeed";
import { useStablecoinsPositions } from "./useStablecoinsPositions";

interface useDataFeedsStore {
  totalValue: string;
  averageAPY: string;
  calculateDashboardData: () => void;
}

export const useDataFeeds = create<useDataFeedsStore>((set) => ({
  totalValue: "-",
  averageAPY: "-",
  calculateDashboardData: () => {
    let _stablecoins = useStablecoinsPositions.getState().totalValue;
    let _lending = useBastion.getState().totalValue;
    let _dexliquidity = useDexDataFeed.getState().totalValue;

    if (_stablecoins === "-") _stablecoins = "0";
    if (_lending === "-") _lending = "0";
    if (_dexliquidity === "-") _dexliquidity = "0";

    const stablecoins = new Decimal(_stablecoins);
    const lending = new Decimal(_lending);
    const dexliquidity = new Decimal(_dexliquidity);

    // total value
    const totalValue = stablecoins.add(lending).add(dexliquidity);

    // average APY
    let _lendingAPY = useBastion.getState().averageAPY;
    let _dexAPY = useDexDataFeed.getState().averageApy;

    if (_lendingAPY === "-") _lendingAPY = "0";
    if (_dexAPY === "0") _dexAPY = "0";

    const lendingAPY = new Decimal(_lendingAPY);
    const dexAPY = new Decimal(_dexAPY);

    const averageAPY = lendingAPY
      .mul(lending)
      .add(dexAPY.mul(dexliquidity))
      .div(lending.add(dexliquidity));

    // biggest position

    set({
      totalValue: totalValue.toDP(3).toString(),
      averageAPY: averageAPY.toDP(3).toString(),
    });
  },
}));
