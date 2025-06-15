"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Login to your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-black">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="mt-2">
            <Link href="/" className="text-gray-600 hover:underline">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
