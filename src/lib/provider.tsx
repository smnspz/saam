"use client";

import React from "react";
import { getQueryClient } from "./query";
import { QueryClientProvider } from "@tanstack/react-query";

export function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
