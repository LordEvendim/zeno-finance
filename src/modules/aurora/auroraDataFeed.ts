import { useProvider } from "../../stores/useProvider";

const createAuroraDataFeed = () => {
  return {
    getUserBalance: async (address: string): Promise<string> => {
      try {
        const provider = useProvider.getState().provider;

        if (!provider || !address) throw new Error("Login to you wallet");

        const result = await provider.getBalance(address);

        console.log(result);

        return result.toString();
      } catch (error: any) {
        console.log(error);
        throw error;
      }
    },
  };
};

export const auroraDataFeed = createAuroraDataFeed();
