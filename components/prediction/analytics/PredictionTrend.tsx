"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Prediction {
  createdAt: string | Date;
}

export default function PredictionTrend({
  predictions,
}: {
  predictions: Prediction[];
}) {
  const map: Record<string, number> = {};

  predictions.forEach((prediction) => {
    const date = new Date(prediction.createdAt).toLocaleDateString();

    map[date] = (map[date] || 0) + 1;
  });

  const data = Object.entries(map).map(([date, value]) => ({
    date,
    value,
  }));

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Prediction Trend
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <LineChart data={data}>

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}