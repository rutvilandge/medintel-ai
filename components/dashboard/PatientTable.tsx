import Link from "next/link";
import { Users, UserPlus } from "lucide-react";

interface Patient {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  phone?: string | null;
  bloodGroup?: string | null;
}

export default function PatientTable({
  patients,
}: {
  patients: Patient[];
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Patients
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Recently registered patients.
          </p>
        </div>

        <Link
          href="/dashboard/patients/new"
          className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
        >
          Add Patient
        </Link>

      </div>

      {patients.length === 0 ? (

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-16">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10">

            <Users
              size={40}
              className="text-cyan-400"
            />

          </div>

          <h3 className="mt-6 text-xl font-semibold text-white">
            No patients found
          </h3>

          <p className="mt-2 max-w-md text-center text-slate-400">
            Register your first patient to start managing medical reports,
            AI analyses and disease predictions.
          </p>

          <Link
            href="/dashboard/patients/new"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            <UserPlus size={18} />
            Add Patient
          </Link>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-800 text-left text-slate-400">

                <th className="pb-3">Name</th>
                <th className="pb-3">Age</th>
                <th className="pb-3">Gender</th>
                <th className="pb-3">Blood Group</th>
                <th className="pb-3">Action</th>

              </tr>

            </thead>

            <tbody>

              {patients.map((patient) => (

                <tr
                  key={patient.id}
                  className="border-b border-slate-800/50"
                >

                  <td className="py-4 text-white">
                    {patient.fullName}
                  </td>

                  <td className="py-4 text-slate-300">
                    {patient.age}
                  </td>

                  <td className="py-4 text-slate-300">
                    {patient.gender}
                  </td>

                  <td className="py-4 text-slate-300">
                    {patient.bloodGroup ?? "-"}
                  </td>

                  <td className="py-4">

                    <Link
                      href={`/dashboard/patients/${patient.id}`}
                      className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}