import { create } from 'zustand';
import { TelegramWebApp, TelegramUser } from '@/types';

interface TelegramState {
  // Telegram Web App instance
  webApp: TelegramWebApp | null;

  // User data
  user: TelegramUser | null;

  // Initialization state
  isInitialized: boolean;
  isLoading: boolean;

  // UI state
  isExpanded: boolean;
  mainButtonVisible: boolean;
  backButtonVisible: boolean;

  // Actions
  initialize: () => Promise<void>;
  expand: () => void;
  showMainButton: (text: string, onClick: () => void) => void;
  hideMainButton: () => void;
  showBackButton: (onClick: () => void) => void;
  hideBackButton: () => void;
  vibrate: (style: 'light' | 'medium' | 'heavy') => void;
  showAlert: (message: string) => void;
  showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
  close: () => void;
}

export const useTelegramStore = create<TelegramState>((set, get) => ({
  // Initial state
  webApp: null,
  user: null,
  isInitialized: false,
  isLoading: false,
  isExpanded: false,
  mainButtonVisible: false,
  backButtonVisible: false,

  // Initialize Telegram Web App
  initialize: async () => {
    set({ isLoading: true });

    try {
      // Check if running in Telegram
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp as TelegramWebApp;

        // Initialize WebApp
        webApp.ready();
        webApp.expand();

        // Get user data
        const user = webApp.initDataUnsafe?.user || null;

        set({
          webApp,
          user,
          isInitialized: true,
          isExpanded: true,
          isLoading: false,
        });

        console.log('✅ Telegram Web App initialized', { user });
      } else {
        // Development mode - mock data
        console.log('ℹ️ Running outside Telegram - using mock data');

        const mockWebApp: TelegramWebApp = {
          initData: '',
          initDataUnsafe: {
            user: {
              id: 123456789,
              first_name: 'Test',
              last_name: 'User',
              username: 'testuser',
            },
          },
          ready: () => console.log('Mock: ready()'),
          expand: () => console.log('Mock: expand()'),
          close: () => console.log('Mock: close()'),
          MainButton: {
            setText: (text) => console.log('Mock MainButton text:', text),
            show: () => set({ mainButtonVisible: true }),
            hide: () => set({ mainButtonVisible: false }),
            onClick: () => {},
          },
          BackButton: {
            show: () => set({ backButtonVisible: true }),
            hide: () => set({ backButtonVisible: false }),
            onClick: () => {},
          },
          HapticFeedback: {
            impactOccurred: (style) => console.log('Mock haptic:', style),
            notificationOccurred: (type) => console.log('Mock notification:', type),
          },
          showAlert: (message) => alert(`Mock Alert: ${message}`),
          showConfirm: (message, callback) => {
            const confirmed = confirm(`Mock Confirm: ${message}`);
            callback(confirmed);
          },
        };

        set({
          webApp: mockWebApp,
          user: mockWebApp.initDataUnsafe.user,
          isInitialized: true,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('❌ Failed to initialize Telegram Web App:', error);
      set({ isLoading: false });
    }
  },

  // UI actions
  expand: () => {
    const { webApp } = get();
    webApp?.expand();
    set({ isExpanded: true });
  },

  showMainButton: (text: string, onClick: () => void) => {
    const { webApp } = get();
    if (webApp) {
      webApp.MainButton.setText(text);
      webApp.MainButton.show();
      webApp.MainButton.onClick(onClick);
      set({ mainButtonVisible: true });
    }
  },

  hideMainButton: () => {
    const { webApp } = get();
    webApp?.MainButton.hide();
    set({ mainButtonVisible: false });
  },

  showBackButton: (onClick: () => void) => {
    const { webApp } = get();
    if (webApp) {
      webApp.BackButton.show();
      webApp.BackButton.onClick(onClick);
      set({ backButtonVisible: true });
    }
  },

  hideBackButton: () => {
    const { webApp } = get();
    webApp?.BackButton.hide();
    set({ backButtonVisible: false });
  },

  vibrate: (style: 'light' | 'medium' | 'heavy') => {
    const { webApp } = get();
    webApp?.HapticFeedback.impactOccurred(style);
  },

  showAlert: (message: string) => {
    const { webApp } = get();
    webApp?.showAlert(message);
  },

  showConfirm: (message: string, callback: (confirmed: boolean) => void) => {
    const { webApp } = get();
    webApp?.showConfirm(message, callback);
  },

  close: () => {
    const { webApp } = get();
    webApp?.close();
  },
}));