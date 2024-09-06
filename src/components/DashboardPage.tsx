"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";
import UserManagement from "@/components/UserManagement";

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

const DashboardPage = () => {
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

  const handleAgeFilter = (ageValue?: number) => {
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
    <div className="flex justify-center mt-12 items-center">
      <div className="w-[900px] h-fit mx-auto p-6 mt-10">
        <UserManagement
          users={data.users}
          page={page}
          age={age}
          pageSize={data.pageSize}
          onPageChange={handlePageChange}
          onFilterChange={handleAgeFilter}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
