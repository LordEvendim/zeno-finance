import USDCLogo from "../assets/stables/usdc.svg";
import USDTLogo from "../assets/stables/usdt.e.svg";

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
};
