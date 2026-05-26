"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { SocketProvider } from "@/websocket/providers/SocketProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false }
  }
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <SocketProvider>
        <div className="min-h-screen bg-cyber-dark pl-72 flex">
          <Sidebar />
          <main className="flex-1 p-10 overflow-y-auto max-w-[1600px] mx-auto">
            {children}
          </main>
        </div>
      </SocketProvider>
    </QueryClientProvider>
  );
}
