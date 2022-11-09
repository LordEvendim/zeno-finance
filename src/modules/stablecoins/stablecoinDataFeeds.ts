import { ethers } from "ethers";
import { useProvider } from "../../stores/useProvider";
import ERC20Contract from "../../contracts/erc20.json";
import { useUserData } from "../../stores/useUserData";
import { useStablecoinsPositions } from "../../stores/useStablecoinsPositions";

interface StablecoinDetails {
  name: string;
  symbol: string;
  coingeckoId: string;
  address: string;
  image: string;
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
      address: "",
      image: "",
    },
    {
      name: "USDC",
      symbol: "USDC",
      coingeckoId: "usd-coin",
      image: "",
      address: "",
    },
  ];

  return {
    getStablecoinData: async () => {
      const provider = getProvider();

      const pendingBalances: string[] = [];
      stablecoins.forEach((stablecoin) => {
        const contract = new ethers.Contract(
          stablecoin.address,
          ERC20Contract.abi,
          provider
        );
        pendingBalances.push(contract.balanceOf(getAddress()));
      });

      const resolvedBalances = await Promise.all(pendingBalances);

      const stablecoinPositions = stablecoins.map((coin, index) => ({
        price: "",
        value: resolvedBalances[index],
        ...coin,
      }));

      useStablecoinsPositions.setState({ stablecoinPositions });
    },
  };
};

export const stablecoinDataFeed = createStablecoinDataFeed();
