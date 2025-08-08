import ReactECharts from "echarts-for-react";
import {useGetVommaQuery} from "../features/api";

export default function Vomma({ S, K, T, r, vol }: { S: number; K: number; T: number; r: number; vol: number}) {
  const { data, isLoading, error } = useGetVommaQuery({ S, K, T, r, sigma: vol });

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
      const vega = parseFloat(point.data).toFixed(4);
      const vomma = data.vommas[point.dataIndex].toFixed(4);
      return `Volatility: ${sigma}<br>Vega: ${vega}<br>Vomma: ${vomma}`;
    },
  },
    legend: {
      data: ["Vegas", "Vommas"],
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
      name: "Vegas",
      axisLabel: {
        formatter: "{value}",
      },
      splitLine: {
        show: false,
      },
    },
    {
      type: "value",
      name: "Vommas",
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
        name: "Vegas",
        type: "line",
        data: data.vegas,
      },
      {
        name: "Vommas",
        type: "line",
        yAxisIndex: 1,
        data: data.vommas,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "33%" }} />;
}