"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPatientPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    bloodGroup: "",
    address: "",
  });

  useEffect(() => {
    fetchPatient();
  }, []);

  async function fetchPatient() {
    const res = await fetch(`/api/patients/${id}`);
    const data = await res.json();

    setForm({
      fullName: data.fullName || "",
      age: data.age?.toString() || "",
      gender: data.gender || "",
      phone: data.phone || "",
      email: data.email || "",
      bloodGroup: data.bloodGroup || "",
      address: data.address || "",
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    await fetch(`/api/patients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        age: Number(form.age),
      }),
    });

    setLoading(false);

    router.push(`/dashboard/patients/${id}`);
    router.refresh();
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">

      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

        <h1 className="text-4xl font-bold text-white">
          Edit Patient
        </h1>

        <p className="mt-2 text-slate-400">
          Update patient information.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />

          <Input
            label="Age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
          />

          <div>

            <label className="mb-2 block text-slate-300">
              Gender
            </label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-white"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

          </div>

          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            label="Blood Group"
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
          />

          <Input
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Patient"}
          </button>

        </form>

      </div>

    </div>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-slate-300">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none"
      />

    </div>
  );
}