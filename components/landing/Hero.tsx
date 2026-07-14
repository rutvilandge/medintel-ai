"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  ShieldCheck,
  FileText,
  ScanSearch,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-32 pb-24 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

              <ShieldCheck size={18} />

              Secure AI for Modern Healthcare

            </div>

            <h1 className="text-5xl font-extrabold leading-tight lg:text-7xl">

              AI Clinical

              <span className="block text-cyan-400">

                Intelligence

              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

              Upload medical reports, summarize patient history,
              analyze medical images and receive AI-powered clinical
              insights to support better healthcare decisions.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="/register"
                className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Get Started
              </Link>

              <a
                href="#features"
                className="flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-4 transition hover:border-cyan-500"
              >
                Learn More

                <ArrowRight size={18}/>
              </a>

            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-400" />
                AI Disease Analysis
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-400" />
                Medical Report Summary
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-400" />
                Medical Imaging AI
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-400" />
                Secure Patient Records
              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity:0, x:60 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:1 }}
          >

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">

                    Patient Overview

                  </h2>

                  <p className="text-slate-400">

                    AI Clinical Assistant

                  </p>

                </div>

                <BrainCircuit
                  className="text-cyan-400"
                  size={42}
                />

              </div>

              <div className="mt-8 rounded-xl bg-slate-800 p-5">

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-semibold">

                      Sarah Johnson

                    </h3>

                    <p className="text-sm text-slate-400">

                      Female • 36 Years

                    </p>

                  </div>

                  <span className="rounded-lg bg-green-500/20 px-3 py-1 text-green-400">

                    Stable

                  </span>

                </div>

              </div>

              <div className="mt-6 space-y-4">

                <div className="rounded-xl bg-slate-800 p-5 flex items-center gap-4">

                  <FileText className="text-cyan-400"/>

                  <div>

                    <h3 className="font-semibold">

                      Medical Report

                    </h3>

                    <p className="text-slate-400">

                      AI Summary Generated

                    </p>

                  </div>

                </div>

                <div className="rounded-xl bg-slate-800 p-5 flex items-center gap-4">

                  <ScanSearch className="text-cyan-400"/>

                  <div>

                    <h3 className="font-semibold">

                      Chest X-Ray

                    </h3>

                    <p className="text-slate-400">

                      No Critical Findings

                    </p>

                  </div>

                </div>

                <div className="rounded-xl bg-slate-800 p-5 flex items-center gap-4">

                  <Activity className="text-cyan-400"/>

                  <div>

                    <h3 className="font-semibold">

                      AI Recommendation

                    </h3>

                    <p className="text-slate-400">

                      Follow-up consultation recommended within 7 days.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}