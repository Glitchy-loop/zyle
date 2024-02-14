"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})
export const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
