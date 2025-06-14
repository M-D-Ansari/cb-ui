"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [habit, setHabit] = useState("");
  const [status, setStatus] = useState("");

  const submitHabit = async () => {
    if (!habit) return;

    const res = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ habit }),
    });

    if (res.ok) {
      setStatus("Habit saved!");
      setHabit("");
    } else {
      setStatus("Error saving habit.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Habits</h1>

      <div className="flex gap-2">
        <input
          type="text"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Enter new habit"
        />
        <button
          onClick={submitHabit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      {status && <p className="mt-2 text-green-600">{status}</p>}
    </div>
  );
}
