import { createDexDataFeed } from "./createDexDataFeed";

const dexes = {
  Trisolaris: "0xblablabla",
};

const createDexFeeds = () => {
  const instantiatedDexes: any[] = [];

  Object.values(dexes).forEach((address) => {
    instantiatedDexes.push(createDexDataFeed(address));
  });

  return instantiatedDexes;
};

const dataFeeds = createDexFeeds();

export { dataFeeds };
