'use client';
import AuthProvider from '@/context/auth';
import UserProvider from '@/context/user';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function Providers({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default Providers
