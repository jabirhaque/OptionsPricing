import ReactECharts from "echarts-for-react";
import { useGetDeltaCallQuery } from "../features/api";

export default function CallDelta({ S, K, T, r, vol }: { S: number; K: number; T: number; r: number; vol: number}) {
  const { data, isLoading, error } = useGetDeltaCallQuery({ S, K, T, r, sigma: vol });

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
      const delta = data.call_deltas[point.dataIndex].toFixed(4);
      return `Spot Price: ${spotPrice}<br>Call Price: ${optionValue}<br>Delta: ${delta}`;
    },
  },
    legend: {
      data: ["Call Prices", "Call Deltas"],
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
        show: false, // Hides horizontal grid lines for this y-axis
      },
    },
    {
      type: "value",
      name: "Deltas",
      axisLabel: {
        formatter: "{value}",
      },
      splitLine: {
        show: false, // Hides horizontal grid lines for this y-axis
      },
    },
  ],
    series: [
      {
        name: "Call Prices",
        type: "line",
        data: data.call_prices,
      },
      {
        name: "Call Deltas",
        type: "line",
        yAxisIndex: 1,
        data: data.call_deltas,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "50%" }} />;
}