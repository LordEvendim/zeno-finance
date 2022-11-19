import { BigNumber, Contract, ethers } from "ethers";
import { useProvider } from "../../stores/useProvider";
import V2CorePair from "../../contracts/WannaSwapPair.json";
import Decimal from "decimal.js";
import { TokenDetails, tokens } from "../../constants/tokens";
import { useUserData } from "../../stores/useUserData";
import {
  requestHistoricalPrice,
  requestPrice,
} from "../coingecko/requestTokenPrices";

interface PairInfo {
  token0: TokenDetails;
  token1: TokenDetails;
  address: string;
}

const dexes: Record<string, Array<PairInfo>> = {
  trisolaris: [
    {
      address: "0x2fe064B6c7D274082aa5d2624709bC9AE7D16C77",
      token0: tokens.USDT,
      token1: tokens.USDC,
    },
  ],
};

const createDexDataFeed = (pairs: PairInfo[]) => {
  const provider = useProvider.getState().provider;
  const address = useUserData.getState().address;
  const pairContracts: Record<string, Contract> = {};

  const getPairContract = (address: string) => {
    if (pairContracts[address]) {
      return pairContracts[address];
    }

    const contract = new ethers.Contract(address, V2CorePair.abi, provider);

    pairContracts[address] = contract;

    return contract;
  };

  const calculateImpernamentLoss = (ratioDifference: string) => {
    const TWO = new Decimal("2");
    const ONE = new Decimal("1");
    const k = new Decimal(ratioDifference);

    return TWO.mul(k.sqrt()).div(ONE.add(k)).sub(ONE);
  };

  const getPosition = async (
    pair: string,
    token0: TokenDetails,
    token1: TokenDetails
  ) => {
    const contract = getPairContract(pair);

    const userMintsFilter = contract.filters.Transfer(
      ethers.constants.AddressZero,
      address,
      null
    );
    const userBurnFilter = contract.filters.Transfer(
      address,
      ethers.constants.AddressZero,
      null
    );

    const mintEvents = await contract.queryFilter(userMintsFilter);
    console.log(mintEvents);

    if (mintEvents.length === 0) {
      return null;
    }

    const burnEvents = await contract.queryFilter(userBurnFilter);
    console.log(burnEvents);

    // get the index of the latest MINT
    const latestMint = mintEvents[mintEvents.length - 1];
    const amount = latestMint.args?.value.toString();

    // Users was providing liquidity in the past, but closed a position
    if (
      burnEvents.length > 0 &&
      latestMint.logIndex > burnEvents[mintEvents.length - 1].logIndex
    ) {
      return null;
    }

    console.log(latestMint);

    // User is still a LP
    const providingStart = latestMint.blockNumber;
    console.log("Providing start");
    console.log(providingStart);

    // get reserves ratio
    const syncEvent = contract.filters.Sync();
    const syncEvents = await contract.queryFilter(
      syncEvent,
      providingStart,
      providingStart
    );

    console.log("Sync events");
    console.log(syncEvents);
    const reserve0 = syncEvents[0].args?.reserve0.toString();
    const reserve1 = syncEvents[0].args?.reserve1.toString();

    const startRatio = new Decimal(reserve0).div(new Decimal(reserve1));

    const currentReserves = await contract.getReserves();

    const startReserve0 = new Decimal(reserve0);
    const startReserve1 = new Decimal(reserve1);
    const endReserve0 = new Decimal(currentReserves._reserve0.toString());
    const endReserve1 = new Decimal(currentReserves._reserve1.toString());

    const endRatio = endReserve0.div(endReserve1);

    const reserveDif = endRatio.sub(startRatio).abs();

    console.log("Ratio dif");
    console.log(reserveDif.toString());

    const ONE = new Decimal("1");
    const endPrice0 = new Decimal(
      await requestPrice(token0.coingeckoId)
    ).toString();
    const endPrice1 = new Decimal(
      await requestPrice(token1.coingeckoId)
    ).toString();
    const startPrice0 = new Decimal(
      (
        await requestHistoricalPrice(token0.coingeckoId, latestMint.blockNumber)
      ).toString()
    );
    const startPrice1 = new Decimal(
      (
        await requestHistoricalPrice(token1.coingeckoId, latestMint.blockNumber)
      ).toString()
    );

    // const IL = 1 - (endReserve0 * endPrice0 + endReserve1 * endPrice1) / (reserve0 * startPrice0 + reserve1 * startPrice1)
    const IL = ONE.sub(
      endReserve0
        .mul(endPrice0)
        .add(endReserve1.mul(endPrice1))
        .div(startReserve0.mul(startPrice0).add(startReserve1.mul(startPrice1)))
    );

    let LPTokensBalance = latestMint.args?.value.toString();

    if (!LPTokensBalance) return null;

    LPTokensBalance = new Decimal(LPTokensBalance);

    const positionValue =
      LPTokensBalance.mul(startReserve0)
        .div(new Decimal("10").pow(token0.decimals))
        .mul(startPrice0) +
      LPTokensBalance.mul(startReserve1)
        .div(new Decimal("10").pow(token1.decimals))
        .mul(startPrice1);

    const startValue = startReserve0.div(
      new Decimal("10").pow(token0.decimals)
    );
    console.log(startValue.toString());

    console.log("Position value:");
    console.log(positionValue.toString());
    console.log(IL.toString());

    return {
      reserve0,
      reserve1,
      blockNumber: providingStart,
      amount,
    };
  };

  const getData = async () => {
    console.log("Getting dex data");

    const position = await getPosition(
      pairs[0].address,
      pairs[0].token0,
      pairs[0].token1
    );
  };

  return {
    getData,
  };
};

export const dexDataFeed = createDexDataFeed(dexes.trisolaris);
