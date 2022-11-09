import axios from "axios";

type Prices = { [key: string]: PricesDetails };

interface PricesDetails {
  price: string;
  requestTime: number;
}

const prices: Prices = {};

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
    if (prices[tokenName].price !== undefined) {
      if (Date.now() - prices[tokenName].requestTime < 1000 * 60 * 10) {
        return prices[tokenName].price;
      }
    }

    const result = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenName}&precision=full`
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
