"use client";

import Link from "next/link";
import { BrainCircuit, Sparkles, ArrowRight } from "lucide-react";

export default function AIChat() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">

      <div className="flex items-center gap-3">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
          <BrainCircuit
            size={28}
            className="text-cyan-400"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            MedIntel AI
          </h2>

          <p className="text-sm text-slate-400">
            Your AI Clinical Assistant
          </p>
        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-slate-700 p-8">

        <div className="flex items-center gap-2 text-cyan-400">

          <Sparkles size={18} />

          <span className="font-medium">
            AI Ready
          </span>

        </div>

        <h3 className="mt-5 text-xl font-bold text-white">
          Start Your First AI Analysis
        </h3>

        <p className="mt-3 leading-7 text-slate-400">
          Upload a medical report to unlock AI-powered summaries,
          disease risk predictions, clinical recommendations,
          and interactive report analysis.
        </p>

        <div className="mt-8 space-y-3">

          <div className="rounded-xl bg-slate-800 px-4 py-3 text-sm text-slate-300">
            ✓ Medical Report Summarization
          </div>

          <div className="rounded-xl bg-slate-800 px-4 py-3 text-sm text-slate-300">
            ✓ Disease Risk Prediction
          </div>

          <div className="rounded-xl bg-slate-800 px-4 py-3 text-sm text-slate-300">
            ✓ Clinical Recommendations
          </div>

          <div className="rounded-xl bg-slate-800 px-4 py-3 text-sm text-slate-300">
            ✓ Chat with Medical Reports
          </div>

        </div>

        <Link
          href="/dashboard/reports/upload"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Upload First Report

          <ArrowRight size={18} />
        </Link>

      </div>

    </div>
  );
}