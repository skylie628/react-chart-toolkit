import { Flex, Text, VStack } from "@chakra-ui/react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Price from "@/components/ui/Price";
import Trend from "@/components/ui/Trend";
//hooks
import { useGetHistoryPrice } from "@/features/currency/hooks/useGetHistoryPrice";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCurrencyDetail } from "@/features/currency/hooks/useGetCurrencyDetail";

//others
import abbreviateNumber from "@/utils/abbreviateNumber";
import { sparklineChartConfig } from "@/lib/highchart/sparklineChartConfig";

function InfoBlock({ title, amount, date, trend }) {
  return (
    <Flex className="flex-col flex-1">
      <Flex className="flex justify-between w-full text-sm">
        <Text className="text-dimgray font-bold">{title}</Text>
        <Text className="text-dimgray font-bold">
          <Price amount={amount} currencyCode="USD" />
        </Text>
      </Flex>
      <Flex className="flex justify-between w-full text-sm">
        <Text className="text-dimgray font-bold">
          {new Date(date).toDateString()}
        </Text>
        <Text className="text-dimgray font-bold">
          <Trend value={trend} />
        </Text>
      </Flex>
    </Flex>
  );
}
export default function ChartPanel() {
  const chartComponent = useRef(null);
  const { coinId } = useParams();
  const {
    data: detailData,
    error,
    isLoading,
  } = useGetCurrencyDetail({ coinId });
  const {
    ath,
    ath_change_percentage,
    ath_date,
    atl,
    atl_change_percentage,
    atl_date,
  } = detailData.currencyDetail || {};

  const { data: historyPriceData, isLoading: isChartLoading } =
    useGetHistoryPrice({ coinId });
  
  const { currentValue, streamMode } = useSelector(
    (state) => state.streaming.currency
  );
  useEffect(() => {
    if (!currentValue) return;
    // Update the last point of the series
    const chart = chartComponent.current.chart;
    const series = chart.series[0];
    // Get the current date as a timestamp
    const currentDate = new Date().getTime();
    console.log("current value", currentValue);
    const lastPoint = series.data[series.data.length - 1];
    // Update the last point with the new price and the current date
    lastPoint.update([currentDate, parseFloat(currentValue)], true);
    // Update the labelTxt with the new price
    if (chart.labelTxt) {
      chart.labelTxt.attr({
        text: abbreviateNumber(parseFloat(currentValue)),
      });
    }
  }, [currentValue]);
  return (
    <VStack className="w-full flex-col gap-5 h-full shrink-0 overflow-y-scroll ">
      <Flex className="relative w-full justify-center items-center">
        <HighchartsReact
          ref={chartComponent}
          className="m-auto flex-1 "
          highcharts={Highcharts}
          options={sparklineChartConfig({ data: historyPriceData })}
          containerProps={{ style: { width: "100%" } }}
        />
      </Flex>
      <Flex className="gap-2 justify-start items-start p-10 md:px-20 md:py-10 w-full flex-col ">
        <h3>Price Performance.</h3>
        <Flex className="flex-col gap-5 md:flex-row md:gap-20 w-full">
          <InfoBlock
            title="All time high"
            amount={ath}
            date={ath_date}
            trend={ath_change_percentage}
          />
          <InfoBlock
            title="All time low"
            amount={atl}
            date={atl_date}
            trend={atl_change_percentage}
          />
        </Flex>
      </Flex>
    </VStack>
  );
}
