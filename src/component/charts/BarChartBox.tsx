import { Column } from "@ant-design/plots";
import type { MqttPayload } from "../../models/dashboard.model";

export default function BarChartBox({ data }: { data: MqttPayload[] }) {

    const config = {
        data: {
            value: data,
        },
        axis: {x: { title: 'Date & Time' }, y: {title: 'DC Input Current (A)'},},
        xField: 'ts',
        yField: 'value',
        slider: {
            x: {
                values: [0, 1],
            },
        },

    }

    return <Column {...config} />;
}
