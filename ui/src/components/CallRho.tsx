import ReactECharts from "echarts-for-react";
import { useGetRhoCallQuery } from "../features/api";

export default function CallRho({ S, K, T, r, vol }: { S: number; K: number; T: number; r: number; vol: number}) {
  const { data, isLoading, error } = useGetRhoCallQuery({ S, K, T, r, sigma: vol });

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
      const rate = parseFloat(point.axisValue).toFixed(4);
      const optionValue = parseFloat(point.data).toFixed(2);
      const rho = data.call_rhos[point.dataIndex].toFixed(4);
      return `Rate: ${rate}<br>Call Price: ${optionValue}<br>Rho: ${rho}`;
    },
  },
    legend: {
      data: ["Call Prices", "Call Rhos"],
    },
    xAxis: {
      type: "category",
      data: data.rates,
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
      name: "Rhos",
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
        name: "Call Rhos",
        type: "line",
        yAxisIndex: 1,
        data: data.call_rhos,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "33%" }} />;
}