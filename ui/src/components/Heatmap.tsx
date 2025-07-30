import ReactECharts from 'echarts-for-react';

const Heatmap = ({ xmin, xmax, ymin, ymax }: { xmin: number; xmax: number; ymin: number; ymax: number }) => {
  // Generate xaxis and yaxis arrays with evenly spaced numbers
  const xaxis = Array.from({ length: 24 }, (_, i) => xmin + (i * (xmax - xmin)) / 23);
  const yaxis = Array.from({ length: 12 }, (_, i) => ymin + (i * (ymax - ymin)) / 11);

  const values = [];
  for (let day = 0; day < 12; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // Generate a value biased by the hour (higher hour -> higher value)
      const bias = Math.floor((hour / 24) * 10); // Scale bias to range [0, 10]
      const value = Math.min(10, Math.floor(Math.random() * 5) + bias); // Add randomness with bias
      values.push([day, hour, value]);
    }
  }
  const data = values.map(item => [item[1], item[0], item[2] || '-']);

  const option = {
    tooltip: {
      position: 'top',
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
        name: 'Punch Card',
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