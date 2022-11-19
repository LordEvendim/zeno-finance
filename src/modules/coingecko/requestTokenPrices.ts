import axios from "axios";
import Decimal from "decimal.js";
import { auroraScanDataFeed } from "../aurora-scan/auroraScan";

type Prices = Record<string, PricesDetails>;
type HistoricalPrices = Record<string, HistoricalPricesDetails>;

interface PricesDetails {
  price: string;
  requestTime: number;
}

interface HistoricalPricesDetails {
  price: string;
  blockNumber: number;
}

const prices: Prices = {};
const historicalPrices: HistoricalPrices = {};

export const requestPrices = async () => {
  const result = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Cusd-coin%2Cnear&vs_currencies=usd&precision=full"
  );

  console.log(result.data);

  Object.keys(result.data).forEach((name) => {
    prices[name] = result.data[name].usd;
  });
};

export const requestPrice = async (tokenName: string) => {
  try {
    // if the price was fetch less then 10 minutes ago return that catched price
    if (prices[tokenName] !== undefined) {
      if (Date.now() - prices[tokenName].requestTime < 1000 * 60 * 10) {
        return prices[tokenName].price;
      }
    }

    const result = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenName}&vs_currencies=usd&precision=full`
    );

    const price = result.data[tokenName].usd;
    console.log(price);

    if (!price) throw new Error("Cannot fetch asset price");

    prices[tokenName] = {
      price: result.data[tokenName].usd,
      requestTime: Date.now(),
    };

    return price;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const requestHistoricalPrice = async (
  tokenName: string,
  blockNumber: number
) => {
  try {
    // if the price was fetch less then 10 minutes ago return that catched price
    if (historicalPrices[tokenName] !== undefined) {
      if (blockNumber === historicalPrices[tokenName].blockNumber) {
        return historicalPrices[tokenName].price;
      }
    }

    // timestamp by block number
    const bpd = await auroraScanDataFeed.getBlocksPerDay();
    const cbn = await auroraScanDataFeed.getBlockNumberByTimestamp(
      Math.round(Date.now() / 1000)
    );

    const daysDiff = Math.floor((cbn - blockNumber) / bpd);

    console.log(daysDiff);

    const date = new Date(Date.now() - daysDiff * 24 * 60 * 60 * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    const dateFormatted = `${day}-${month}-${year}`;

    const result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${tokenName}/history?date=${dateFormatted}`
    );

    console.log(result);

    const price = result.data.market_data.current_price.usd;
    console.log(`${tokenName} at ${blockNumber}: $${price}`);

    if (!price) throw new Error("Cannot fetch asset price");

    historicalPrices[tokenName] = {
      price,
      blockNumber,
    };

    return price;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
