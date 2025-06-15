import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./navbar";

export const metadata: Metadata = {
  title: "THERA ASSISSTANT",
  description: "Health Profile & Chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-black">
          <Navbar />
          <main className="px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
