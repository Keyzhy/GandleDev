"use client";

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { format, isValid, parseISO } from "date-fns";

interface iAppProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

// Agréger les revenus par date
const aggregateData = (data: iAppProps["data"]) => {
  const aggregated: Record<string, number> = {};

  data.forEach((entry) => {
    const { date, revenue } = entry;
    aggregated[date] = (aggregated[date] || 0) + revenue;
  });

  return Object.entries(aggregated).map(([date, revenue]) => ({
    date,
    revenue,
  }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (active && payload?.length > 0) {
    const rawDate = payload[0].payload.date;
    const parsedDate = parseISO(rawDate);

    const isDateValid = isValid(parsedDate);
    const formattedDate = isDateValid
      ? format(parsedDate, "dd MMM yyyy")
      : "Date invalide";

    return (
      <div className="bg-white p-3 rounded-md shadow-md border border-gray-200 text-sm">
        <p className="text-gray-700 font-medium">{formattedDate}</p>
        <p className="text-blue-600 font-semibold">
          {payload[0].value.toFixed(2)} €
        </p>
      </div>
    );
  }

  return null;
}

export function Chart({ data }: iAppProps) {
  const processedData = aggregateData(data);

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Revenus récents
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickFormatter={(str) => {
              const date = parseISO(str);
              return isValid(date) ? format(date, "dd MMM") : str;
            }}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            stroke="#d1d5db"
          />
          <YAxis
            tickFormatter={(value) => `${value.toFixed(2)} €`}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            stroke="#d1d5db"
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4, stroke: "#3b82f6", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
