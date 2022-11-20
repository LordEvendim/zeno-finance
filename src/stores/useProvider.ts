import { ethers } from "ethers";
import create from "zustand";
import { useUserData } from "./useUserData";

type SignerOrProvider = ethers.providers.Provider | ethers.Signer;

interface ProviderStore {
  provider: SignerOrProvider;
  setProvider: (newProvider: SignerOrProvider) => void;
}

export const useProvider = create<ProviderStore>((set) => ({
  // provider: new ethers.providers.Web3Provider(window.ethereum, "any"),
  provider: new ethers.VoidSigner(useUserData.getState().address).connect(
    new ethers.providers.JsonRpcProvider("https://mainnet.aurora.dev")
  ),
  setProvider: (newProvider: SignerOrProvider) =>
    set({ provider: newProvider }),
}));
