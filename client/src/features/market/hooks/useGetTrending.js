import { useQuery } from "@tanstack/react-query";
import { getSearchTrendingQuery } from "../queries";

const useGetTrending = () => {
  const { data, error, isFetching } = useQuery({
    ...getSearchTrendingQuery(),
  });
  console.log("hookdata", data);
  return {
    trendingCoins: data.coins,
    trendingCategories: data.categories,
    error,
    isLoading: isFetching,
  };
};

export { useGetTrending };
