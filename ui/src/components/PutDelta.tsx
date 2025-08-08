import ReactECharts from "echarts-for-react";
import { useGetDeltaPutQuery } from "../features/api";

export default function PutDelta({ S, K, T, r, vol }: { S: number; K: number; T: number; r: number; vol: number}) {
  const { data, isLoading, error } = useGetDeltaPutQuery({ S, K, T, r, sigma: vol });

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
      const spotPrice = parseFloat(point.axisValue).toFixed(2);
      const optionValue = parseFloat(point.data).toFixed(2);
      const delta = data.put_deltas[point.dataIndex].toFixed(4);
      return `Spot Price: ${spotPrice}<br>Put Price: ${optionValue}<br>Delta: ${delta}`;
    },
  },
    legend: {
      data: ["Put Prices", "Put Deltas"],
    },
    xAxis: {
      type: "category",
      data: data.spot_prices,
      axisPointer: {
        type: "shadow",
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: [
    {
      type: "value",
      name: "Prices",
      axisLabel: {
        formatter: "{value}",
      },
      splitLine: {
        show: false,
      },
    },
    {
      type: "value",
      name: "Deltas",
      axisLabel: {
        formatter: "{value}",
      },
      splitLine: {
        show: false,
      },
    },
  ],
    series: [
      {
        name: "Put Prices",
        type: "line",
        data: data.put_prices,
      },
      {
        name: "Put Deltas",
        type: "line",
        yAxisIndex: 1,
        data: data.put_deltas,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "33%" }} />;
}