import { Card, Row, Col, Typography } from "antd";
import { useEffect, useReducer, useState } from "react";
import { chartMap, TelemetryValue } from "../config/chartMap";
import RadarChartBox from "../component/charts/RadarChartBox";
import BarChartBox from "../component/charts/BarChartBox";
import LineChartBox from "../component/charts/LineChartBox";
import { socket } from "../socket/socket";
import WaterfallChartBox from "../component/charts/WaterfallChartBox";
import AnnotationChartBox from "../component/charts/AnnotationChatBox";
import AreaChartBox from "../component/charts/AreaChartBox";
import { paramsValues, telemetryType, type AreaChart, type MqttPayload, type TelemetryAction, type TelemetryStateActionType, type TelemetryType } from "../models/dashboard.model";
import { useDateFunction } from "../util";
import ChartSkeleton from "../component/charts/ChartSkeleton";

const { Title } = Typography;

export default function TelemetryDashboard() {

    useEffect(() => {
        const onConnect = () => {
            console.log("✅ UI connected:", socket.id);

            socket.emit("join", {
                deviceId: "device-001",
                params: Object.keys(chartMap),
            });
        };

        const onDisconnect = (reason: string) => {
            console.warn("⚠️ Socket disconnected:", reason);
        };

        const onTelemetry = (mqttMsgData: MqttPayload[]) => {
            mqttMsgData.forEach((mqttMsg) => {
                dispatch({
                    type: getTelemetryType(mqttMsg.param) as TelemetryType,
                    payload: mqttMsg,
                });
            });

            if (mqttMsgData.length) {
                setLoading(false);
            }
        };

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("telemetry:global", onTelemetry);

        // 3️⃣ Cleanup properly
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("telemetry:global", onTelemetry);
        };
    }, []);
    const initialState: TelemetryAction = {
        param1: [],
        param2: [],
        param3: [
        ],
        param4: [
            {
                deviceId: '001',
                param: 'param1',
                ts: new Date().toDateString(),
                value: 10
            }
        ],
        param5: [],
        param6: [],
    };
    const { formatDate } = useDateFunction()

    const [data, dispatch] = useReducer(telemetryReducer, initialState);

    const [loading, setLoading] = useState(true);



    function telemetryReducer(mqtt: TelemetryAction, { type, payload }: TelemetryStateActionType): TelemetryAction {

        switch (type) {
            case telemetryType.param1: {
                const { min, max } = paramsValues['param1'];
                return {

                    ...mqtt,
                    param1: [
                        ...mqtt.param1.slice(-11 + 1),
                        {
                            value: payload.value,
                            date: formatDate(payload.ts),
                            min,
                            max,
                            minmin: Math.ceil(payload.value),
                            maxmax: Math.floor(payload.value),
                            avg: Math.round(payload.value)
                        }
                    ]
                }
            }
            case telemetryType.param2:
                return {
                    ...mqtt,
                    param2: [...mqtt.param2, {
                        value: payload.value,
                        deviceId: payload.deviceId,
                        param: payload.param,
                        ts: formatDate(payload.ts)
                    }],
                }
            case telemetryType.param3:
                return {
                    ...mqtt,
                    param3: [...mqtt.param3, {
                        value: payload.value,
                        deviceId: payload.deviceId,
                        param: payload.param,
                        ts: formatDate(payload.ts)
                    }],
                }

            case telemetryType.param4:
                return {
                    ...mqtt,
                    param4: [...mqtt.param4, {
                        value: payload.value,
                        deviceId: payload.deviceId,
                        param: payload.param,
                        ts: formatDate(payload.ts)
                    }],
                }
            case telemetryType.param5: {
                const newPoint: AreaChart = {
                    date: payload.ts,
                    value: Number(payload.value),
                };

                return {
                    ...mqtt,
                    param5: [
                        ...mqtt.param5, // keep last N
                        newPoint,
                    ],
                }
            }
            case telemetryType.param6: {
                const { min } = paramsValues['param6'];

                return {
                    ...mqtt,
                    param6: [
                        ...mqtt.param6,
                        {
                            'date': formatDate(payload.ts),
                            'Humidity': payload.value,
                            'min': min
                        }
                    ]
                }
            }
            default:
                return mqtt;
        }


    }


    function getTelemetryType(mqttMsgParam: string): TelemetryType {
        switch (mqttMsgParam) {
            case 'param1':
                return telemetryType.param1;
            case 'param2':
                return telemetryType.param2;
            case 'param3':
                return telemetryType.param3;
            case 'param4':
                return telemetryType.param4
            case 'param5':
                return telemetryType.param5;
            case 'param6':
                return telemetryType.param6;
            default:
                return telemetryType.param1;

        }
    }

    const renderChart = (param: string) => {
        const type = chartMap[param];

        if (type === "radar")
            return <RadarChartBox data={data.param1} />;
        if (type === "bar") return <BarChartBox data={data.param2} />;
        if (type === "line") return <LineChartBox data={data.param3} />;
        if (type === "waterfall") return <WaterfallChartBox data={data.param4} />;
        if (type === "area") return <AreaChartBox data={data.param5} />;
        if (type === "annotation") return <AnnotationChartBox data={data.param6} />;

    };

    const getParamsName = (param: string) => {
        switch (param) {
            case 'param1':
                return TelemetryValue.param1;
            case 'param2':
                return TelemetryValue.param2;
            case 'param3':
                return TelemetryValue.param3;
            case 'param4':
                return TelemetryValue.param4;
            case 'param5':
                return TelemetryValue.param5;
            case 'param6':
                return TelemetryValue.param6;
        }
    }

    return (
        <>
            <Title level={3}>📡 Telemetry Dashboard</Title>

            <Row gutter={[16, 16]}>
                {Object.keys(chartMap).map((param) => (
                    <Col xs={24} md={12} lg={100} key={param} >
                        <Card title={getParamsName(param)} variant="outlined" >
                            {loading ? <ChartSkeleton /> : renderChart(param)}
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}
