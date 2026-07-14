"use client";

import Link from "next/link";
import { BrainCircuit, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#workflow" },
    { name: "AI Modules", href: "#modules" },
    { name: "Security", href: "#security" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-800"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="flex items-center gap-3 text-xl font-bold text-white"
        >
          <BrainCircuit className="h-8 w-8 text-cyan-400" />
          MedIntel AI
        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-slate-300">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="transition hover:text-cyan-400"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-slate-300 hover:text-white transition"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950 lg:hidden">
          <div className="flex flex-col gap-5 p-6">

            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-slate-300"
              >
                {link.name}
              </a>
            ))}

            <Link href="/login">Sign In</Link>

            <Link
              href="/register"
              className="rounded-xl bg-cyan-500 px-5 py-3 text-center font-semibold text-black"
            >
              Get Started
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}