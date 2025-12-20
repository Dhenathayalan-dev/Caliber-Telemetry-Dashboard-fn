
import { Line } from '@ant-design/plots';
import type { AnnotationChartType } from '../../models/dashboard.model';

export default function AnnotationChartBox({ data }: { data: AnnotationChartType[] }) {

  const config = {
    data: {
      value: data,
      transform: [
        {
          type: 'fold',
          fields: ['Humidity', 'min'],
          key: 'type',
          value: 'value',
        },
      ],
    },

    xField: 'date',
    yField: 'value',
    colorField: 'type',
    axis: { x: { labelAutoHide: 'greedy', title: 'Date & Time' }, y: { title: 'Humidity (°F)', } },
    annotations: [
      {
        type: 'lineY',
        yField: 100,
        style: {
          stroke: '#6395FA',
          lineWidth: 4,
          lineDash: [5, 5],
        },
        text: {
          content: 'Max Threshold (100)',
          position: 'end',
        },
      },
    ]
  };
  return <Line {...config} />;
};
