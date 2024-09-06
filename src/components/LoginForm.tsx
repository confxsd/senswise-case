import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import TextInput from "./UI/TextInput";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
          router.push("/dashboard");
        } else {
          const errorMessage =
            res.status === 401
              ? "Invalid username or password"
              : "An error occurred. Please try again later.";
          toast.error(errorMessage);
          console.error("Failed login:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred. Please try again later.");
      }
    },
    [username, password, router],
  );

  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    [],
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [],
  );

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
        onChange={handleUsernameChange}
      />

      {/* Password Input */}
      <TextInput
        type="password"
        value={password}
        placeholder="Password"
        onChange={handlePasswordChange}
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
