import { createStandaloneToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import create from "zustand";
import { AuroraTransactionDetails } from "../modules/aurora-scan/auroraScan";

interface useNewsStore {
  trackedActivity: string;
  transactionValue: string;
  largestChange: string;
  activity: AuroraTransactionDetails[];
  trackedAddreses: TrackedAddress[];
  removeTrackedAddress: (address: string) => void;
  addAddress: (address: string) => void;
}

interface TrackedAddress {
  address: string;
}

const { toast } = createStandaloneToast();

export const useNews = create<useNewsStore>((set, get) => ({
  trackedActivity: "-",
  transactionValue: "-",
  largestChange: "-",
  activity: [],
  trackedAddreses: [],
  removeTrackedAddress: (address: string) => {
    const tracked = [...get().trackedAddreses].filter((a) => a.address !== address);
    return set({ trackedAddreses: tracked })
  },
  addAddress: (address: string) => {
    const isAddress = ethers.utils.isAddress(address);

    if (!isAddress) {
      return toast({ status: "error", description: "Invalid address", position: "top" });
    }

    if (get().trackedAddreses.length >= 10) {
      return toast({ status: "error", description: "Addreses limit reached", position: "top" })
    }

    // Remove duplicates
    get().removeTrackedAddress(address);

    return set({ trackedAddreses: [{ address }, ...get().trackedAddreses] })
  }
}));