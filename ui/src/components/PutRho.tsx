import ReactECharts from "echarts-for-react";
import { useGetRhoPutQuery } from "../features/api";

export default function PutRho({ S, K, T, r, vol }: { S: number; K: number; T: number; r: number; vol: number}) {
  const { data, isLoading, error } = useGetRhoPutQuery({ S, K, T, r, sigma: vol });

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
      const rho = data.put_rhos[point.dataIndex].toFixed(4);
      return `Rates: ${rate}<br>Put Price: ${optionValue}<br>Rho: ${rho}`;
    },
  },
    legend: {
      data: ["Put Prices", "Put Rhos"],
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
        name: "Put Prices",
        type: "line",
        data: data.put_prices,
      },
      {
        name: "Put Rhos",
        type: "line",
        yAxisIndex: 1,
        data: data.put_rhos,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "33%" }} />;
}