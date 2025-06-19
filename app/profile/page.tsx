"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    Sleep: "",
    Relationship_Status: "",
    Family_Background: "",
    Physical_Exercise: "",
    Diet_Quality: "",
    Smoking_Habit: "",
    Alcohol_Consumption: "",
    Medication_Usage: "",
    Stress_Level: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/profile", { credentials: "include" });
      if (res.ok) {
        const { data } = await res.json();
        if (Object.keys(data).length > 0) {
          setForm({
            name: data.name || "",
            age: data.age || "",
            gender: data.gender || "",
            Sleep: data.Sleep || "",
            Relationship_Status: data.Relationship_Status || "",
            Family_Background: data.Family_Background || "",
            Physical_Exercise: data.Physical_Exercise || "",
            Diet_Quality: ["Unhealthy", "Average", "Healthy"][data.Diet_Quality - 1] || "",
            Smoking_Habit: ["Heavy Smoker", "Regular Smoker", "Occasional Smoker", "Non-Smoker"][data.Smoking_Habit - 1] || "",
            Alcohol_Consumption: ["Heavy Drinker", "Regular Drinker", "Social Drinker", "Non-Drinker"][data.Alcohol_Consumption - 1] || "",
            Medication_Usage: data.Medication_Usage === 2 ? "Yes" : "No",
            Stress_Level: ["Low", "Medium", "High"][data.Stress_Level - 1] || "",
          });
          setIsUpdating(true);
        }
      }
    }
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("✅ Profile saved!");
    } else {
      alert("❌ Failed to save.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          {isUpdating ? "Update Profile" : "Complete Your Profile"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          {/* Name, Age, Gender */}
          {[
            { label: "Name", name: "name" },
            { label: "Age", name: "age" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block mb-1 font-medium">{label}</label>
              <input
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 font-medium">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Remaining Fields */}
          {[
            { label: "Sleep", name: "Sleep" },
            { label: "Relationship Status", name: "Relationship_Status" },
            { label: "Family Background", name: "Family_Background" },
            { label: "Physical Exercise", name: "Physical_Exercise" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block mb-1 font-medium">{label}</label>
              <input
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}

          {[
            {
              label: "Diet Quality",
              name: "Diet_Quality",
              options: ["Unhealthy", "Average", "Healthy"],
            },
            {
              label: "Smoking Habit",
              name: "Smoking_Habit",
              options: ["Heavy Smoker", "Regular Smoker", "Occasional Smoker", "Non-Smoker"],
            },
            {
              label: "Alcohol Consumption",
              name: "Alcohol_Consumption",
              options: ["Heavy Drinker", "Regular Drinker", "Social Drinker", "Non-Drinker"],
            },
            {
              label: "Medication Usage",
              name: "Medication_Usage",
              options: ["No", "Yes"],
            },
            {
              label: "Stress Level",
              name: "Stress_Level",
              options: ["Low", "Medium", "High"],
            },
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label className="block mb-1 font-medium">{label}</label>
              <select
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {isUpdating ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
