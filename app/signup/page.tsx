"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const { error } = await res.json();
      alert(error || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          required
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
