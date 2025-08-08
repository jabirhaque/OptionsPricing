import ReactECharts from "echarts-for-react";
import { useGetGammaPutQuery } from "../features/api";

export default function PutGamma({ S, K, T, r, vol }: { S: number; K: number; T: number; r: number; vol: number}) {
  const { data, isLoading, error } = useGetGammaPutQuery({ S, K, T, r, sigma: vol });

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
      const delta = parseFloat(point.data).toFixed(2);
      const gamma = data.put_gammas[point.dataIndex].toFixed(4);
      return `Spot Price: ${spotPrice}<br>Delta: ${delta}<br>Gamma: ${gamma}`;
    },
  },
    legend: {
      data: ["Put Deltas", "Put Gammas"],
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
        name: "Put Deltas",
        type: "line",
        data: data.put_deltas,
      },
      {
        name: "Put Gammas",
        type: "line",
        yAxisIndex: 1,
        data: data.put_gammas,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "33%" }} />;
}