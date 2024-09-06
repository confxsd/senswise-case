"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      console.log(res.status, res.statusText);
      const data = await res.json();
      console.error(data);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center w-full max-w-sm mx-auto my-8 p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl mb-6 font-semibold text-gray-700">Senswise</h2>
      <input
        type="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-6 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>
      <p className="mt-4 text-sm text-gray-600">
        Dont have an account?{" "}
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}
