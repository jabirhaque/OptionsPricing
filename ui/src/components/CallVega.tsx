import ReactECharts from "echarts-for-react";
import { useGetVegaCallQuery } from "../features/api";

export default function CallVega({ S, K, T, r, vol }: { S: number; K: number; T: number; r: number; vol: number}) {
  const { data, isLoading, error } = useGetVegaCallQuery({ S, K, T, r, sigma: vol });

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
      const sigma = parseFloat(point.axisValue).toFixed(4);
      const optionValue = parseFloat(point.data).toFixed(2);
      const vega = data.call_vegas[point.dataIndex].toFixed(4);
      return `Volatility: ${sigma}<br>Call Price: ${optionValue}<br>Vega: ${vega}`;
    },
  },
    legend: {
      data: ["Call Prices", "Call Vegas"],
    },
    xAxis: {
      type: "category",
      data: data.sigmas,
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
      name: "Vegas",
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
        name: "Call Prices",
        type: "line",
        data: data.call_prices,
      },
      {
        name: "Call Vegas",
        type: "line",
        yAxisIndex: 1,
        data: data.call_vegas,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "33%" }} />;
}