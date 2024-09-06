"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <header className="py-8 absolute top-0 left-0 right-0">
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/dashboard/add">Add</a>
            </li>
            <li>
              <a href="/dashboard/addMany">Add Many</a>
            </li>
          </ul>
        </header>
        {children}
        <Toaster position="top-right" />
      </>
    </QueryClientProvider>
  );
}
