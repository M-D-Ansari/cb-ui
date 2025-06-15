"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    fetch("/api/me", { credentials: "include" }).then((res) => {
      if (res.ok) router.push("/chat");
    });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      console.log("✅ Login successful");
      router.push("/chat");
    } else {
      const { error } = await res.json();
      alert(error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
