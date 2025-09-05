import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

interface Props {
  data: { month: string; price: number }[];
}

export default function Chart({ data }: Props) {
  const option: echarts.EChartsOption = {
    title: { text: "Monthly Average RSP" },
    tooltip: {},
    xAxis: { type: 'category', data: data.map(d => d.month) },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: data.map(d => d.price) }]
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
}
