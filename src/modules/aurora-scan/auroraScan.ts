import axios from "axios";

export interface AuroraTransactionDetails {
  blockNumber: number;
  blockHash: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  input: string;
  methodId: string;
  functionName: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  txreceipt_status: string;
  gasUsed: string;
  confirmations: string;
  isError: string;
}

const createAuroraScanDataFeed = () => {
  const API_KEY = process.env.REACT_APP_AURORA_SCAN_API ?? "";
  // let averageBlocksPerDay: number | undefined = undefined;
  let averageBlocksPerDay = 71786;

  const getBlockNumberDayAgo = async (): Promise<number> => {
    const dayAgo = Math.round((Date.now() - 1000 * 60 * 60 * 24) / 1000);
    const result = await getBlockNumberByTimestamp(dayAgo);
    return result;
  };

  const getBlockNumberByTimestamp = async (
    timestamp: number
  ): Promise<number> => {
    try {
      const result = await axios.get(
        `https://api.aurorascan.dev/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${API_KEY}`
      );
      const blockNumberByTimestamp = result.data.result;
      console.log("blockNumberByTimestamp");
      console.log(blockNumberByTimestamp);

      if (!result.data) {
        throw new Error("Cannot fetch data from Aurorascan");
      }

      return result.data.result;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  };

  return {
    getBlockNumberDayAgo,
    getBlockNumberByTimestamp,
    getBalances: async (addreses: string[]) => {
      try {
        // get balances of tracked accounts
        const addressesFormated = addreses.join(",");

        const result = await axios.get(
          `https://api.aurorascan.dev/api?module=account&action=balancemulti&address=${addressesFormated}&tag=latest&apikey=${API_KEY}`
        );

        if (!result.data) {
          throw new Error("Cannot fetch tracked balances");
        }

        const balancesArray = result.data.result;
        console.log(balancesArray);

        return balancesArray;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getERC20Transfers: async (address: string, start = 0, end = 99999999) => {
      try {
        // get ERC20 transfers of an account
        const result = await axios.get(
          `https://api.aurorascan.dev/api?module=account&action=tokentx&address=${address}&startblock=${start}&endblock=${end}&sort=asc&apikey=${API_KEY}`
        );

        if (result.data.status === "0") {
          throw new Error("Cannot fetch ERC20 transactions");
        }

        console.log(result.data);
        return result.data.result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getNormalTransactions: async (
      address: string,
      start = 0,
      end = 99999999
    ) => {
      try {
        // get list of normal transactions
        const result = await axios.get(
          `https://api.aurorascan.dev/api?module=account&action=txlist&address=${address}&startblock=${start}&endblock=${end}&sort=asc&apikey=${API_KEY}`
        );
        console.log(result.data);

        if (result.data.status === "0") {
          throw new Error("Cannot fetch transactions");
        }

        return result.data.result as AuroraTransactionDetails[];
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getBlocksPerDay: async (): Promise<number> => {
      try {
        if (averageBlocksPerDay) return averageBlocksPerDay;

        const blocksNumberDayAgo = await getBlockNumberDayAgo();
        const currentBlockNumber = await getBlockNumberByTimestamp(
          Math.round(Date.now() / 1000)
        );

        console.log(blocksNumberDayAgo);
        console.log(currentBlockNumber);

        return currentBlockNumber - blocksNumberDayAgo;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  };
};

export const auroraScanDataFeed = createAuroraScanDataFeed();
