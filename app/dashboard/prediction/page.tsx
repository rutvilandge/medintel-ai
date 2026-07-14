import { prisma } from "@/lib/prisma";

import PredictionForm from "@/components/prediction/PredictionForm";
import PredictionHistory from "@/components/prediction/PredictionHistory";

import PredictionStats from "@/components/prediction/analytics/PredictionStats";
import DiseaseChart from "@/components/prediction/analytics/DiseaseChart";
import RiskChart from "@/components/prediction/analytics/RiskChart";
import PredictionTrend from "@/components/prediction/analytics/PredictionTrend";

export default async function PredictionPage() {
  const patients = await prisma.patient.findMany({
    orderBy: {
      fullName: "asc",
    },
  });

  const predictions = await prisma.prediction.findMany({
    include: {
      patient: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">

      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-5xl font-bold text-white">
            AI Disease Prediction
          </h1>

          <p className="mt-3 text-slate-400">
            Predict disease risk using AI and visualize insights with analytics.
          </p>

        </div>

        {/* Prediction Form */}

        <PredictionForm patients={patients} />

        {/* Statistics */}

        <PredictionStats predictions={predictions} />

        {/* Charts */}

        <div className="grid gap-6 lg:grid-cols-2">

          <DiseaseChart predictions={predictions} />

          <RiskChart predictions={predictions} />

        </div>

        {/* Trend */}

        <PredictionTrend predictions={predictions} />

        {/* History */}

        <PredictionHistory predictions={predictions} />

      </div>

    </div>
  );
}