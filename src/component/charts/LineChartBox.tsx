import { Line } from '@ant-design/plots';
import type { MqttPayload } from '../../models/dashboard.model';

export default function LineChartBox({ data }: { data?: MqttPayload[] }) {

  const config = {
    data,
    xField: 'ts',
    yField: 'value',
    axis: { x: { title: 'Date & Time' }, y: { title: 'AC Input Current (mA)' } },

    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
      stroke: 'darkgreen',
    },
    area: {
      style: {
        fill: 'linear-gradient(-90deg, white 0%, darkgreen 100%)',
      },
    },
  };

  return <Line {...config} />;
}
