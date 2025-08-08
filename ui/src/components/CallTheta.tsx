import ReactECharts from "echarts-for-react";
import {useGetThetaCallQuery} from "../features/api";

export default function CallTheta({ S, K, T, r, vol }: { S: number; K: number; T: number; r: number; vol: number}) {
  const { data, isLoading, error } = useGetThetaCallQuery({ S, K, T, r, sigma: vol });

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
      const time = parseFloat(point.axisValue).toFixed(2);
      const optionValue = parseFloat(point.data).toFixed(2);
      const theta = data.call_thetas[point.dataIndex].toFixed(4);
      return `Time: ${time}<br>Call Price: ${optionValue}<br>Theta: ${theta}`;
    },
  },
    legend: {
      data: ["Call Prices", "Call Thetas"],
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
        name: "Call Prices",
        type: "line",
        data: data.call_prices,
      },
      {
        name: "Call Thetas",
        type: "line",
        yAxisIndex: 1,
        data: data.call_thetas,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px", width: "33%" }} />;
}