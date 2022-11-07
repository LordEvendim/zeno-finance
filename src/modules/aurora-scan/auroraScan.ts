import axios from "axios"
import { useNews } from "../../stores/useNews";

export const auroraScanDataFeed = async () => {
  // get block number 24h ago
  const API_KEY = "";
  const dayAgo = Math.round((Date.now() - 1000 * 60 * 60 * 24) / 1000);

  const result = await axios.get(`https://api.aurorascan.dev/api?module=block&action=getblocknobytime&timestamp=${dayAgo}&closest=before&apikey=${API_KEY}`);
  const blockNumberDayAgo = result.data.result;
  console.log(blockNumberDayAgo);

  // get balances of tracked accounts
  const tracked = useNews.getState().trackedAddreses;
  const trackedFormated = tracked.join(",");

  const result2 = await axios.get(`https://api.aurorascan.dev/api?module=account&action=balancemulti&address=${trackedFormated}&tag=latest&apikey=${API_KEY}`);
  const balancesArray = result2.data.result;
  console.log(balancesArray);

  // get ERC20 transfers of an account
  const address = "";
  const result3 = await axios.get(`https://api.aurorascan.dev/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=2500000&sort=asc&apikey=${API_KEY}`);
  console.log(result3.data);

  // get list of normal transactions
  const result4 = await axios.get(`https://api.aurorascan.dev/api?module=account&action=txlist&address=${address}&startblock=1&endblock=99999999&sort=asc&apikey=${API_KEY}`);
  console.log(result4.data);

}