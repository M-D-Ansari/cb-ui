"use client";

export default function ChatPage() {
  return (
    <div className="w-full h-screen p-4">
      <iframe
        src="https://flask-chatbot-api-qiwt.onrender.com"
        className="w-full h-full border-none"
        title="Chatbot"
      ></iframe>
    </div>
  );
}
