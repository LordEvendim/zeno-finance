import { MAINNET_PREFIX } from "./explorer";

interface NetworkDetails {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export enum AvailableNetworks {
  LOCAL = "local",
  AURORA = "aurora",
  AURORA_TESTNET = "auroraTestnet",
}

export const currentNetwork: AvailableNetworks =
  process.env.NODE_ENV === "development"
    ? AvailableNetworks.AURORA
    : AvailableNetworks.AURORA;

export const networks: { [network in AvailableNetworks]: NetworkDetails } = {
  local: {
    chainId: `0x${Number(31337).toString(16)}`,
    chainName: "Localhost 8545",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["http://localhost:8545"],
    blockExplorerUrls: ["https://explorer.thetatoken.org"],
  },
  aurora: {
    chainId: `0x${Number(1313161554).toString(16)}`,
    chainName: "Aurora Mainnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.aurora.dev"],
    blockExplorerUrls: ["https://aurorascan.dev"],
  },
  auroraTestnet: {
    chainId: `0x${Number(1313161555).toString(16)}`,
    chainName: "Aurora Testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://testnet.aurora.dev/"],
    blockExplorerUrls: ["https://testnet.aurorascan.dev"],
  },
};
