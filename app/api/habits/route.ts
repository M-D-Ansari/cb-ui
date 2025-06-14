import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  const body = await req.json();
  const { habit } = body;

  if (!habit) return NextResponse.json({ error: "No habit provided" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db("theem_db"); // your DB name
  const habits = db.collection("habits");

  await habits.insertOne({ habit, createdAt: new Date() });

  return NextResponse.json({ success: true });
}
