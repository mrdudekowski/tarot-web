import { useEffect } from 'react';
import { useTelegramStore } from '@/store/telegram.store';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { initialize, isInitialized } = useTelegramStore();

  // Initialize Telegram Web App on mount
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Telegram Web App styles */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Telegram-specific styles */
        .telegram-web-app {
          background: transparent;
        }

        /* Safe area for mobile devices */
        @supports (padding: max(0px)) {
          .safe-top {
            padding-top: max(env(safe-area-inset-top), 1rem);
          }
          .safe-bottom {
            padding-bottom: max(env(safe-area-inset-bottom), 1rem);
          }
        }
      `}</style>

      {/* Main content */}
      <main className="safe-top safe-bottom">
        {children}
      </main>

      {/* Loading overlay for initialization */}
      {!isInitialized && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg">Инициализация...</p>
            <p className="text-sm opacity-70 mt-2">Подключение к Telegram</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;