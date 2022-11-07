import { createStandaloneToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import create from "zustand";
import { useGlobalToast } from "./useGlobalToast";

interface useNewsStore {
  trackedActivity: string;
  transactionValue: string;
  largestChange: string;
  activity: Activity[];
  trackedAddreses: TrackedAddress[];
  removeTrackedAddress: (address: string) => void;
  addAddress: (address: string) => void;
}

interface Activity {
  address: string;
  transactionValue: string;
  action: string;
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

    // Remove duplicates
    get().removeTrackedAddress(address);

    return set({ trackedAddreses: [{ address }, ...get().trackedAddreses] })
  }
}));