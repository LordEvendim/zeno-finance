import Decimal from "decimal.js";
import { ethers } from "ethers";
import { useNews } from "../../stores/useNews";
import {
  auroraScanDataFeed,
  AuroraTransactionDetails,
} from "../aurora-scan/auroraScan";
import { requestPrice } from "../coingecko/requestTokenPrices";

const createNewsDataFeed = () => {
  const aurora = auroraScanDataFeed;

  const getTracked = () => {
    return useNews.getState().trackedAddreses;
  };

  return {
    getNewsData: async () => {
      try {
        // Total value
        let totalValue = new Decimal("0");

        const blockNumber = await aurora.getBlockNumberDayAgo();

        const tracked = getTracked();
        const trackedAddresses: string[] = [];

        tracked.forEach((trackedAddress) => {
          trackedAddresses.push(trackedAddress.address);
        });

        const transactionsPromises: Promise<AuroraTransactionDetails[]>[] = [];
        const allTxs: AuroraTransactionDetails[] = [];
        tracked.forEach((user) => {
          transactionsPromises.push(
            aurora.getNormalTransactions(user.address, blockNumber)
          );
        });

        const transactions = await Promise.all(transactionsPromises);

        transactions.forEach((userTransactions) => {
          userTransactions.forEach((transaction) => {
            console.log(transaction);

            const formatedAddress = ethers.utils.getAddress(transaction.from);

            if (trackedAddresses.includes(formatedAddress)) {
              totalValue = totalValue.add(transaction.value);
              allTxs.push(transaction);
            }
          });
        });

        allTxs.sort((a, b) =>
          new Decimal(a.transactionIndex).lt(b.transactionIndex) ? 1 : -1
        );

        // const formatedTotalValue = ethers.utils.formatEther(totalValue.toString())
        const formatedTotalValue = totalValue.div(new Decimal("10").pow("18"));

        // convert to USD
        const ethPrice = await requestPrice("ethereum");

        const formatedTotalValueUSD = formatedTotalValue
          .mul(ethPrice)
          .toPrecision(5);

        useNews.setState({ transactionValue: formatedTotalValueUSD });
        useNews.setState({ activity: allTxs });
        useNews.setState({ trackedActivity: allTxs.length.toString() });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  };
};

export const newsDataFeed = createNewsDataFeed();
