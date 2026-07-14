"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Search, User } from "lucide-react";

interface Patient {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  phone?: string;
  email?: string;
  bloodGroup?: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const res = await fetch("/api/patients");
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-white">
              Patients
            </h1>

            <p className="mt-2 text-slate-400">
              Manage all registered patients.
            </p>
          </div>

          <Link
            href="/dashboard/patients/new"
            className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-medium text-white transition hover:bg-cyan-400"
          >
            <Plus size={18} />
            Add Patient
          </Link>

        </div>

        {/* Search */}

        <div className="mb-8 flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">

          <Search className="mr-3 text-slate-400" />

          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
          />

        </div>

        {/* Patient Cards */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filtered.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">

              <User
                size={50}
                className="mx-auto mb-4 text-slate-500"
              />

              <h2 className="text-xl font-semibold text-white">
                No Patients Found
              </h2>

              <p className="mt-2 text-slate-400">
                Add your first patient to begin.
              </p>

            </div>
          ) : (
            filtered.map((patient) => (
              <Link
                key={patient.id}
                href={`/dashboard/patients/${patient.id}`}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-xl font-semibold text-white">
                      {patient.fullName}
                    </h2>

                    <p className="mt-1 text-slate-400">
                      {patient.gender} • {patient.age} years
                    </p>

                  </div>

                </div>

                <div className="mt-6 space-y-2 text-sm">

                  <p className="text-slate-300">
                    📞 {patient.phone || "-"}
                  </p>

                  <p className="text-slate-300">
                    ✉️ {patient.email || "-"}
                  </p>

                  <p className="text-slate-300">
                    🩸 {patient.bloodGroup || "-"}
                  </p>

                </div>

              </Link>
            ))
          )}

        </div>

      </div>
    </div>
  );
}