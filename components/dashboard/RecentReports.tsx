import Link from "next/link";
import {
  Download,
  FileText,
  User,
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  reportType: string;
  uploadedAt: Date;
  fileUrl: string;

  patient: {
    id: string;
    fullName: string;
  };

  analysis: {
    id: string;
  } | null;
}

export default function RecentReports({
  reports,
}: {
  reports: Report[];
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Reports
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest uploaded reports
          </p>
        </div>

        <Link
          href="/dashboard/reports"
          className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
        >
          View All
        </Link>

      </div>

      {reports.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">

          <FileText
            size={50}
            className="mx-auto text-slate-500"
          />

          <h3 className="mt-4 text-xl text-white">
            No Reports
          </h3>

          <p className="mt-2 text-slate-400">
            Upload your first medical report.
          </p>

        </div>
      ) : (

        <div className="space-y-4">

          {reports.map((report) => (

            <div
              key={report.id}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 p-5"
            >

              <div>

                <h3 className="text-lg font-semibold text-white">
                  {report.title}
                </h3>

                <p className="text-sm text-slate-400">
                  {report.reportType}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">

                  <User size={15} />

                  {report.patient.fullName}

                </div>

                <div className="mt-3">

                  {report.analysis ? (
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                      AI Analyzed
                    </span>
                  ) : (
                    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400">
                      Uploaded
                    </span>
                  )}

                </div>

              </div>

              <div className="flex gap-3">

                <Link
                  href={`/dashboard/patients/${report.patient.id}`}
                  className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
                >
                  Patient
                </Link>

                <a
                  href={report.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  <Download size={16} />
                  Download
                </a>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}