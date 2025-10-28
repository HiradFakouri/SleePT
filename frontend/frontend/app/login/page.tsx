"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#CAA286] font-sans">
      <div className="w-full max-w-md p-8 bg-[#996b63] rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 text-white mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-[#f5d4b9] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-[#f5d4b9] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg bg-blue-600 transition duration-150"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}