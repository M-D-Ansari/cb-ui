import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        MENTAL HEALTH ASSISTANT CHATBOT
      </h1>

      <div className="flex gap-6 mb-10">
        <Link href="/login">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-lg hover:bg-blue-700 shadow-md transition">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-green-600 text-white px-6 py-2 rounded-xl text-lg hover:bg-green-700 shadow-md transition">
            Signup
          </button>
        </Link>
      </div>

      <div className="text-sm text-gray-700">
        <p className="mb-2 font-semibold">Made by:</p>
        <ul className="mb-4 space-y-1">
          <li>1) Mohammad Danish Ansari</li>
          <li>2) Vasiullah Mullan</li>
          <li>3) Ayyan Shaikh</li>
          <li>4) Gaurav ______</li>
          <li className="mt-3">Students of Theem COE</li>
        </ul>

        <p className="mt-4 text-sm italic">
          Under the guidance of Prof. James Dsouza (Faculty at Theem COE)
        </p>
      </div>
    </main>
  );
}
