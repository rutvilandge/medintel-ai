"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Report {
  id: string;
  title: string;
  reportType: string;
  hospital?: string;
  doctorName?: string;
  fileUrl: string;
  uploadedAt: string;

  patient: {
    id: string;
    fullName: string;
  };
}

export default function ReportDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    fetchReport();
  }, []);

  async function fetchReport() {
    const res = await fetch(`/api/reports/${id}`);
    const data = await res.json();

    setReport(data);
  }

  async function deleteReport() {
    if (!confirm("Delete this report?")) return;

    await fetch(`/api/reports/${id}`, {
      method: "DELETE",
    });

    router.push("/dashboard/reports");
  }

  if (!report) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-4xl font-bold text-white">
          {report.title}
        </h1>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 space-y-5">

          <div>
            <p className="text-slate-400">Patient</p>
            <p className="text-white">{report.patient.fullName}</p>
          </div>

          <div>
            <p className="text-slate-400">Type</p>
            <p className="text-white">{report.reportType}</p>
          </div>

          <div>
            <p className="text-slate-400">Hospital</p>
            <p className="text-white">{report.hospital || "-"}</p>
          </div>

          <div>
            <p className="text-slate-400">Doctor</p>
            <p className="text-white">{report.doctorName || "-"}</p>
          </div>

          <div>
            <p className="text-slate-400">Uploaded</p>
            <p className="text-white">
              {new Date(report.uploadedAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-4 pt-6">

            <a
              href={report.fileUrl}
              target="_blank"
              className="rounded-xl bg-cyan-600 px-5 py-3 text-white hover:bg-cyan-500"
            >
              View Report
            </a>

            <button
              onClick={() =>
                router.push(`/dashboard/patients/${report.patient.id}`)
              }
              className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-500"
            >
              View Patient
            </button>

            <button
              onClick={deleteReport}
              className="rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-500"
            >
              Delete Report
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}