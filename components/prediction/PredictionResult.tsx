"use client";

import { useEffect, useState } from "react";
import { BrainCircuit } from "lucide-react";

interface Prediction {
  disease: string;
  probability: number;
  risk: string;
  reasoning: string;
  recommendations: string;
  createdAt: string;
}

export default function PredictionResult({
  patientId,
}: {
  patientId: string;
}) {
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    fetchPrediction();
  }, []);

  async function fetchPrediction() {
    const res = await fetch(`/api/prediction/${patientId}`);
    const data = await res.json();

    if (data.success) {
      setPrediction(data.prediction);
    }
  }

  if (!prediction) return null;

  const riskColor =
    prediction.risk === "High"
      ? "text-red-400"
      : prediction.risk === "Medium"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className="mt-8 rounded-3xl border border-purple-500/20 bg-slate-900/70 p-8">

      <div className="mb-6 flex items-center gap-3">

        <BrainCircuit
          size={32}
          className="text-purple-400"
        />

        <h2 className="text-3xl font-bold text-white">
          Latest Disease Prediction
        </h2>

      </div>

      <div className="space-y-5">

        <div>
          <p className="text-slate-400">Predicted Disease</p>
          <h3 className="text-2xl font-bold text-white">
            {prediction.disease}
          </h3>
        </div>

        <div>
          <p className="text-slate-400">Probability</p>
          <h3 className="text-xl font-semibold text-cyan-400">
            {prediction.probability}%
          </h3>
        </div>

        <div>
          <p className="text-slate-400">Risk Level</p>
          <h3 className={`text-xl font-bold ${riskColor}`}>
            {prediction.risk}
          </h3>
        </div>

        <div>
          <p className="text-slate-400">AI Reasoning</p>

          <div className="mt-2 rounded-xl bg-slate-950 p-4 text-slate-300">
            {prediction.reasoning}
          </div>
        </div>

        <div>
          <p className="text-slate-400">
            Recommendations
          </p>

          <div className="mt-2 rounded-xl bg-slate-950 p-4 text-slate-300 whitespace-pre-wrap">
            {prediction.recommendations}
          </div>
        </div>

        <p className="text-sm text-slate-500">
          Generated on{" "}
          {new Date(prediction.createdAt).toLocaleString()}
        </p>

      </div>

    </div>
  );
}