import { BigNumberish, ethers } from "ethers";
import { useProvider } from "../../stores/useProvider";
import ERC20Contract from "../../contracts/erc20.json";
import { useUserData } from "../../stores/useUserData";
import { useStablecoinsPositions } from "../../stores/useStablecoinsPositions";
import USDCLogo from "../../assets/stables/usdc.svg";
import USDTLogo from "../../assets/stables/usdt.e.svg";
import FraxLogo from "../../assets/stables/frax.svg";
import DaiLogo from "../../assets/stables/dai.svg";
import { requestPrice } from "../coingecko/requestTokenPrices";
import Decimal from "decimal.js";

interface StablecoinDetails {
  name: string;
  symbol: string;
  coingeckoId: string;
  address: string;
  image: string;
  decimals: number;
}

const createStablecoinDataFeed = () => {
  const getProvider = () => {
    return useProvider.getState().provider;
  };
  const getAddress = () => {
    return useUserData.getState().address;
  };

  const stablecoins: StablecoinDetails[] = [
    {
      name: "USDT",
      symbol: "USDT",
      coingeckoId: "tether",
      image: USDTLogo,
      address: "0x4988a896b1227218e4a686fde5eabdcabd91571f",
      decimals: 6,
    },
    {
      name: "USDC",
      symbol: "USDC",
      coingeckoId: "usd-coin",
      image: USDCLogo,
      address: "0xb12bfca5a55806aaf64e99521918a4bf0fc40802",
      decimals: 6,
    },
    {
      name: "DAI",
      symbol: "DAI",
      coingeckoId: "dai",
      image: DaiLogo,
      address: "0xe3520349f477a5f6eb06107066048508498a291b",
      decimals: 18,
    },
    {
      name: "Frax",
      symbol: "FRAX",
      coingeckoId: "frax",
      image: FraxLogo,
      address: "0xda2585430fef327ad8ee44af8f1f989a2a91a3d2",
      decimals: 18,
    },
  ];

  return {
    getStablecoinData: async () => {
      const provider = getProvider();
      const address = getAddress();

      const pendingBalances: Promise<BigNumberish>[] = [];
      const pendingPrices: Promise<string>[] = [];

      stablecoins.forEach((stablecoin) => {
        const contract = new ethers.Contract(
          stablecoin.address,
          ERC20Contract.abi,
          provider
        );
        pendingBalances.push(contract.balanceOf(address));
        pendingPrices.push(requestPrice(stablecoin.coingeckoId));
      });

      const resolvedBalances = await Promise.all(pendingBalances);
      const resolvedPrices = await Promise.all(pendingPrices);

      let depegloss = new Decimal("0");
      let totalValue = new Decimal("0");

      const stablecoinPositions = stablecoins.map((coin, index) => {
        let resolvedPrice: Decimal = new Decimal(resolvedPrices[index]);
        console.log(resolvedBalances[index]);
        let balance: Decimal = new Decimal(resolvedBalances[index].toString());

        depegloss = depegloss.add(
          new Decimal("1")
            .sub(resolvedPrice)
            .mul(balance)
            .div(new Decimal(10).pow(coin.decimals))
        );
        totalValue = totalValue.add(
          resolvedPrice.mul(balance).div(new Decimal(10).pow(coin.decimals))
        );

        return {
          price: resolvedPrice.toDP(5).toString(),
          value: balance
            .div(new Decimal(10).pow(coin.decimals))
            .toDP(3)
            .toString(),
          ...coin,
        };
      });

      useStablecoinsPositions.setState({ stablecoinPositions });
      useStablecoinsPositions.setState({
        depegLoss: depegloss.toDP(3).toString(),
      });
      useStablecoinsPositions.setState({
        totalValue: totalValue.toDP(3).toString(),
      });
    },
  };
};

export const stablecoinDataFeed = createStablecoinDataFeed();
