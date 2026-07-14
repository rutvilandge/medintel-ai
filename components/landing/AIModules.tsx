"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  ScanSearch,
  FileText,
  MessageSquareText,
  Activity,
  ShieldCheck,
  Pill,
  HeartPulse,
} from "lucide-react";

const modules = [
  {
    icon: BrainCircuit,
    title: "Disease Prediction",
    desc: "AI-assisted differential diagnosis from symptoms and reports.",
  },
  {
    icon: FileText,
    title: "Medical Report AI",
    desc: "Summarize laboratory reports and discharge summaries instantly.",
  },
  {
    icon: ScanSearch,
    title: "Medical Imaging",
    desc: "Analyze X-rays, MRI and CT scan reports with AI support.",
  },
  {
    icon: MessageSquareText,
    title: "Medical Chat",
    desc: "Ask questions about reports and receive contextual AI answers.",
  },
  {
    icon: Activity,
    title: "Patient Timeline",
    desc: "View medical history, medications and consultations together.",
  },
  {
    icon: Pill,
    title: "Medication Review",
    desc: "Identify interactions and generate medication summaries.",
  },
  {
    icon: HeartPulse,
    title: "Risk Assessment",
    desc: "Predict potential health risks from uploaded patient data.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Records",
    desc: "Encrypted storage with authentication and role-based access.",
  },
];

export default function AIModules() {
  return (
    <section id="modules" className="bg-slate-900 py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20 text-center">
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
            AI Modules
          </span>

          <h2 className="mt-8 text-5xl font-bold text-white">
            Everything Inside MedIntel AI
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            A complete suite of AI-powered tools designed to assist
            healthcare professionals throughout the clinical workflow.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="rounded-3xl border border-slate-800 bg-slate-950 p-8 hover:border-cyan-500 transition"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
                  <Icon className="text-cyan-400" size={30} />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  {module.title}
                </h3>

                <p className="leading-7 text-slate-400">
                  {module.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}