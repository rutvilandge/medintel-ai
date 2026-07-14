"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Prediction {
  risk: string;
}

export default function RiskChart({
  predictions,
}: {
  predictions: Prediction[];
}) {
  const riskMap = {
    High: 0,
    Medium: 0,
    Low: 0,
  };

  predictions.forEach((prediction) => {
    if (prediction.risk in riskMap) {
      riskMap[prediction.risk as keyof typeof riskMap]++;
    }
  });

  const data = [
    {
      risk: "High",
      value: riskMap.High,
    },
    {
      risk: "Medium",
      value: riskMap.Medium,
    },
    {
      risk: "Low",
      value: riskMap.Low,
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Risk Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <BarChart data={data}>

          <XAxis dataKey="risk" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}
