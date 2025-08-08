import ReactECharts from "echarts-for-react";
import {useGetThetaPutQuery} from "../features/api";

export default function PutTheta({ S, K, T, r, vol }: { S: number; K: number; T: number; r: number; vol: number}) {
  const { data, isLoading, error } = useGetThetaPutQuery({ S, K, T, r, sigma: vol });

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
      const time = parseFloat(point.axisValue).toFixed(4);
      const optionValue = parseFloat(point.data).toFixed(2);
      const theta = data.put_thetas[point.dataIndex].toFixed(4);
      return `Time: ${time}<br>Put Price: ${optionValue}<br>Theta: ${theta}`;
    },
  },
    legend: {
      data: ["Put Prices", "Put Thetas"],
    },
    xAxis: {
      type: "category",
      data: data.times,
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
      name: "Thetas",
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
        name: "Put Thetas",
        type: "line",
        yAxisIndex: 1,
        data: data.put_thetas,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "33%" }} />;
}