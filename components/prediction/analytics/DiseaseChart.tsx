"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Prediction {
  disease: string;
}

const COLORS = [
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
];

export default function DiseaseChart({
  predictions,
}: {
  predictions: Prediction[];
}) {
  const diseaseMap: Record<string, number> = {};

  predictions.forEach((prediction) => {
    diseaseMap[prediction.disease] =
      (diseaseMap[prediction.disease] || 0) + 1;
  });

  const data = Object.entries(diseaseMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Disease Distribution
      </h2>

      {data.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center text-slate-400">
          No prediction data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>
      )}

    </div>
  );
}