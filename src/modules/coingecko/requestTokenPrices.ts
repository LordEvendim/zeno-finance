import axios from "axios";

type Prices = { [key: string]: string };

const prices: Prices = {};

// const coinsList = ["bitcoin", "ethereum", "tether", "usd-coin", "near"]

export const requestPrices = async () => {
  const result = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether%2Cusd-coin%2Cnear&vs_currencies=usd&precision=full"
  );

  console.log(result.data);

  Object.keys(result.data).forEach(name => {
    prices[name] = result.data[name].usd;
  });
};

export const getPrice = (token: string) => {
  return prices[token];
};
