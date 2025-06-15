import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const { jwtVerify } = await import("jose");
const secret = new TextEncoder().encode(JWT_SECRET);

type ProfileInput = {
  Sleep: string;
  Relationship_Status: string;
  Family_Background: string;
  Physical_Exercise: string;
  Diet_Quality: "Unhealthy" | "Average" | "Healthy";
  Smoking_Habit: "Heavy Smoker" | "Regular Smoker" | "Occasional Smoker" | "Non-Smoker";
  Alcohol_Consumption: "Heavy Drinker" | "Regular Drinker" | "Social Drinker" | "Non-Drinker";
  Medication_Usage: "Yes" | "No";
  Stress_Level: "Low" | "Medium" | "High";
};

async function getUserFromToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload?.email as string;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  const email = await getUserFromToken(req);
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = (await req.json()) as ProfileInput;

  const mappedData = {
    ...data,
    Diet_Quality: { Unhealthy: 1, Average: 2, Healthy: 3 }[data.Diet_Quality],
    Smoking_Habit: {
      "Heavy Smoker": 1,
      "Regular Smoker": 2,
      "Occasional Smoker": 3,
      "Non-Smoker": 4,
    }[data.Smoking_Habit],
    Alcohol_Consumption: {
      "Heavy Drinker": 1,
      "Regular Drinker": 2,
      "Social Drinker": 3,
      "Non-Drinker": 4,
    }[data.Alcohol_Consumption],
    Medication_Usage: { No: 1, Yes: 2 }[data.Medication_Usage],
    Stress_Level: { Low: 1, Medium: 2, High: 3 }[data.Stress_Level],
    email,
  };

  const collection = mongoose.connection.collection("profiles");
  await collection.updateOne({ email }, { $set: mappedData }, { upsert: true });

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  await connectDB();
  const email = await getUserFromToken(req);
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const collection = mongoose.connection.collection("profiles");
  const existing = await collection.findOne({ email });

  return NextResponse.json({ data: existing });
}
