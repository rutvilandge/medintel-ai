"use client";

export default function RecentReports({ reports }: any) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-white/10 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Reports
      </h2>

      <div className="space-y-4">
        {reports.map((report: any) => (
          <div
            key={report.id}
            className="border-b border-white/10 pb-3"
          >
            <h3 className="text-white">
              {report.title}
            </h3>

            <p className="text-slate-400">
              {report.patient.fullName}
            </p>

            <p className="text-xs text-slate-500">
              {new Date(
                report.uploadedAt
              ).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}