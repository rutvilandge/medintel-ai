"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, Loader2 } from "lucide-react";

interface Patient {
  id: string;
  fullName: string;
}

interface Prediction {
  disease: string;
  probability: number;
  risk: string;
  reasoning: string;
  recommendations: string;
}

export default function PredictionForm() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    const res = await fetch("/api/patients");
    const data = await res.json();

    setPatients(data);
  }

  async function predictDisease() {
    if (!patientId) {
      alert("Please select a patient.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setPrediction(data.prediction);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

      <h2 className="mb-6 text-3xl font-bold text-white">
        AI Disease Prediction
      </h2>

      <select
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white"
      >
        <option value="">
          Select Patient
        </option>

        {patients.map((patient) => (
          <option
            key={patient.id}
            value={patient.id}
          >
            {patient.fullName}
          </option>
        ))}
      </select>

      <button
        onClick={predictDisease}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-4 font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Predicting...
          </>
        ) : (
          <>
            <BrainCircuit size={18} />
            Predict Disease
          </>
        )}
      </button>

      {prediction && (

        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-950 p-6">

          <h3 className="mb-4 text-2xl font-bold text-cyan-400">
            Prediction Result
          </h3>

          <div className="space-y-4">

            <div>
              <p className="text-sm text-slate-400">
                Disease
              </p>

              <p className="text-xl font-semibold text-white">
                {prediction.disease}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Probability
              </p>

              <p className="text-xl font-semibold text-white">
                {prediction.probability}%
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Risk
              </p>

              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold ${
                  prediction.risk === "High"
                    ? "bg-red-500/20 text-red-400"
                    : prediction.risk === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {prediction.risk}
              </span>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                AI Reasoning
              </p>

              <p className="mt-2 text-slate-300">
                {prediction.reasoning}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Recommendations
              </p>

              <p className="mt-2 text-slate-300">
                {prediction.recommendations}
              </p>
            </div>

          </div>

        </div>

      )}

    </div>
  );
}