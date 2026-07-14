"use client";

import Link from "next/link";
import { BrainCircuit } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          <div>
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-8 w-8 text-cyan-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  MedIntel AI
                </h2>
                <p className="text-sm text-slate-500">
                  AI Healthcare Platform
                </p>
              </div>
            </div>

            <p className="mt-6 text-slate-400 leading-7">
              AI-powered healthcare platform for medical report analysis,
              disease prediction and intelligent clinical support.
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">
              Platform
            </h3>

            <ul className="space-y-3 text-slate-400">
              <li><a href="#features">Features</a></li>
              <li><a href="#modules">AI Modules</a></li>
              <li><a href="#security">Security</a></li>
              <li><Link href="/register">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-400">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/register">Register</Link></li>
              <li><Link href="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">
              Connect
            </h3>

            <div className="space-y-3 text-slate-400">

              <p>
                📧{" "}
                <a href="mailto:rutvilandge@gmail.com">
                  rutvilandge@gmail.com
                </a>
              </p>

              <p>
                🌐{" "}
                <a
                  href="https://github.com/rutvilandge"
                  target="_blank"
                >
                  github.com/rutvilandge
                </a>
              </p>

              <p>
                💼{" "}
                <a
                  href="https://www.linkedin.com/in/rutvi-landge-9988413b0"
                  target="_blank"
                >
                  LinkedIn Profile
                </a>
              </p>

            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-slate-500">
          © 2026 MedIntel AI • Built by <span className="text-white">Rutvi Landge</span>
        </div>

      </div>
    </footer>
  );
}