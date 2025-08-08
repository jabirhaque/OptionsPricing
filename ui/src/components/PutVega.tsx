import ReactECharts from "echarts-for-react";
import { useGetVegaPutQuery } from "../features/api";

export default function PutVega({ S, K, T, r, vol }: { S: number; K: number; T: number; r: number; vol: number}) {
  const { data, isLoading, error } = useGetVegaPutQuery({ S, K, T, r, sigma: vol });

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
      const sigma = parseFloat(point.axisValue).toFixed(2);
      const optionValue = parseFloat(point.data).toFixed(2);
      const vega = data.put_vegas[point.dataIndex].toFixed(4);
      return `Volatility: ${sigma}<br>Put Price: ${optionValue}<br>Vega: ${vega}`;
    },
  },
    legend: {
      data: ["Put Prices", "Put Vegas"],
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
        name: "Put Prices",
        type: "line",
        data: data.put_prices,
      },
      {
        name: "Put Vegas",
        type: "line",
        yAxisIndex: 1,
        data: data.put_vegas,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "33%" }} />;
}