"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  FileText,
  ScanSearch,
  Activity,
  ShieldCheck,
  MessageSquareText,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Diagnosis",
    desc: "Generate AI-assisted differential diagnoses using advanced medical language models.",
  },
  {
    icon: FileText,
    title: "Report Summarization",
    desc: "Instantly summarize lengthy laboratory reports, discharge summaries and prescriptions.",
  },
  {
    icon: ScanSearch,
    title: "Medical Imaging",
    desc: "Review X-rays, MRI and CT scan reports with AI-assisted image interpretation.",
  },
  {
    icon: Activity,
    title: "Patient Timeline",
    desc: "Track consultations, medications, vitals and medical history in one unified timeline.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Data",
    desc: "Built with modern authentication and encrypted storage to protect patient information.",
  },
  {
    icon: MessageSquareText,
    title: "Medical AI Assistant",
    desc: "Ask questions about reports, diseases and treatments with contextual AI responses.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-950 py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
            Platform Features
          </span>

          <h2 className="mt-8 text-5xl font-bold text-white">
            Everything You Need for AI-Powered Healthcare
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            MedIntel AI combines medical report analysis,
            AI diagnosis, imaging support, secure patient
            management and intelligent healthcare assistance
            into one modern platform.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-cyan-500"
              >

                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 transition group-hover:bg-cyan-500">

                  <Icon
                    size={30}
                    className="text-cyan-400 group-hover:text-black"
                  />

                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="leading-7 text-slate-400">
                  {feature.desc}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}