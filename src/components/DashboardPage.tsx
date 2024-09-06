"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import UserManagement from "@/components/UserManagement";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
};

type FetchUsersResponse = {
  users: User[];
  pageSize: number;
};

async function fetchUsers(
  page: number,
  age?: number,
): Promise<FetchUsersResponse> {
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

  const pageFromQuery = useMemo(
    () => Number(searchParams.get("page")) || 1,
    [searchParams],
  );
  const ageFromQuery = useMemo(
    () =>
      searchParams.get("age") ? Number(searchParams.get("age")) : undefined,
    [searchParams],
  );

  const [page, setPage] = useState<number>(pageFromQuery);
  const [age, setAge] = useState<number | undefined>(ageFromQuery);

  const { data, error, isLoading }: any = useQuery<FetchUsersResponse>(
    ["users", page, age],
    () => fetchUsers(page, age),
    {
      keepPreviousData: true,
    },
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      const query = new URLSearchParams({ page: String(newPage) });
      if (age) {
        query.append("age", String(age));
      }
      router.push(`/dashboard?${query}`);
    },
    [age, router],
  );

  const handleAgeFilter = useCallback(
    (ageValue?: number) => {
      setAge(ageValue);
      const query = new URLSearchParams({ page: "1" });
      if (ageValue) {
        query.append("age", String(ageValue));
      }
      router.push(`/dashboard?${query}`);
    },
    [router],
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex justify-center mt-12 items-center">
      <div className="w-[900px] h-fit mx-auto p-6 mt-10">
        <UserManagement
          users={data?.users || []}
          page={page}
          age={age}
          pageSize={data?.pageSize || 0}
          onPageChange={handlePageChange}
          onFilterChange={handleAgeFilter}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
