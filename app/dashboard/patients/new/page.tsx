"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPatientPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    bloodGroup: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      router.push("/dashboard/patients");
      router.refresh();
    } catch (err) {
      alert("Failed to create patient.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">

      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        <h1 className="mb-8 text-3xl font-bold text-white">
          Register Patient
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
            required
          >
            <option value="">Select Gender</option>
            <option className="text-black">Male</option>
            <option className="text-black">Female</option>
            <option className="text-black">Other</option>
          </select>

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
          />

          <input
            name="bloodGroup"
            placeholder="Blood Group"
            value={form.bloodGroup}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white outline-none"
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-4 font-semibold text-white transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Register Patient"}
          </button>
        </form>

      </div>
    </div>
  );
}