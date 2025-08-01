import ReactECharts from 'echarts-for-react';
import { useGetCallOptionMatrixQuery, useGetPutOptionMatrixQuery } from "../features/api";

const Heatmap = ({ strikePrice, time, rate, xmin, xmax, ymin, ymax, name, isCall }: { strikePrice: number, time: number, rate: number, xmin: number; xmax: number; ymin: number; ymax: number, name: string, isCall: boolean }) => {
  const xaxis = Array.from({ length: 24 }, (_, i) => xmin + (i * (xmax - xmin)) / 23);
  const yaxis = Array.from({ length: 12 }, (_, i) => ymin + (i * (ymax - ymin)) / 11);

  // Conditionally use the appropriate hook
  const { data: matrixData, isLoading, error } = isCall
    ? useGetCallOptionMatrixQuery({
        K: strikePrice,
        T: time,
        r: rate,
        min_spot_price: xmin,
        max_spot_price: xmax,
        min_volatility: ymin,
        max_volatility: ymax,
      })
    : useGetPutOptionMatrixQuery({
        K: strikePrice,
        T: time,
        r: rate,
        min_spot_price: xmin,
        max_spot_price: xmax,
        min_volatility: ymin,
        max_volatility: ymax,
      });

  const values = matrixData
    ? matrixData[isCall ? 'call_option_matrix' : 'put_option_matrix'].flatMap((row, rowIndex) =>
        row.map((value, colIndex) => [rowIndex, colIndex, parseFloat(value.toFixed(2))])
      )
    : [];

  const minValue = values.length > 0 ? Math.min(...values.map(item => item[2])) : 0;
  const maxValue = values.length > 0 ? Math.max(...values.map(item => item[2])) : 10;

  const data = values.map(item => [item[1], item[0], item[2] || '-']);

  const option = {
    tooltip: {
      position: 'top',
      formatter: (params: any) => {
        return `Spot Price: ${xaxis[params.data[0]].toFixed(2)}<br>Volatility: ${yaxis[params.data[1]].toFixed(2)}<br>${name}: ${params.data[2].toFixed(2)}`;
      },
    },
    grid: {
      height: '80%',
      top: '0%',
      bottom: '0%',
    },
    xAxis: {
      type: 'category',
      data: xaxis.map(num => num.toFixed(2)),
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: yaxis.map(num => num.toFixed(2)),
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: minValue,
      max: maxValue,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      color: ['lightgreen', 'white', 'lightcoral'],
    },
    series: [
      {
        name: name,
        type: 'heatmap',
        data: data,
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return <ReactECharts option={option} style={{ height: '500px', width: '100%' }} />;
};

export default Heatmap;