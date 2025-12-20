export type MqttPayload = {
    deviceId: string;
    param: string;
    value: number;
    ts: string;
}

export type RadarChartType = {
    date: string;
    value: number;
    avg: number,
    min: number;
    max: number;
    maxmax: number;
    minmin: number;
}

export type AnnotationChartType = {
[key: string]: string | number;
}

export type AreaChart = {
    date: string;
    value: number;
}


export type TelemetryState = MqttPayload;

export type TelemetryAction = {
    param1: RadarChartType[],
    param2: MqttPayload[], 
    param3: MqttPayload[],
    param4: MqttPayload[],
    param5: AreaChart[],
    param6: AnnotationChartType[],
}

export type TelemetryStateActionType = {
    type: TelemetryType,
    payload: MqttPayload
}

export const telemetryType = {
    param1: 1,
    param2: 2,
    param3: 3,
    param4: 4,
    param5: 5,
    param6: 6,
} as const;

export type TelemetryType =
    typeof telemetryType[keyof typeof telemetryType];


export const paramsValues: Record<string, { min: number; max: number }> = {
    param1: { min: 86, max: 110 },
    param2: { min: 0.321, max: 1.0 },
    param3: { min: 300, max: 600 },
    param4: { min: 150, max: 300 },
    param5: { min: 12, max: 45 },
    param6: { min: 80, max: 98 },
};
