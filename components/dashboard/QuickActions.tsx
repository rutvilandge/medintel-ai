"use client";

import Link from "next/link";
import {
  UserPlus,
  Upload,
  BrainCircuit,
  Activity,
} from "lucide-react";

const actions = [
  {
    title: "Add Patient",
    desc: "Register a new patient",
    href: "/dashboard/patients/new",
    icon: UserPlus,
  },
  {
    title: "Upload Report",
    desc: "Upload PDF or X-Ray",
    href: "/dashboard/reports/upload",
    icon: Upload,
  },
  {
    title: "AI Analysis",
    desc: "Analyze a medical report",
    href: "/dashboard/analysis",
    icon: BrainCircuit,
  },
  {
    title: "Disease Prediction",
    desc: "Run ML prediction",
    href: "/dashboard/prediction",
    icon: Activity,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <h2 className="text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <p className="mt-2 text-slate-400">
        Start your workflow with one click.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-2xl border border-slate-800 p-5 transition hover:border-cyan-500 hover:bg-slate-800"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-cyan-500/10 p-3">
                  <Icon className="text-cyan-400" size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {action.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {action.desc}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}