"use client";

import {
  Bell,
  Search,
  ChevronDown,
  BrainCircuit,
} from "lucide-react";

export default function Navbar() {
  const currentHour = new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-8 backdrop-blur">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          {greeting}, Rutvi 👋
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Welcome to your AI Healthcare Command Center
        </p>
      </div>

      {/* Center Search */}
      <div className="hidden w-full max-w-xl px-8 lg:block">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 transition focus-within:border-cyan-400">

          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search patients, reports, AI analyses..."
            className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none"
          />

        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="relative rounded-xl border border-slate-800 bg-slate-900 p-3 transition hover:border-cyan-400">

          <Bell
            size={20}
            className="text-slate-300"
          />

          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-cyan-400"></span>

        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-2 transition hover:border-cyan-400">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/10">

            <BrainCircuit
              className="text-cyan-400"
              size={22}
            />

          </div>

          <div className="hidden text-left lg:block">

            <p className="font-semibold text-white">
              Rutvi Landge
            </p>

            <p className="text-xs text-slate-400">
              rutvilandge@gmail.com
            </p>

          </div>

          <ChevronDown
            size={18}
            className="text-slate-400"
          />

        </button>

      </div>
    </header>
  );
}