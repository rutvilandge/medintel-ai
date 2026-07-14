"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  Eye,
  Trash2,
  Brain,
  FileText,
  BrainCircuit,
} from "lucide-react";

interface Analysis {
  id: string;
  summary: string;
  abnormalities: string | null;
  recommendation: string | null;
  createdAt: string;
}

interface Report {
  id: string;
  title: string;
  reportType: string;
  hospital: string | null;
  doctorName: string | null;
  fileUrl: string;
  uploadedAt: string;
  status: string;
  analysis?: Analysis | null;
}

export default function PatientReports({
  patientId,
}: {
  patientId: string;
}) {
  const router = useRouter();

  const [reports, setReports] = useState<Report[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [open, setOpen] = useState(false);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    const res = await fetch(`/api/patients/${patientId}`);
    const data = await res.json();

    setReports(data.reports || []);
  }

  async function deleteReport(id: string) {
    if (!confirm("Delete this report?")) return;

    await fetch(`/api/reports/${id}`, {
      method: "DELETE",
    });

    fetchReports();
  }

  async function analyzeReport(reportId: string) {
    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportId,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error);
        return;
      }

      alert("✅ AI Analysis Completed!");

      fetchReports();
    } catch (err) {
      console.error(err);
      alert("❌ AI Analysis Failed");
    }
  }

  async function predictDisease() {
    try {
      setPredicting(true);

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

      alert("✅ Disease Prediction Completed!");

      fetchReports();
      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setPredicting(false);
    }
  }

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Uploaded Reports
          </h2>

          <button
            onClick={predictDisease}
            disabled={predicting}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            <BrainCircuit size={18} />

            {predicting
              ? "Predicting..."
              : "Predict Disease"}
          </button>

        </div>
                {reports.length === 0 ? (
          <p className="text-slate-400">
            No reports uploaded yet.
          </p>
        ) : (
          <div className="space-y-4">

            {reports.map((report) => (

              <div
                key={report.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-5"
              >

                <div>

                  <h3 className="text-lg font-semibold text-white">
                    {report.title}
                  </h3>

                  <p className="text-slate-400">
                    {report.reportType}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(report.uploadedAt).toLocaleDateString()}
                  </p>

                  <span
                    className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      report.status === "Analyzed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {report.status}
                  </span>

                </div>

                <div className="flex flex-wrap gap-3">

                  <a
                    href={report.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
                  >
                    <Eye size={16} />
                    View
                  </a>

                  <a
                    href={report.fileUrl}
                    download
                    className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  >
                    <Download size={16} />
                    Download
                  </a>

                  <button
                    onClick={() => analyzeReport(report.id)}
                    className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                  >
                    <Brain size={16} />
                    Analyze AI
                  </button>

                  {report.analysis && (
                    <button
                      onClick={() => {
                        setAnalysis(report.analysis!);
                        setOpen(true);
                      }}
                      className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                    >
                      <FileText size={16} />
                      View Analysis
                    </button>
                  )}

                  <button
                    onClick={() => deleteReport(report.id)}
                    className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

      {open && analysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

          <div className="w-full max-w-2xl rounded-3xl bg-slate-900 p-8">

            <h2 className="mb-6 text-3xl font-bold text-white">
              AI Analysis
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold text-cyan-400">
                  Summary
                </h3>

                <p className="mt-2 text-slate-300">
                  {analysis.summary}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-red-400">
                  Abnormalities
                </h3>

                <p className="mt-2 text-slate-300">
                  {analysis.abnormalities || "None"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-green-400">
                  Recommendations
                </h3>

                <p className="mt-2 text-slate-300">
                  {analysis.recommendation || "None"}
                </p>
              </div>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-8 rounded-xl bg-cyan-500 px-6 py-3 text-white hover:bg-cyan-600"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </>
  );
}