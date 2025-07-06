'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Enhanced QueryClient configuration for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache data for 5 minutes before considering it stale
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Keep data in cache for 10 minutes after components unmount
      gcTime: 10 * 60 * 1000, // 10 minutes
      // Smart retry logic
      retry: (failureCount: number, error: any) => {
        // Don't retry on 404 errors
        if (error?.status === 404) return false
        // Don't retry on 401/403 errors (auth issues)
        if (error?.status === 401 || error?.status === 403) return false
        // Retry up to 3 times for other errors
        return failureCount < 3
      },
      // Exponential backoff for retries
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Don't refetch on window focus by default to reduce API calls
      refetchOnWindowFocus: false,
      // Always refetch on reconnect
      refetchOnReconnect: 'always',
      // Prevent refetch on mount if data is fresh
      refetchOnMount: true,
      // Enable background refetch while user is active
      refetchInterval: false,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      // Exponential backoff for mutation retries
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
