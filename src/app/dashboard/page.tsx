"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const DashboardPage = dynamic(() => import("@/components/DashboardPage"), {
  ssr: false,
  loading: () => <p>Loading..</p>,
});

const Dashboard = () => {
  return (
    <Suspense fallback={<p>Loading..</p>}>
      <DashboardPage />
    </Suspense>
  );
};

export default Dashboard;
