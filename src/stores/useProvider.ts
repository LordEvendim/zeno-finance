import { ethers } from "ethers";
import create from "zustand";

type SignerOrProvider = ethers.providers.Provider | ethers.Signer

interface ProviderStore {
  provider: SignerOrProvider;
  setProvider: (newProvider: SignerOrProvider) => void;
}

const target = "0xB6c0C00b3FdcAD0c3994257a7c668b8fEeeF467E";

export const useProvider = create<ProviderStore>((set) => ({
  // provider: new ethers.providers.Web3Provider(window.ethereum, "any"),
  provider: (new ethers.VoidSigner(target)).connect(
    new ethers.providers.JsonRpcProvider("https://mainnet.aurora.dev")
  ),
  setProvider: (newProvider: SignerOrProvider) =>
    set({ provider: newProvider }),
}));
