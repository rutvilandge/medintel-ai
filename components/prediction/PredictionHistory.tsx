"use client";

import { BrainCircuit, CalendarDays, User } from "lucide-react";

interface Prediction {
  id: string;
  disease: string;
  probability: number;
  risk: string;
  reasoning: string;
  recommendations: string;
  createdAt: string | Date;
  patient: {
    id: string;
    fullName: string;
  };
}

export default function PredictionHistory({
  predictions,
}: {
  predictions: Prediction[];
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          Prediction History
        </h2>

        <p className="mt-2 text-slate-400">
          AI-generated disease predictions for all patients.
        </p>

      </div>

      {predictions.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">

          <BrainCircuit
            size={55}
            className="mx-auto text-cyan-400"
          />

          <h3 className="mt-5 text-2xl font-semibold text-white">
            No Predictions Yet
          </h3>

          <p className="mt-2 text-slate-400">
            Generate your first AI disease prediction.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {predictions.map((prediction) => (

            <div
              key={prediction.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6"
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="space-y-3">

                  <div className="flex items-center gap-2 text-cyan-400">

                    <User size={18} />

                    <span className="font-semibold">
                      {prediction.patient.fullName}
                    </span>

                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {prediction.disease}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4">

                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-semibold text-cyan-300">
                      Probability: {prediction.probability}%
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        prediction.risk === "High"
                          ? "bg-red-500/20 text-red-400"
                          : prediction.risk === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {prediction.risk} Risk
                    </span>

                  </div>

                </div>

                <div className="flex items-center gap-2 text-slate-400">

                  <CalendarDays size={16} />

                  {new Date(prediction.createdAt).toLocaleString()}

                </div>

              </div>

              <div className="mt-6 space-y-5">

                <div>

                  <h4 className="font-semibold text-cyan-400">
                    AI Reasoning
                  </h4>

                  <p className="mt-2 text-slate-300">
                    {prediction.reasoning}
                  </p>

                </div>

                <div>

                  <h4 className="font-semibold text-green-400">
                    Recommendations
                  </h4>

                  <p className="mt-2 text-slate-300">
                    {prediction.recommendations}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}