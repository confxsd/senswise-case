"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "./UI/TextInput";
import toast from "react-hot-toast";

const LoginForm = () => {
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
      console.error("Failed login:", res.status, res.statusText);
      if (res.status === 401) {
        toast.error("Invalid username or password");
      } else {
        toast.error("An error occurred. Please try again later.");
      }

      const data = await res.json();
      console.error(data);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center w-full max-w-sm mx-auto my-8 p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl mb-6 font-semibold text-gray-700">Login</h2>

      {/* Username Input */}
      <TextInput
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />

      {/* Password Input */}
      <TextInput
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
