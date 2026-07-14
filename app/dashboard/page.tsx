import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentReports from "@/components/dashboard/RecentReports";
import PatientTable from "@/components/dashboard/PatientTable";
import QuickActions from "@/components/dashboard/QuickActions";
import AssistantChat from "@/components/assistant/AssistantChat";

import { prisma } from "@/lib/prisma";

import {
  Users,
  FileText,
  BrainCircuit,
} from "lucide-react";

export default async function DashboardPage() {
  const [
    patientCount,
    reportCount,
    analysisCount,
    predictionCount,
    latestPrediction,
    recentReports,
    recentPatients,
  ] = await Promise.all([
    prisma.patient.count(),

    prisma.medicalReport.count(),

    prisma.aIAnalysis.count(),

    prisma.prediction.count(),

    prisma.prediction.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.medicalReport.findMany({
      take: 5,
      orderBy: {
        uploadedAt: "desc",
      },
      include: {
        patient: true,
        analysis: true,
      },
    }),

    prisma.patient.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">

      <div className="mx-auto max-w-7xl space-y-8">

        {/* Welcome */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl shadow-cyan-500/5">

          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="absolute -bottom-20 left-20 h-52 w-52 rounded-full bg-teal-500/10 blur-3xl" />

          <div className="relative">

            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
              AI Powered Healthcare
            </span>

            <h1 className="mt-5 bg-gradient-to-r from-white via-cyan-200 to-teal-300 bg-clip-text text-5xl font-bold text-transparent">
              Welcome Back
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-slate-400">
              Monitor patients, analyze reports using AI, predict diseases,
              and manage your clinical workflow from one intelligent dashboard.
            </p>

          </div>

        </div>

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            title="Patients"
            value={patientCount}
            description="Registered Patients"
            icon={Users}
            href="/dashboard/patients"
          />

          <DashboardCard
            title="Reports"
            value={reportCount}
            description="Uploaded Reports"
            icon={FileText}
            href="/dashboard/reports"
          />

          <DashboardCard
            title="AI Analysis"
            value={analysisCount}
            description="Completed Analyses"
            icon={BrainCircuit}
            href="/dashboard/reports"
          />

          <DashboardCard
            title="AI Predictions"
            value={predictionCount}
            description={
              latestPrediction
                ? `Latest: ${latestPrediction.disease}`
                : "No predictions yet"
            }
            icon={BrainCircuit}
            href="/dashboard/prediction"
          />

        </div>

        {/* Quick Actions */}

        <QuickActions />

        {/* Recent Reports */}

        <RecentReports reports={recentReports} />

        {/* AI Assistant */}

        <AssistantChat />

        {/* Recent Patients */}

        <PatientTable patients={recentPatients} />

      </div>

    </div>
  );
}