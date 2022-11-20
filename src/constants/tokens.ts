import USDCLogo from "../assets/stables/usdc.svg";
import USDTLogo from "../assets/stables/usdt.e.svg";
import NearLogo from "../assets/logos/near.png";
import WBTCLogo from "../assets/logos/wbtc.png";
import WETHLogo from "../assets/logos/weth.png";

export interface TokenDetails {
  address: string;
  symbol: string;
  image: string;
  coingeckoId: string;
  decimals: string;
}

enum SupportedTokens {
  USDT,
  USDC,
  NEAR,
  WBTC,
  WETH,
}

export const tokens: Record<keyof typeof SupportedTokens, TokenDetails> = {
  USDT: {
    address: "0x4988a896b1227218e4A686fdE5EabdcAbd91571f",
    image: USDTLogo,
    symbol: "USDT",
    coingeckoId: "tether",
    decimals: "6",
  },
  USDC: {
    address: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
    image: USDCLogo,
    symbol: "USDC",
    coingeckoId: "usd-coin",
    decimals: "6",
  },
  NEAR: {
    address: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
    image: NearLogo,
    symbol: "NEAR",
    coingeckoId: "near",
    decimals: "24",
  },
  WBTC: {
    address: "0xF4eB217Ba2454613b15dBdea6e5f22276410e89e",
    image: WBTCLogo,
    symbol: "WBTC",
    coingeckoId: "bitcoin",
    decimals: "8",
  },
  WETH: {
    address: "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB",
    image: WETHLogo,
    symbol: "WETH",
    coingeckoId: "ethereum",
    decimals: "18",
  },
};
