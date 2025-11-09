"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeSeriesPoint } from "@/lib/dashboardQueries";
import {
  formatCurrency,
  formatMultiple,
  formatNumber,
  formatPercentage,
  formatShortDate,
} from "@/lib/formatters";

type LineConfig = {
  dataKey: keyof TimeSeriesPoint;
  label: string;
  color: string;
  yAxisId?: string;
  formatter?: (value: number) => string;
};

type Props = {
  title: string;
  data: TimeSeriesPoint[];
  lines: LineConfig[];
};

const formatValue = (key: keyof TimeSeriesPoint, value: number) => {
  if (["spend", "revenue"].includes(key)) {
    return formatCurrency(value);
  }
  if (key === "roas") {
    return formatMultiple(value);
  }
  if (key === "ctr") {
    return formatPercentage(value);
  }
  return formatNumber(value);
};

export default function TimeSeriesChart({ title, data, lines }: Props) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-600">{title}</p>
      <div className="mt-4 h-64">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="bucket"
              tickFormatter={(value) => formatShortDate(value)}
              fontSize={12}
            />
            {Array.from(new Set(lines.map((line) => line.yAxisId ?? "left"))).map(
              (axis) => (
                <YAxis
                  key={axis}
                  yAxisId={axis}
                  tickFormatter={(value) => formatNumber(value)}
                  fontSize={12}
                  orientation={axis === "right" ? "right" : "left"}
                />
              ),
            )}
            <Tooltip
              labelFormatter={(value) => formatShortDate(String(value))}
              formatter={(value, key) =>
                [
                  formatValue(key as keyof TimeSeriesPoint, Number(value)),
                  lines.find((line) => line.dataKey === key)?.label ?? key,
                ]
              }
            />
            <Legend />
            {lines.map((line) => (
              <Line
                key={line.dataKey as string}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.color}
                strokeWidth={2}
                dot={false}
                yAxisId={line.yAxisId ?? "left"}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
