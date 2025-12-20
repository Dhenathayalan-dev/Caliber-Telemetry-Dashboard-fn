// src/config/chartMap.ts
export const chartMap: Record<string, "radar" | "bar" | "line" | "waterfall" | "annotation" | "area"> = {
  param1: "line",
  param2: "bar",
  param3: "annotation",
  param4: "waterfall",
  param5: "radar",
  param6: "area",
};

export const params: Record<string, { min: number; max: number }> = {
  param1: { min: 86, max: 110 },
  param2: { min: 0.321, max: 1.0 },
  param3: { min: 300, max: 600 },
  param4: { min: 150, max: 300 },
  param5: { min: 12, max: 45 },
  param6: { min: 80, max: 98 },
};


export const TelemetryValue = {
  param1: 'Input Voltage ',
  param2: 'DC Input Current',
  param3: 'AC Input Current',
  param4: 'Indication Voltage',
  param5: 'Temperature',
  param6: 'Humidity',
} as const;

export type UserRoleId = typeof TelemetryValue[keyof typeof TelemetryValue];