// src/components/charts/RadarChartBox.tsx
import { Radar } from "@ant-design/plots";
import type { RadarChartType } from "../../models/dashboard.model";


export default function RadarChartBox({ data }: { data: RadarChartType[] }) {

    const config = {
        autoFit: false,
        data: {
            value: data,
            
        },
        xField: 'metric',
        yField: 'value',
        scale: { x: { utc: true } },
        style: { stroke: 'steelblue', strokeWidth: 1.5 },
        tooltip: { items: [{ channel: 'y', valueFormatter: '.1f' }] },
        innerRadius: 0.4,
        axis: {
            y: {
                direction: 'center',
                style: { labelStroke: '#fff', labelStrokeWidth: 5, top: 50 },
            },
            x: { grid: true },
        },
        annotations: [
            {
                type: 'area',
                xField: 'date',
                yField: ['min', 'max'],
                style: { fill: 'lightsteelblue', fillOpacity: 0.2 },
            },
            {
                type: 'area',
                xField: 'date',
                yField: ['min', 'max'],
                style: { fill: 'steelblue', fillOpacity: 0.2 },
            },
        ],
    };
    return <Radar {...config} />;
};
