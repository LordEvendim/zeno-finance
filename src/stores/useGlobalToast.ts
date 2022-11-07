import { CreateToastFnReturn } from "@chakra-ui/react";
import create from "zustand";

interface useGlobalToastStore {
  toast: CreateToastFnReturn | undefined;
  setToast: (toast: CreateToastFnReturn) => void;
}

export const useGlobalToast = create<useGlobalToastStore>((set) => ({
  toast: undefined,
  setToast: (toast: CreateToastFnReturn) => {
    set({ toast })
  }
}));