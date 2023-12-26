import getSummary from "./getSummary";
// mapping trending coin object format of Coingecko to CoiPort
const mapper = {
  trendingCoins: (coins) =>
    coins.map((coin) => ({
      id: coin.item.id,
      name: coin.item.name,
      src: coin.item.large,
      symbol: coin.item.symbol,
      label: getSummary(
        coin.item?.data?.content?.description || coin.item.name,
        2
      ),
      data: {
        coin_id: coin.item.coin_id,
        sparkline: coin.item?.data?.sparkline,
        eco: "Ecosystem",
      },
    })),
  trendingCategories: (categories) =>
    categories.map((category) => ({
      id: category.id,
      name: category.name,
      data: {
        sparkline: category.data.sparkline,
        market_cap_1h_change: category.market_cap_1h_change
          .toString()
          .slice(0, 10),
      },
    })),
};

export default mapper;
