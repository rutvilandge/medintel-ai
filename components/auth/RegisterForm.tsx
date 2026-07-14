"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Account created successfully!");

      router.push("/login");
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Full Name
        </label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">
          Confirm Password
        </label>

        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-slate-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-cyan-400 font-semibold"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
