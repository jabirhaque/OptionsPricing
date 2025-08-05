import ReactECharts from "echarts-for-react";
import {useGetDeltaCallQuery, useGetDeltaPutQuery} from "../features/api";

export default function Delta({ S, K, T, r, vol, isCall }: { S: number; K: number; T: number; r: number; vol: number; isCall: boolean }) {
  const { data, isLoading, error } = isCall?useGetDeltaCallQuery({ S, K, T, r, sigma: vol }):useGetDeltaPutQuery({ S, K, T, r, sigma: vol });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error loading data</div>;
  }

  const options = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const [point] = params;
        return `Spot Price: ${parseFloat(point.axisValue).toFixed(2)}<br>${isCall ? "Call Price" : "Put Price"}: ${point.data.toFixed(2)}`;
      },
    },
    xAxis: {
      type: "category",
      data: data.spot_prices,
      axisLabel: { show: false },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: isCall && 'call_prices' in data? data.call_prices: 'put_prices' in data?data.put_prices: [],
        type: "line",
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "50%" }} />;
}