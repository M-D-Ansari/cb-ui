import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", req.url)); // ✅ use req.url as base

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
