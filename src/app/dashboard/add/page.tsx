"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { userSchema } from "@/lib/schemas";

type UserPayload = z.infer<typeof userSchema>;

async function createUser(data: UserPayload) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData);
    throw new Error(errorData.error || "Failed to create user");
  }
  return res.json();
}

export default function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserPayload>({
    resolver: zodResolver(userSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      reset();
      toast.success("User created successfully!");
    },
    onError: (error: any) => {
      setErrorMessage(error.message);
      toast.error("Failed to create user: " + error.message);
    },
  });

  const onSubmit = (data: UserPayload) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-5">Add New User</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="First Name"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            id="age"
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            placeholder="Age"
          />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-600 text-white rounded"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
}
