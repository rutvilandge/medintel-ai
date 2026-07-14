"use client";

import { useState } from "react";
import UploadButton from "./UploadButton";

interface Props {
  patientId: string;
}

export default function ReportUploadForm({ patientId }: Props) {
  const [title, setTitle] = useState("");
  const [reportType, setReportType] = useState("Blood Test");
  const [hospital, setHospital] = useState("");
  const [doctorName, setDoctorName] = useState("");

  const [fileUrl, setFileUrl] = useState("");
  const [cloudinaryId, setCloudinaryId] = useState("");

  const [loading, setLoading] = useState(false);

  async function saveReport() {
    if (!title) {
      alert("Please enter report title");
      return;
    }

    if (!fileUrl) {
      alert("Please upload a report first.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          title,
          reportType,
          hospital,
          doctorName,
          fileUrl,
          cloudinaryId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save report");
      }

      alert("Report uploaded successfully!");

      setTitle("");
      setReportType("Blood Test");
      setHospital("");
      setDoctorName("");
      setFileUrl("");
      setCloudinaryId("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

      <h2 className="mb-6 text-3xl font-bold text-white">
        Upload Medical Report
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Report Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/60 p-4 text-white outline-none placeholder:text-slate-500"
        />

        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/60 p-4 text-white outline-none"
        >
          <option>Blood Test</option>
          <option>X-Ray</option>
          <option>MRI</option>
          <option>CT Scan</option>
          <option>ECG</option>
          <option>Prescription</option>
          <option>Ultrasound</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          placeholder="Hospital Name"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/60 p-4 text-white outline-none placeholder:text-slate-500"
        />

        <input
          type="text"
          placeholder="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900/60 p-4 text-white outline-none placeholder:text-slate-500"
        />

        {/* Cloudinary Upload */}

        <UploadButton
          setFileUrl={setFileUrl}
          setCloudinaryId={setCloudinaryId}
        />

        {fileUrl && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
            <p className="font-medium text-green-400">
              ✅ Report uploaded successfully
            </p>

            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block break-all text-sm text-cyan-400 hover:underline"
            >
              View Uploaded File
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={saveReport}
          disabled={loading}
          className="w-full rounded-xl bg-cyan-500 py-4 font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Report"}
        </button>

      </div>
    </div>
  );
}