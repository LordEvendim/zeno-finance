import Decimal from "decimal.js";
import { ethers } from "ethers";
import { useNews } from "../../stores/useNews";
import { auroraScanDataFeed, AuroraTransactionDetails } from "../aurora-scan/auroraScan";

const createNewsDataFeed = () => {
  const aurora = auroraScanDataFeed;

  const getTracked = () => {
    return useNews.getState().trackedAddreses;
  }

  return {
    getNewsData: async () => {
      try {
        // Total value
        let totalValue = new Decimal("0");

        const blockNumber = await aurora.getBlockNumberDayAgo();

        const tracked = getTracked();

        const transactionsPromises: Promise<AuroraTransactionDetails[]>[] = [];
        const allTxs: AuroraTransactionDetails[] = [];
        tracked.forEach(user => {
          transactionsPromises.push(aurora.getNormalTransactions(user.address, blockNumber));
        });

        const transactions = await Promise.all(transactionsPromises);

        transactions.forEach(userTransactions => {
          userTransactions.forEach(transaction => {
            totalValue = totalValue.add(transaction.value);
            allTxs.push(transaction);
          })
        });

        allTxs.sort((a, b) => (new Decimal(a.transactionIndex).lt(b.transactionIndex) ? 1 : -1));

        const formatedTotalValue = ethers.utils.formatEther(totalValue.toString())

        console.log("formatedTotalValue");
        console.log(formatedTotalValue);

        useNews.setState({ transactionValue: formatedTotalValue })
        useNews.setState({ activity: allTxs })


      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }
}

export const newsDataFeed = createNewsDataFeed();



