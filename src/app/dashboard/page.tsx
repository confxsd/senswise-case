"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";

async function fetchUsers(page: number, age?: number) {
  const query = new URLSearchParams({ page: String(page) });
  if (age) {
    query.append("age", String(age));
  }

  const res = await fetch(`/api/users?${query}`);
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );
  const [age, setAge] = useState<number | undefined>(
    searchParams.get("age") ? Number(searchParams.get("age")) : undefined,
  );

  const { data, error, isLoading }: any = useQuery(
    ["users", page, age],
    () => fetchUsers(page, age),
    {
      keepPreviousData: true,
    },
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const query = new URLSearchParams({ page: String(newPage) });
    if (age) {
      query.append("age", String(age));
    }
    router.push(`/dashboard?${query}`);
  };

  const handleAgeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ageValue = e.target.value ? Number(e.target.value) : undefined;
    setAge(ageValue);
    const query = new URLSearchParams({ page: "1" });
    if (ageValue) {
      query.append("age", String(ageValue));
    }
    router.push(`/dashboard?${query}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-[600px] m-auto mt-24">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Age Filter */}
      <div className="mb-4">
        <label
          htmlFor="ageFilter"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by Age:
        </label>
        <input
          id="ageFilter"
          type="number"
          value={age || ""}
          onChange={handleAgeFilter}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          placeholder="Enter age to filter"
        />
      </div>

      {/* User List */}
      <ul className="mb-4">
        {data.users.map((user: any) => (
          <li key={user.id} className="p-2 border-b">
            {user.firstName} {user.lastName}, Age: {user.age}, Email:{" "}
            {user.email}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={data.users.length < data.pageSize}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
