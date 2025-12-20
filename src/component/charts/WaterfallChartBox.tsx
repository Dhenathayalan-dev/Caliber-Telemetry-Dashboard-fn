import { Waterfall } from "@ant-design/charts";
import type { MqttPayload } from "../../models/dashboard.model";


export default function WaterfallChartBox({ data }: { data: MqttPayload[] }) {

  const config = {
    data,
    xField: 'ts',
    yField: 'value',
    axis: { y: { title: 'Indication Voltage (mA)' }, x: { title: 'Date & Time' } },
    linkStyle: {
      lineDash: [4, 2],
      stroke: '#ccc',
    },
    style: {
      maxWidth: 25,
      stroke: '#ccc',
      fill: (d: { isTotal: any; value: number; }, idx: number) => {
        return idx === 0 || d.isTotal ? '#96a6a6' : d.value > 0 ? '#64b5f6' : '#ef6c00';
      },
    },

    connector: {
      reverse: true,
      style: { stroke: '#697474', offset: 16 },
    },
  };
  return <Waterfall {...config} />;
};
