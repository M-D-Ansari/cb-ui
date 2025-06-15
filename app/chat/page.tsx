"use client";

import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 relative">
      {/* Logout Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow-md transition"
        >
          Logout
        </button>
      </div>

      {/* Chatbot iFrame */}
      <div className="w-full h-screen p-4 pt-16">
        <iframe
          src="https://flask-chatbot-api-qiwt.onrender.com"
          className="w-full h-full border-none rounded-xl shadow-lg"
          title="Chatbot"
        ></iframe>
      </div>
    </div>
  );
}
