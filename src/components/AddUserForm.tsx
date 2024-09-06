"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useState, useCallback } from "react";
import { z } from "zod";
import { userSchema } from "@/lib/schemas";
import TextInput from "@/components/UI/TextInput";

type UserPayload = z.infer<typeof userSchema>;

async function createUser(data: UserPayload) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create user");
  }
  return res.json();
}

const AddUserForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserPayload>({
    resolver: zodResolver(userSchema),
  });

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

  const onSubmit = useCallback(
    (data: UserPayload) => {
      mutation.mutate(data);
    },
    [mutation],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-fit items-center w-full max-w-sm mx-auto my-8 p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl mb-6 font-semibold text-gray-700">
        Add New User
      </h2>

      {/* First Name Input */}
      <TextInput
        type="text"
        placeholder="First Name"
        error={errors.firstName?.message}
        {...register("firstName")}
      />

      {/* Last Name Input */}
      <TextInput
        type="text"
        placeholder="Last Name"
        error={errors.lastName?.message}
        {...register("lastName")}
      />

      {/* Email Input */}
      <TextInput
        type="email"
        placeholder="Email"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Password Input */}
      <TextInput
        type="password"
        placeholder="Password"
        error={errors.password?.message}
        {...register("password")}
      />

      {/* Age Input */}
      <TextInput
        type="number"
        placeholder="Age"
        error={errors.age?.message}
        {...register("age", { valueAsNumber: true })}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Adding..." : "Add User"}
      </button>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </form>
  );
};

export default AddUserForm;
