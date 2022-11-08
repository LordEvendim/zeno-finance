import { useProvider } from "../../stores/useProvider";
import { useUserData } from "../../stores/useUserData";

const createAuroraDataFeed = () => {
  return {
    getUserBalance: async (): Promise<string> => {
      try {
        const provider = useProvider.getState().provider;
        const address = useUserData.getState().address;

        if (!provider || !address) throw new Error("Login to you wallet");

        const result = await provider.getBalance(address);

        console.log(result);

        return result.toString();
      } catch (error: any) {
        console.log(error);
        throw error;
      }
    }
  }
}

export const auroraDataFeed = createAuroraDataFeed();