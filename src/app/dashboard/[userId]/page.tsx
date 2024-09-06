"use client";

import React, { useEffect, useState, useCallback } from "react";
import UserDetails from "@/components/UserDetails";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

interface UserDetailPageProps {
  params: {
    userId: string;
  };
}

const UserDetailPage: React.FC<UserDetailPageProps> = ({ params }) => {
  const { userId } = params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await res.json();
      setUser(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="flex justify-center mt-24 items-center">
      <UserDetails user={user} />
    </div>
  );
};

export default UserDetailPage;
