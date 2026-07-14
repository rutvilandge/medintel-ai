"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-slate-950 py-28">
      <div className="mx-auto max-w-6xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[36px] border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 p-14 text-center shadow-2xl"
        >

          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
            Get Started Today
          </span>

          <h2 className="mt-8 text-5xl font-bold text-white">
            Experience the Future of
            <span className="block text-cyan-400">
              AI Healthcare
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Create your account and explore AI-powered medical report
            analysis, intelligent diagnosis support, patient management,
            and secure healthcare workflows.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Link
              href="/register"
              className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Create Free Account
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-4 transition hover:border-cyan-500"
            >
              Explore Dashboard
              <ArrowRight size={18} />
            </Link>

          </div>

        </motion.div>

      </div>
    </section>
  );
}