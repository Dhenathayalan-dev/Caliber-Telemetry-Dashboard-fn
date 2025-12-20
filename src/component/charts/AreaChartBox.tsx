import { Area } from '@ant-design/plots';
import type { AreaChart } from '../../models/dashboard.model';
import { useDateFunction } from '../../util';


export default function AreaChartBox({ data }: { data: AreaChart[] }) {

    const {formatDate} = useDateFunction();
    const config = {
        data: {
            value: data,
        },
        axis: {y: { title: 'Temperature (°C)' }, x: {title: 'Date & Time' }},
        xField: (d: any) => formatDate(d.date),
        yField: (d: any) => d.value,
        connectNulls: {
            connect: true,
            
            connectFill: 'grey',
            connectFillOpacity: 0.15,
        },
    };
    return <Area {...config} />;
};
