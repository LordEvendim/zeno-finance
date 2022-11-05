import { ethers } from "ethers";
import cToken from "../../contracts/cToken.json";
import erc20 from "../../contracts/erc20.json";

const target = "0xB6c0C00b3FdcAD0c3994257a7c668b8fEeeF467E";

const mockedSigner = new ethers.VoidSigner(target);
const mockedProvider = mockedSigner.connect(
  new ethers.providers.JsonRpcProvider("https://mainnet.aurora.dev")
);

export const createBastionDataFeed = () => {
  const cTokensAddresses: { [key: string]: string } = {
    cWBTC: "0xfa786baC375D8806185555149235AcDb182C033b",
    cETH: "0x4E8fE8fd314cFC09BDb0942c5adCC37431abDCD0",
    cNEAR: "0x8C14ea853321028a7bb5E4FB0d0147F183d3B677",
    cUSDC: "0xe5308dc623101508952948b141fD9eaBd3337D99",
    cUSDT: "0x845E15A441CFC1871B7AC610b0E922019BaD9826",
    cBSTN: "0x08Ac1236ae3982EC9463EfE10F0F320d9F5A9A4b",
  };
  const tokenBalances: { [key: string]: string } = {};
  const tokenValue: { [key: string]: string } = {};

  const fetchCTokenBalance = async (address: string, tokenName: string) => {
    const contract = new ethers.Contract(address, cToken.abi, mockedProvider);

    const result = await contract.balanceOf(target);

    const formatedResult = ethers.utils.formatUnits(result, 8);

    console.log(`${tokenName} balance : ${formatedResult}`);
    tokenBalances[tokenName] = result;

    return formatedResult;
  };

  const fetchCtokenValue = async (tokenName: string) => {
    const cTokenContract = new ethers.Contract(
      cTokensAddresses[tokenName],
      cToken.abi,
      mockedProvider
    );
    const cTokenDecimals = 8;

    let underlyingDecimals;
    try {
      const underlyingAddress = await cTokenContract.underlying();
      const underlying = new ethers.Contract(
        underlyingAddress,
        erc20.abi,
        mockedProvider
      );

      underlyingDecimals = await underlying.decimals();
    } catch {
      underlyingDecimals = 18;
    }

    const exchangeRateStored = await cTokenContract.exchangeRateStored();

    const mantissa = 18 + parseInt(underlyingDecimals) - cTokenDecimals;
    const oneCTokenInUnderlying = exchangeRateStored / Math.pow(10, mantissa);
    console.log(
      `1 ${tokenName} can be redeemed for ${oneCTokenInUnderlying} ${tokenName}`
    );
  };

  const fetchCtokensBalances = async () => {
    const balancesRequests: Array<Promise<any>> = [];
    Object.keys(cTokensAddresses).forEach((token: any) => {
      fetchCTokenBalance(cTokensAddresses[token] as any, token);
    });

    await Promise.all(balancesRequests);
  };

  const fetchCtokensValues = async () => {
    const pendingPromises: Array<Promise<any>> = [];
    Object.keys(cTokensAddresses).forEach((token: any) => {
      fetchCtokenValue(token);
    });

    await Promise.all(pendingPromises);
  };

  const fetchData = async () => {
    // await fetchCtokensBalances();
    // await fetchCtokensValues();
  };

  fetchData();

  return {};
};
