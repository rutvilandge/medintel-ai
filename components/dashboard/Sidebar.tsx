"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BrainCircuit,
  LayoutDashboard,
  Users,
  FileText,
  Bot,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Users,
    title: "Patients",
    href: "/dashboard/patients",
  },
  {
    icon: FileText,
    title: "Medical Reports",
    href: "/dashboard/reports",
  },
  {
    icon: BrainCircuit,
    title: "Disease Prediction",
    href: "/dashboard/prediction",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    href: "/dashboard/chat",
  },
  {
    icon: Activity,
    title: "Analytics",
    href: "/dashboard/analytics",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-72 lg:flex-col border-r border-white/10 bg-slate-950/80 backdrop-blur-2xl">

      {/* Logo */}

      <div className="border-b border-white/10 p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/20">

            <BrainCircuit className="h-7 w-7 text-white" />

          </div>

          <div>

            <h1 className="bg-gradient-to-r from-cyan-300 via-teal-300 to-white bg-clip-text text-2xl font-bold text-transparent">
              MedIntel AI
            </h1>

            <p className="text-sm text-slate-400">
              Clinical Intelligence
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-3 p-5">

        {menu.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/10 border border-cyan-400/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                size={22}
                className="transition group-hover:scale-110"
              />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Bottom */}

      <div className="border-t border-white/10 p-5 space-y-3">

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-4 rounded-2xl px-5 py-4 text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <Settings size={20} />

          Settings
        </Link>

        <button className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}