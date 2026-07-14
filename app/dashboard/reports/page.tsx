import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ReportsPage() {
  const reports = await prisma.medicalReport.findMany({
    include: {
      patient: true,
    },
    orderBy: {
      uploadedAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">
            Medical Reports
          </h1>

          <Link
            href="/dashboard"
            className="rounded-lg bg-cyan-600 px-4 py-2 hover:bg-cyan-700"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="p-4 text-left">Patient</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Hospital</th>
                <th className="p-4 text-left">Doctor</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-t border-slate-800"
                >
                  <td className="p-4">
                    {report.patient.fullName}
                  </td>

                  <td className="p-4">
                    {report.title}
                  </td>

                  <td className="p-4">
                    {report.reportType}
                  </td>

                  <td className="p-4">
                    {report.hospital || "-"}
                  </td>

                  <td className="p-4">
                    {report.doctorName || "-"}
                  </td>

                  <td className="p-4">
                    {new Date(report.uploadedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {reports.length === 0 && (
            <div className="p-10 text-center text-slate-400">
              No reports uploaded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}