import ReactECharts from 'echarts-for-react';

const Heatmap = ({ xmin, xmax, ymin, ymax, name }: { xmin: number; xmax: number; ymin: number; ymax: number, name: string }) => {
  // Generate xaxis and yaxis arrays with evenly spaced numbers
  const xaxis = Array.from({ length: 24 }, (_, i) => xmin + (i * (xmax - xmin)) / 23);
  const yaxis = Array.from({ length: 12 }, (_, i) => ymin + (i * (ymax - ymin)) / 11);

  const values = [];
  for (let volatility = 0; volatility < 12; volatility++) {
    for (let spotPrice = 0; spotPrice < 24; spotPrice++) {
      // Generate a value biased by the hour (higher hour -> higher value)
      const bias = Math.floor((spotPrice / 24) * 10); // Scale bias to range [0, 10]
      const value = Math.min(10, Math.floor(Math.random() * 5) + bias); // Add randomness with bias
      values.push([volatility, spotPrice, value]);
    }
  }
  const data = values.map(item => [item[1], item[0], item[2] || '-']);

  const option = {
    tooltip: {
      position: 'top',
      formatter: (params: any) => {
        return `Spot Price: ${xaxis[params.data[0]].toFixed(2)}<br>Volatility: ${yaxis[params.data[1]].toFixed(2)}<br>Option Price: ${params.data[2].toFixed(2)}`;
      },
    },
    grid: {
      height: '80%',
      top: '0%',
      bottom: '0%',
    },
    xAxis: {
      type: 'category',
      data: xaxis.map(num => num.toFixed(2)), // Format numbers for display
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: yaxis.map(num => num.toFixed(2)), // Format numbers for display
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      color: ['lightgreen', 'white', 'lightcoral'], // Correct order: lightgreen (low), white (medium), lightcoral (high)
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

  return <ReactECharts option={option} style={{ height: '500px', width: '100%' }} />;
};

export default Heatmap;