import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Pages
import HomePage from '@/pages/HomePage';
import SpreadSelectionPage from '@/pages/SpreadSelectionPage';
import ReadingPage from '@/pages/ReadingPage';

// Components
import Layout from '@/components/Layout';

// Stores
import { useTelegramStore } from '@/store/telegram.store';

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  const { isInitialized } = useTelegramStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/spreads" element={<SpreadSelectionPage />} />
            <Route path="/reading/:spreadId" element={<ReadingPage />} />
          </Routes>
        </Layout>
      </Router>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;