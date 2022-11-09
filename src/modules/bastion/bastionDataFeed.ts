import Decimal from "decimal.js";
import { ethers } from "ethers";
import cToken from "../../contracts/cToken.json";
import erc20 from "../../contracts/erc20.json";
import { BastionPosition, useBastion } from "../../stores/useBastion";
import { useProvider } from "../../stores/useProvider";
import { useUserData } from "../../stores/useUserData";
import { requestPrice } from "../coingecko/requestTokenPrices";

type CTokensDetails = { [name: string]: CTokenDetails };

interface CTokenDetails {
  address: string;
  underlyingCoinGeckoId: string;
}

const cTokensDetails: CTokensDetails = {
  cWBTC: {
    address: "0xfa786baC375D8806185555149235AcDb182C033b",
    underlyingCoinGeckoId: "bitcoin",
  },
  cETH: {
    address: "0x4E8fE8fd314cFC09BDb0942c5adCC37431abDCD0",
    underlyingCoinGeckoId: "ethereum",
  },
  cNEAR: {
    address: "0x8C14ea853321028a7bb5E4FB0d0147F183d3B677",
    underlyingCoinGeckoId: "near",
  },
  cUSDC: {
    address: "0xe5308dc623101508952948b141fD9eaBd3337D99",
    underlyingCoinGeckoId: "usd-coin",
  },
  cUSDT: {
    address: "0x845E15A441CFC1871B7AC610b0E922019BaD9826",
    underlyingCoinGeckoId: "tether",
  },
  cBSTN: {
    address: "0x08Ac1236ae3982EC9463EfE10F0F320d9F5A9A4b",
    underlyingCoinGeckoId: "bastion-protocol",
  },
};

const createBastionDataFeed = () => {
  const tokenBalances: { [key: string]: string } = {};

  const provider = useProvider.getState().provider;

  const fetchCTokenBalance = async (
    address: string,
    tokenName: string
  ): Promise<string> => {
    const contract = new ethers.Contract(address, cToken.abi, provider);

    const result = await contract.balanceOf(useUserData.getState().address);

    const formatedResult = ethers.utils.formatUnits(result, 8);

    tokenBalances[tokenName] = result.toString();

    return formatedResult;
  };

  const fetchCtokenValue = async (
    tokenName: string,
    amount: string
  ): Promise<string> => {
    // Do not fetch prices for tokens that user do not hold
    if (amount === "0.0" || amount === undefined) return "0";

    // instantiate cToken contract
    const cTokenContract = new ethers.Contract(
      cTokensDetails[tokenName].address,
      cToken.abi,
      provider
    );
    const cTokenDecimals = 8;

    // get underlying decimals
    let underlyingDecimals;
    try {
      const underlyingAddress = await cTokenContract.underlying();
      const underlying = new ethers.Contract(
        underlyingAddress,
        erc20.abi,
        provider
      );

      underlyingDecimals = await underlying.decimals();
    } catch {
      underlyingDecimals = 18;
    }

    // get the last updated exchangeRate (not 100% accurate, but gas free)
    const exchangeRateStored = await cTokenContract.exchangeRateStored();

    const mantissa = 18 + parseInt(underlyingDecimals) - cTokenDecimals;
    const oneCTokenInUnderlying = new Decimal(
      exchangeRateStored.toString()
    ).div(new Decimal(10).pow(mantissa));

    // cToken value in underlying token
    const value = oneCTokenInUnderlying.mul(
      new Decimal(tokenBalances[tokenName])
    );

    // TODO: support fetching other values
    console.log(tokenName);
    console.log(cTokensDetails[tokenName]);

    const price = await requestPrice(
      cTokensDetails[tokenName].underlyingCoinGeckoId
    );
    const valueUSD = new Decimal(price)
      .mul(value.div(new Decimal(10).pow(cTokenDecimals)))
      .round()
      .toString();

    return valueUSD;
  };

  const fetchCTokenAPY = async () => {};

  const fetchCTokensBalances = async () => {};

  const fetchCTokensValues = async () => {
    const cTokensNames = Object.keys(cTokensDetails);
    let totalValue = new Decimal("0");
    const positions: BastionPosition[] = [];

    for (let i = 0; i < cTokensNames.length; i++) {
      const balance = await fetchCTokenBalance(
        cTokensDetails[cTokensNames[i]].address,
        cTokensNames[i]
      );
      console.log(`Balance of ${cTokensNames[i]} is ${balance}`);

      const usdValue = await fetchCtokenValue(cTokensNames[i], balance);

      console.log(`USD value of ${cTokensNames[i]} is ${usdValue}`);
      totalValue = totalValue.add(new Decimal(usdValue));

      positions.push({
        apy: "0",
        name: cTokensNames[i],
        value: usdValue,
      });
    }

    useBastion.setState({ totalValue: totalValue.toPrecision(5) });
    useBastion.setState({ positions });
  };

  const fetchData = async () => {
    await fetchCTokensBalances();
    await fetchCTokensValues();
  };

  return {
    fetchData,
  };
};

export const bastionDataFeed = createBastionDataFeed();
