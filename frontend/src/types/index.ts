// Telegram Web App types
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    start_param?: string;
    auth_date?: number;
    hash?: string;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: {
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
  };
  showAlert: (message: string) => void;
  showConfirm: (message: string, callback: (confirmed: boolean) => void) => void;
}

// Tarot domain types
export interface TarotCard {
  id: number;
  name: string;
  nameRu: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
  meanings: {
    upright: string;
    reversed: string;
  };
  keywords: string[];
  element?: string;
  astrology?: string;
  imageUrl: string;
}

export interface SpreadType {
  id: number;
  name: string;
  nameRu: string;
  description: string;
  cardCount: number;
  category: 'daily' | 'love' | 'career' | 'general' | 'advanced';
  positions: SpreadPosition[];
  isPremium: boolean;
  priceStars?: number;
  icon: string;
}

export interface SpreadPosition {
  position: number;
  name: string;
  nameRu: string;
  meaning: string;
  coordinates?: {
    x: number;
    y: number;
    rotation?: number;
  };
}

// Reading types
export interface Reading {
  id: number;
  userId: number;
  spreadTypeId: number;
  cards: ReadingCard[];
  question?: string;
  notes?: string;
  mood?: string;
  tags?: string[];
  createdAt: string;
  isPublic?: boolean;
  shareToken?: string;
  interpretation?: ReadingInterpretation;
}

export interface ReadingCard {
  cardId: number;
  position: number;
  isReversed: boolean;
  card: Pick<TarotCard, 'id' | 'name' | 'nameRu' | 'imageUrl' | 'meanings'>;
}

export interface ReadingInterpretation {
  cards: Array<{
    position: string;
    cardName: string;
    isReversed: boolean;
    meaning: string;
    advice: string;
  }>;
  summary: string;
  advice: string;
}

// UI State types
export interface CardAnimationState {
  isFlipped: boolean;
  isAnimating: boolean;
  isSelected: boolean;
}

export interface ReadingState {
  currentReading: Reading | null;
  isCreating: boolean;
  error: string | null;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

// Form types
export interface CreateReadingForm {
  spreadTypeId: number;
  question?: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Navigation types
export type AppRoutes = '/' | '/spreads' | '/reading/:spreadId' | '/history' | '/profile';