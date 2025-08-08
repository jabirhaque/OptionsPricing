import ReactECharts from "echarts-for-react";
import { useGetGammaCallQuery } from "../features/api";

export default function CallGamma({ S, K, T, r, vol }: { S: number; K: number; T: number; r: number; vol: number}) {
  const { data, isLoading, error } = useGetGammaCallQuery({ S, K, T, r, sigma: vol });

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
      const delta = parseFloat(point.data).toFixed(4);
      const gamma = data.call_gammas[point.dataIndex].toFixed(4);
      return `Spot Price: ${spotPrice}<br>Delta: ${delta}<br>Gamma: ${gamma}`;
    },
  },
    legend: {
      data: ["Call Deltas", "Call Gammas"],
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
      name: "Deltas",
      axisLabel: {
        formatter: "{value}",
      },
      splitLine: {
        show: false,
      },
    },
    {
      type: "value",
      name: "Gammas",
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
        name: "Call Deltas",
        type: "line",
        data: data.call_deltas,
      },
      {
        name: "Call Gammas",
        type: "line",
        yAxisIndex: 1,
        data: data.call_gammas,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "33%" }} />;
}