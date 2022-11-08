import Decimal from "decimal.js";
import { ethers } from "ethers";
import cToken from "../../contracts/cToken.json";
import erc20 from "../../contracts/erc20.json";
import { useProvider } from "../../stores/useProvider";
import { useUserData } from "../../stores/useUserData";
import { getPrice } from "../coingecko/requestTokenPrices";

const createBastionDataFeed = () => {
  const cTokensAddresses: { [key: string]: string } = {
    cWBTC: "0xfa786baC375D8806185555149235AcDb182C033b",
    cETH: "0x4E8fE8fd314cFC09BDb0942c5adCC37431abDCD0",
    cNEAR: "0x8C14ea853321028a7bb5E4FB0d0147F183d3B677",
    cUSDC: "0xe5308dc623101508952948b141fD9eaBd3337D99",
    cUSDT: "0x845E15A441CFC1871B7AC610b0E922019BaD9826",
    cBSTN: "0x08Ac1236ae3982EC9463EfE10F0F320d9F5A9A4b",
  };
  const tokenBalances: { [key: string]: string } = {};
  const tokenValues: { [key: string]: string } = {};
  let totalValue = "";

  const provider = useProvider.getState().provider;

  const fetchCTokenBalance = async (address: string, tokenName: string) => {
    const contract = new ethers.Contract(address, cToken.abi, provider);

    const result = await contract.balanceOf(useUserData.getState().address);

    const formatedResult = ethers.utils.formatUnits(result, 8);

    console.log(`${tokenName} balance : ${result}`);
    tokenBalances[tokenName] = result.toString();

    return formatedResult;
  };

  const fetchCtokenValue = async (tokenName: string): Promise<string> => {
    // Do not fetch prices for tokens that user do not hold
    if (
      tokenBalances[tokenName] === undefined ||
      tokenBalances[tokenName] === "0"
    )
      return "0";

    // instantiate cToken contract
    const cTokenContract = new ethers.Contract(
      cTokensAddresses[tokenName],
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

    // 
    const valueUSD = new Decimal(getPrice("btc"))
      .mul(value.div(new Decimal(10).pow(cTokenDecimals)))
      .round()
      .toString();

    console.log(`${tokenName} is worth ${valueUSD} USD`);

    tokenValues[tokenName] = valueUSD;

    return valueUSD;
  };

  const fetchCtokensBalances = async () => {
    const pendingPromises: Array<Promise<any>> = [];
    Object.keys(cTokensAddresses).forEach((token: any) => {
      pendingPromises.push(
        fetchCTokenBalance(cTokensAddresses[token] as any, token)
      );
    });

    await Promise.all(pendingPromises);
  };

  const fetchCtokensValues = async () => {
    const pendingPromises: Array<Promise<any>> = [];
    Object.keys(cTokensAddresses).forEach((token: any) => {
      pendingPromises.push(fetchCtokenValue(token));
    });

    const values = await Promise.all(pendingPromises);

    let total = new Decimal("0");
    values.forEach(value => {
      total = total.add(value);
    });

    totalValue = total.toString();

    console.log(`Total toknes value: ${totalValue} USD`);
  };

  const fetchData = async () => {
    await fetchCtokensBalances();
    await fetchCtokensValues();

    return {
      tokenBalances,
      tokenValues
    }
  };

  return {
    fetchData,
  };
};

export const bastionDataFeed = createBastionDataFeed();
