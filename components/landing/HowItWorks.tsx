"use client";

import { motion } from "framer-motion";
import {
  Upload,
  BrainCircuit,
  FileCheck,
  Stethoscope,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Reports",
    desc: "Securely upload medical reports, prescriptions, laboratory results or imaging files.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    desc: "Our AI extracts key medical information and identifies clinically relevant insights.",
  },
  {
    icon: FileCheck,
    title: "Generate Summary",
    desc: "Receive structured summaries, disease predictions and recommended follow-up actions.",
  },
  {
    icon: Stethoscope,
    title: "Clinical Decision",
    desc: "Doctors review AI-generated insights to support faster and more informed decisions.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-950 py-28">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
            Workflow
          </span>

          <h2 className="mt-8 text-5xl font-bold text-white">
            How MedIntel AI Works
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            From uploading a report to receiving AI-powered clinical
            insights in just a few simple steps.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="relative rounded-3xl border border-slate-800 bg-slate-900 p-8"
              >

                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">

                  <Icon
                    className="text-cyan-400"
                    size={30}
                  />

                </div>

                <div className="mb-4 text-sm font-bold text-cyan-400">
                  STEP {index + 1}
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="leading-7 text-slate-400">
                  {step.desc}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}