"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="mx-auto flex min-h-screen max-w-7xl">

        {/* LEFT */}

        <div className="hidden w-1/2 flex-col justify-center px-16 lg:flex">

          <div className="mb-8 flex items-center gap-4">

            <div className="rounded-2xl bg-cyan-500/10 p-4">
              <BrainCircuit className="h-10 w-10 text-cyan-400" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                MedIntel AI
              </h1>

              <p className="text-slate-400">
                AI Healthcare Platform
              </p>

            </div>

          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Smarter Healthcare.
            <span className="block text-cyan-400">
              Powered by AI.
            </span>
          </h2>

          <p className="mt-8 max-w-lg text-lg leading-8 text-slate-400">
            Upload medical reports, analyze diseases,
            summarize patient history and receive
            AI-powered clinical insights.
          </p>

        </div>

        {/* RIGHT */}

        <div className="flex flex-1 items-center justify-center px-6">

          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">

            <div className="mb-10 text-center">

              <Link
                href="/"
                className="text-cyan-400 font-semibold"
              >
                ← Back to Home
              </Link>

              <h1 className="mt-6 text-4xl font-bold">
                {title}
              </h1>

              <p className="mt-3 text-slate-400">
                {subtitle}
              </p>

            </div>

            {children}

          </div>

        </div>

      </div>

    </div>
  );
}