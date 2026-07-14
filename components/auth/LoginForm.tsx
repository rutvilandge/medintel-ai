"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert("Invalid email or password.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Email Address
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="doctor@hospital.com"
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-400">
          <input type="checkbox" />
          Remember me
        </label>

        <Link
          href="/forgot-password"
          className="text-cyan-400 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700" />
        </div>

        <div className="relative flex justify-center text-sm">
          <span className="bg-slate-900 px-3 text-slate-500">
            OR
          </span>
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-xl border border-slate-700 py-3 text-white transition hover:border-cyan-400"
      >
        Continue with Google
      </button>

      <p className="text-center text-slate-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-cyan-400"
        >
          Register
        </Link>
      </p>
    </form>
  );
}