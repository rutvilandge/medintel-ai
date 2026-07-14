"use client";

import {
  BrainCircuit,
  Activity,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

interface Prediction {
  probability: number;
  disease: string;
  risk: string;
}

export default function PredictionStats({
  predictions,
}: {
  predictions: Prediction[];
}) {
  const total = predictions.length;

  const averageProbability =
    total === 0
      ? 0
      : (
          predictions.reduce(
            (sum, prediction) => sum + prediction.probability,
            0
          ) / total
        ).toFixed(1);

  const highRisk = predictions.filter(
    (prediction) => prediction.risk === "High"
  ).length;

  const diseaseCount: Record<string, number> = {};

  predictions.forEach((prediction) => {
    diseaseCount[prediction.disease] =
      (diseaseCount[prediction.disease] || 0) + 1;
  });

  const mostCommonDisease =
    Object.entries(diseaseCount).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] ?? "None";

  const stats = [
    {
      title: "Total Predictions",
      value: total,
      icon: BrainCircuit,
      color: "text-cyan-400",
    },
    {
      title: "Average Probability",
      value: `${averageProbability}%`,
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      title: "High Risk",
      value: highRisk,
      icon: ShieldAlert,
      color: "text-red-400",
    },
    {
      title: "Most Common",
      value: mostCommonDisease,
      icon: Activity,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => {

        const Icon = stat.icon;

        return (

          <div
            key={stat.title}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {stat.value}
                </h2>

              </div>

              <Icon
                className={stat.color}
                size={34}
              />

            </div>

          </div>

        );

      })}

    </div>
  );
}