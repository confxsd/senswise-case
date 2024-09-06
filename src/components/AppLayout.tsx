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
      {children}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
