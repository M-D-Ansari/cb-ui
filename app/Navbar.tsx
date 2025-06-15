"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/me", { credentials: "include" }).then((res) => {
      setLoggedIn(res.ok);
    });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-5 font-semibold">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {loggedIn && (
          <>
            <Link href="/chat" className="hover:underline">
              Chat
            </Link>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
          </>
        )}
      </div>

      <div>
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
