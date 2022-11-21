import { Contract, ethers } from "ethers";
import { useProvider } from "../../stores/useProvider";
import V2CorePair from "../../contracts/WannaSwapPair.json";
import Decimal from "decimal.js";
import { TokenDetails, tokens } from "../../constants/tokens";
import { useUserData } from "../../stores/useUserData";
import {
  requestHistoricalPrice,
  requestPrice,
} from "../coingecko/requestTokenPrices";
import ERC20 from "../../contracts/erc20.json";
import {
  DexPositionDetails,
  useDexDataFeed,
} from "../../stores/useDexDataFeed";
import { auroraScanDataFeed } from "../aurora-scan/auroraScan";

interface PairInfo {
  token0: TokenDetails;
  token1: TokenDetails;
  address: string;
}

enum SupportedDexes {
  TRISOLARIS,
  WANNASWAP,
}

type PoolsByDexList = Record<keyof typeof SupportedDexes, Array<PairInfo>>;

const dexes: PoolsByDexList = {
  TRISOLARIS: [
    {
      address: "0x2fe064B6c7D274082aa5d2624709bC9AE7D16C77",
      token0: tokens.USDT,
      token1: tokens.USDC,
    },
    {
      address: "0x03B666f3488a7992b2385B12dF7f35156d7b29cD",
      token0: tokens.NEAR,
      token1: tokens.USDT,
    },
    {
      address: "0x20F8AeFB5697B77E0BB835A8518BE70775cdA1b0",
      token0: tokens.NEAR,
      token1: tokens.USDC,
    },
    {
      address: "0x63da4DB6Ef4e7C62168aB03982399F9588fCd198",
      token0: tokens.WETH,
      token1: tokens.NEAR,
    },
  ],
  WANNASWAP: [
    {
      address: "0x3502eaC6Fa27bEebDC5cd3615B7CB0784B0Ce48f",
      token0: tokens.USDT,
      token1: tokens.USDC,
    },
  ],
};

const createDexDataFeed = (dexes: PoolsByDexList) => {
  const provider = useProvider.getState().provider;
  const getAddress = () => {
    return useUserData.getState().address;
  };
  const pairContracts: Record<string, Contract> = {};

  const getPairContract = (address: string) => {
    if (pairContracts[address]) {
      return pairContracts[address];
    }

    const contract = new ethers.Contract(address, V2CorePair.abi, provider);

    pairContracts[address] = contract;

    return contract;
  };

  const getInitialDeposits = async (
    pairAddress: string,
    token0Address: string,
    token1Address: string,
    block: number
  ) => {
    const token0 = new ethers.Contract(token0Address, ERC20.abi, provider);
    const token1 = new ethers.Contract(token1Address, ERC20.abi, provider);

    const t0Depo = token0.filters.Transfer(getAddress(), pairAddress);

    const t1Depo = token1.filters.Transfer(getAddress(), pairAddress);

    const t0Events = await token0.queryFilter(t0Depo, block, block);
    const t1Events = await token1.queryFilter(t1Depo, block, block);

    return [
      t0Events[0].args?.value.toString(),
      t1Events[0].args?.value.toString(),
    ];
  };

  const getEmptyPositionData = async (
    token0: TokenDetails,
    token1: TokenDetails
  ) => ({
    name: `${token0.symbol}/${token1.symbol}`,
    apy: "-",
    profit: "-",
    depositDate: "-",
    impernamentLoss: "-",
    impernamentLossP: "-",
    initialValue: "-",
    value: "-",
  });

  const getPosition = async (
    pair: string,
    token0: TokenDetails,
    token1: TokenDetails
  ): Promise<DexPositionDetails> => {
    const contract = getPairContract(pair);
    const totalSupply = new Decimal((await contract.totalSupply()).toString());

    const userMintsFilter = contract.filters.Transfer(
      ethers.constants.AddressZero,
      getAddress(),
      null
    );
    const userBurnFilter = contract.filters.Transfer(
      getAddress(),
      ethers.constants.AddressZero,
      null
    );

    const mintEvents = await contract.queryFilter(userMintsFilter);

    if (mintEvents.length === 0) {
      return getEmptyPositionData(token0, token1);
    }

    const burnEvents = await contract.queryFilter(userBurnFilter);

    // get the index of the latest MINT
    const latestMint = mintEvents[mintEvents.length - 1];

    // Users was providing liquidity in the past, but closed a position
    if (
      burnEvents.length > 0 &&
      latestMint.logIndex > burnEvents[mintEvents.length - 1].logIndex
    ) {
      return getEmptyPositionData(token0, token1);
    }

    // User is still a LP
    const providingStart = latestMint.blockNumber;

    // get reserves ratio
    const syncEvent = contract.filters.Sync();
    const syncEvents = await contract.queryFilter(
      syncEvent,
      providingStart,
      providingStart
    );

    const reserve0 = syncEvents[0].args?.reserve0.toString();
    const reserve1 = syncEvents[0].args?.reserve1.toString();

    const currentReserves = await contract.getReserves();

    const startReserve0 = new Decimal(reserve0);
    const startReserve1 = new Decimal(reserve1);
    const endReserve0 = new Decimal(currentReserves._reserve0.toString());
    const endReserve1 = new Decimal(currentReserves._reserve1.toString());

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

    const decimalsToken0 = new Decimal("10").pow(token0.decimals);
    const decimalsToken1 = new Decimal("10").pow(token1.decimals);

    // const IL = 1 - (endReserve0 * endPrice0 + endReserve1 * endPrice1) / (reserve0 * startPrice0 + reserve1 * startPrice1)
    const IL = endReserve0
      .div(decimalsToken0)
      .mul(endPrice0)
      .add(endReserve1.div(decimalsToken1).mul(endPrice1))
      .div(
        startReserve0
          .div(decimalsToken0)
          .mul(startPrice0)
          .add(startReserve1.div(decimalsToken1).mul(startPrice1))
      );

    // Get LP Token balance
    let LPTokensBalance = latestMint.args?.value.toString();
    if (!LPTokensBalance) return getEmptyPositionData(token0, token1);

    LPTokensBalance = new Decimal(LPTokensBalance);

    // Calculate current position value
    const poolShare = LPTokensBalance.div(totalSupply);

    let [token0Deposit, token1Deposit] = await getInitialDeposits(
      pair,
      token0.address,
      token1.address,
      latestMint.blockNumber
    );

    token0Deposit = new Decimal(token0Deposit);
    token1Deposit = new Decimal(token1Deposit);

    const initialPositionValue = token0Deposit
      .div(new Decimal("10").pow(token0.decimals))
      .mul(startPrice0)
      .add(
        token1Deposit
          .div(new Decimal("10").pow(token1.decimals))
          .mul(startPrice1)
      );

    const currentValue = poolShare
      .mul(endReserve0)
      .div(new Decimal("10").pow(token0.decimals))
      .mul(endPrice0)
      .add(
        poolShare
          .mul(endReserve1)
          .div(new Decimal("10").pow(token1.decimals))
          .mul(endPrice0)
      );

    console.log(initialPositionValue.toString());
    console.log("Loss due to IL:", initialPositionValue.mul(IL).toString());

    const ILlossValue = initialPositionValue.mul(IL);

    // APY =  profit / lockedDays * 365 / startValue
    const profit = currentValue.sub(initialPositionValue);
    const DAY = 1000 * 60 * 60 * 24;
    const stakingStartData = await auroraScanDataFeed.getTimestampByBlockNumber(
      providingStart
    );
    console.log(stakingStartData.toLocaleString());

    const stakedDays = Math.round(
      (Date.now() - stakingStartData.getTime()) / DAY
    );
    console.log("Staked days: ", stakedDays);

    const apyP = profit
      .div(stakedDays)
      .mul("365")
      .div(initialPositionValue)
      .mul("100");

    return {
      name: `${token0.symbol}/${token1.symbol}`,
      apy: apyP.toDP(5).toString(),
      profit: profit.toDP(3).toString(),
      depositDate: stakingStartData.toLocaleDateString(),
      impernamentLoss: ILlossValue.toDP(3).toString(),
      impernamentLossP: IL.mul(100).toDP(3).toString(),
      initialValue: initialPositionValue.toDP(3).toString(),
      value: currentValue.toDP(3).toString(),
    };
  };

  const getData = async () => {
    console.log(getAddress());

    try {
      const positionsTrisolaris: Array<Promise<DexPositionDetails>> = [];
      const positionsWannaswap: Array<Promise<DexPositionDetails>> = [];

      dexes.TRISOLARIS.forEach((pair) => {
        positionsTrisolaris.push(
          getPosition(pair.address, pair.token0, pair.token1)
        );
      });
      dexes.WANNASWAP.forEach((pair) => {
        positionsWannaswap.push(
          getPosition(pair.address, pair.token0, pair.token1)
        );
      });

      const resolvedTriPositions = await Promise.all(positionsTrisolaris);
      const resolvedWannaPositions = await Promise.all(positionsWannaswap);

      let totalValue = new Decimal("0");
      let averageApy = new Decimal("0");
      let impernamentLoss = new Decimal("0");
      let impernamentLossValue = new Decimal("0");

      resolvedTriPositions.forEach((position) => {
        if (position.value === "-") return;

        totalValue = totalValue.add(new Decimal(position.value));
        impernamentLossValue = impernamentLossValue.add(
          new Decimal(position.impernamentLoss)
        );
        averageApy = averageApy.add(
          new Decimal(position.apy).mul(position.value)
        );
        impernamentLoss = impernamentLoss.add(
          new Decimal(position.impernamentLossP).mul(position.value)
        );
      });

      resolvedWannaPositions.forEach((position) => {
        if (position.value === "-") return;

        totalValue = totalValue.add(new Decimal(position.value));
        impernamentLossValue = impernamentLossValue.add(
          new Decimal(position.impernamentLoss)
        );
        averageApy = averageApy.add(
          new Decimal(position.apy).mul(position.value)
        );
        impernamentLoss = impernamentLoss.add(
          new Decimal(position.impernamentLossP).mul(position.value)
        );
      });

      averageApy = totalValue.eq("0")
        ? new Decimal("0")
        : averageApy.div(totalValue).toDP(3);
      impernamentLoss = impernamentLoss.div(totalValue).toDP(3);

      useDexDataFeed.setState({
        positions: resolvedTriPositions,
        positionsWanna: resolvedWannaPositions,
        averageApy: averageApy.toString(),
        impernamentLossP: impernamentLoss.toString(),
        impernamentLoss: impernamentLossValue.toDP(3).toString(),
        totalValue: totalValue.toDP(3).toString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getData,
  };
};

export const dexDataFeed = createDexDataFeed(dexes);
