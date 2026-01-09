import { create } from 'zustand';
import { TarotCard, SpreadType, Reading } from '@/types';
import { apiService } from '@/services/api';

interface TarotState {
  // Data
  cards: TarotCard[];
  spreads: SpreadType[];
  userReadings: Reading[];
  currentReading: Reading | null;

  // Loading states
  isLoadingCards: boolean;
  isLoadingSpreads: boolean;
  isLoadingReadings: boolean;
  isCreatingReading: boolean;

  // Errors
  cardsError: string | null;
  spreadsError: string | null;
  readingsError: string | null;
  createReadingError: string | null;

  // Actions
  fetchCards: () => Promise<void>;
  fetchSpreads: () => Promise<void>;
  fetchUserReadings: () => Promise<void>;
  createReading: (spreadTypeId: number, question?: string) => Promise<Reading | null>;
  setCurrentReading: (reading: Reading | null) => void;
  clearErrors: () => void;
}

export const useTarotStore = create<TarotState>((set, get) => ({
  // Initial state
  cards: [],
  spreads: [],
  userReadings: [],
  currentReading: null,

  isLoadingCards: false,
  isLoadingSpreads: false,
  isLoadingReadings: false,
  isCreatingReading: false,

  cardsError: null,
  spreadsError: null,
  readingsError: null,
  createReadingError: null,

  // Fetch all cards
  fetchCards: async () => {
    set({ isLoadingCards: true, cardsError: null });

    try {
      const cards = await apiService.getAllCards();
      set({ cards, isLoadingCards: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load cards';
      set({ cardsError: errorMessage, isLoadingCards: false });
      console.error('Failed to fetch cards:', error);
    }
  },

  // Fetch all spreads
  fetchSpreads: async () => {
    set({ isLoadingSpreads: true, spreadsError: null });

    try {
      const spreads = await apiService.getAllSpreads();
      set({ spreads, isLoadingSpreads: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load spreads';
      set({ spreadsError: errorMessage, isLoadingSpreads: false });
      console.error('Failed to fetch spreads:', error);
    }
  },

  // Fetch user readings
  fetchUserReadings: async () => {
    set({ isLoadingReadings: true, readingsError: null });

    try {
      const userReadings = await apiService.getUserReadings();
      set({ userReadings, isLoadingReadings: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load readings';
      set({ readingsError: errorMessage, isLoadingReadings: false });
      console.error('Failed to fetch readings:', error);
    }
  },

  // Create new reading
  createReading: async (spreadTypeId: number, question?: string) => {
    set({ isCreatingReading: true, createReadingError: null });

    try {
      const newReading = await apiService.createReading(spreadTypeId, question);

      // Add to user readings
      const { userReadings } = get();
      set({
        userReadings: [newReading, ...userReadings],
        currentReading: newReading,
        isCreatingReading: false
      });

      return newReading;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create reading';
      set({ createReadingError: errorMessage, isCreatingReading: false });
      console.error('Failed to create reading:', error);
      return null;
    }
  },

  // Set current reading
  setCurrentReading: (reading: Reading | null) => {
    set({ currentReading: reading });
  },

  // Clear all errors
  clearErrors: () => {
    set({
      cardsError: null,
      spreadsError: null,
      readingsError: null,
      createReadingError: null,
    });
  },
}));