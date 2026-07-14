"use client";

import {
  Users,
  FileText,
  Brain,
  Activity,
} from "lucide-react";

export default function StatsCards({ stats }: any) {
  const cards = [
    {
      title: "Patients",
      value: stats.patients,
      icon: Users,
      color: "bg-cyan-500",
    },
    {
      title: "Reports",
      value: stats.reports,
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      title: "AI Analysis",
      value: stats.analyses,
      icon: Brain,
      color: "bg-green-500",
    },
    {
      title: "Predictions",
      value: stats.predictions,
      icon: Activity,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl bg-slate-900 p-6 border border-white/10"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}
          >
            <card.icon className="text-white" />
          </div>

          <h3 className="mt-5 text-slate-400">
            {card.title}
          </h3>

          <p className="text-3xl font-bold text-white">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}