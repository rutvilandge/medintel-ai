"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import ReportUploadForm from "@/components/upload/ReportUploadForm";
import PatientReports from "@/components/reports/PatientReports";
import PredictionResult from "@/components/prediction/PredictionResult";

interface Patient {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  phone?: string;
  email?: string;
  bloodGroup?: string;
  address?: string;
}

export default function PatientDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatient();
  }, []);

  async function fetchPatient() {
    const res = await fetch(`/api/patients/${id}`);
    const data = await res.json();
    setPatient(data);
  }

  async function deletePatient() {
    const confirmDelete = confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    await fetch(`/api/patients/${id}`, {
      method: "DELETE",
    });

    router.push("/dashboard/patients");
    router.refresh();
  }

  if (!patient) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">

      <div className="mx-auto max-w-6xl space-y-8">

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            <div>

              <h1 className="text-4xl font-bold text-white">
                {patient.fullName}
              </h1>

              <p className="mt-2 text-slate-400">
                Patient Profile
              </p>

            </div>

            <div className="flex gap-3">

              <Link
                href={`/dashboard/patients/${patient.id}/edit`}
                className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Edit
              </Link>

              <button
                onClick={deletePatient}
                className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-400"
              >
                Delete
              </button>

            </div>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <InfoCard
              title="Age"
              value={patient.age.toString()}
            />

            <InfoCard
              title="Gender"
              value={patient.gender}
            />

            <InfoCard
              title="Blood Group"
              value={patient.bloodGroup || "-"}
            />

            <InfoCard
              title="Phone"
              value={patient.phone || "-"}
            />

            <InfoCard
              title="Email"
              value={patient.email || "-"}
            />

            <InfoCard
              title="Address"
              value={patient.address || "-"}
            />

          </div>

        </div>

        <PatientReports patientId={patient.id} />

        <ReportUploadForm patientId={patient.id} />
        <PredictionResult patientId={patient.id} />

      </div>

    </div>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2 className="mt-2 text-lg font-semibold text-white">
        {value}
      </h2>

    </div>
  );
}