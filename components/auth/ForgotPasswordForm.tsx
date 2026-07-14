"use client";

import Link from "next/link";

export default function ForgotPasswordForm() {
  return (
    <form className="space-y-6">

      <div>

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email Address
        </label>

        <input
          type="email"
          placeholder="doctor@hospital.com"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
        />

      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Send Reset Link
      </button>

      <p className="text-center text-slate-400">

        Remember your password?{" "}

        <Link
          href="/login"
          className="font-semibold text-cyan-400"
        >
          Sign In
        </Link>

      </p>

    </form>
  );
}