"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Database,
  KeyRound,
} from "lucide-react";

const security = [
  {
    icon: Lock,
    title: "Encrypted Storage",
    desc: "All patient reports are encrypted before storage using modern security standards.",
  },
  {
    icon: Database,
    title: "Protected Data",
    desc: "Only authorized medical staff can access sensitive healthcare information.",
  },
  {
    icon: KeyRound,
    title: "Secure Authentication",
    desc: "Modern authentication protects user accounts from unauthorized access.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    desc: "Designed following healthcare privacy best practices and secure architecture.",
  },
];

export default function Security() {
  return (
    <section
      id="security"
      className="bg-slate-950 py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-400">
              Security
            </span>

            <h2 className="mt-8 text-5xl font-bold leading-tight text-white">
              Built with
              <span className="block text-cyan-400">
                Security in Mind
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Healthcare data deserves the highest level of protection.
              MedIntel AI is engineered with secure authentication,
              encrypted storage and privacy-first architecture.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4 text-slate-300">
                <ShieldCheck className="h-6 w-6 flex-shrink-0 text-cyan-400" />
                <span>End-to-end encrypted medical reports</span>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <ShieldCheck className="h-6 w-6 flex-shrink-0 text-cyan-400" />
                <span>Role-based secure access</span>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <ShieldCheck className="h-6 w-6 flex-shrink-0 text-cyan-400" />
                <span>Protected authentication system</span>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <ShieldCheck className="h-6 w-6 flex-shrink-0 text-cyan-400" />
                <span>Audit-ready healthcare architecture</span>
              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2"
          >

            {security.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-cyan-500"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/10">
                    <Icon className="h-7 w-7 text-cyan-400" />
                  </div>

                  <h3 className="mb-4 text-2xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="leading-7 text-slate-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}

          </motion.div>

        </div>

      </div>
    </section>
  );
}