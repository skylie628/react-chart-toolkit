import { getCurrencyDetail } from "./api/getCurrencyDetail";
import { getHistoryPrice } from "./api/getHistoryPrice";
export const getCurrencyDetailQuery = ({ coinId }) => {
  return {
    queryKey: ["currencyDetail", coinId],
    queryFn: () => getCurrencyDetail({ coinId }),
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
    suspense: true,
    useErrorBoundary: true,
  };
};
export const getHistoryPriceQuery = ({ coinId }) => {
  return {
    queryKey: ["currencyPriceHistory", coinId],
    queryFn: () => getHistoryPrice({ coinId }),
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    keepPreviousData: true,
    staleTime: 10 * 60 * 1000,
    suspense: true,
    useErrorBoundary: true,
  };
};
