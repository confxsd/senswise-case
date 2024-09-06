"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTokenFromClientCookies } from "@/lib/auth-client";
import LoginForm from "@/components/LoginForm";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    getTokenFromClientCookies().then((token) => {
      if (token) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginForm />
    </div>
  );
};

export default Home;
