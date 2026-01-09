/**
 * 🎲 СИСТЕМА РАНДОМИЗАЦИИ - ВСЕЛЕНСКИЙ УРОВЕНЬ РАНДОМА
 * 
 * Комбинированная система рандомизации с использованием:
 * - Crypto.getRandomValues() - криптографически стойкий источник
 * - Дополнительные источники энтропии (время, системная информация)
 * - Fisher-Yates shuffle для честного перемешивания
 * 
 * @module utils/randomization
 */

/**
 * Источники энтропии для максимальной случайности
 */
export interface EntropySources {
  crypto: Uint32Array;
  performance: number;
  timestamp: number;
  mathRandom: number;
  systemHash: number;
}

/**
 * Результат генерации случайности
 */
export interface RandomSeed {
  seed: number;
  timestamp: number;
  entropy: EntropySources;
}

/**
 * Генерирует криптографически стойкое случайное число в диапазоне [min, max)
 * 
 * @param min - Минимальное значение (включительно)
 * @param max - Максимальное значение (исключительно)
 * @returns Случайное целое число
 */
function secureRandomInt(min: number, max: number): number {
  if (min >= max) {
    throw new Error('min must be less than max');
  }

  const range = max - min;
  const randomBytes = new Uint32Array(1);
  
  crypto.getRandomValues(randomBytes);
  
  // Используем модуль для получения значения в диапазоне
  // Uint32 может быть очень большим, поэтому используем безопасный способ
  const randomValue = randomBytes[0];
  
  // Для больших диапазонов используем деление с остатком
  if (range <= 0xFFFFFFFF) {
    return min + (randomValue % range);
  }
  
  // Для очень больших диапазонов используем более сложный алгоритм
  const maxValid = Math.floor(0xFFFFFFFF / range) * range;
  let value = randomValue;
  
  while (value >= maxValid) {
    crypto.getRandomValues(randomBytes);
    value = randomBytes[0];
  }
  
  return min + (value % range);
}

/**
 * Генерирует криптографически стойкое случайное число с плавающей точкой [0, 1)
 * 
 * @returns Случайное число от 0 до 1
 */
function secureRandomFloat(): number {
  const randomBytes = new Uint32Array(1);
  crypto.getRandomValues(randomBytes);
  
  // Преобразуем Uint32 в число от 0 до 1
  return randomBytes[0] / 0xFFFFFFFF;
}

/**
 * Собирает энтропию из различных источников
 * 
 * @returns Объект с различными источниками энтропии
 */
function collectEntropy(): EntropySources {
  // 1. Криптографический источник (основной)
  const cryptoBytes = new Uint32Array(4);
  crypto.getRandomValues(cryptoBytes);
  
  // 2. Performance.now() - микросекунды выполнения (если доступно)
  const perfNow = typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now() + Math.random();
  
  // 3. Date.now() - миллисекунды
  const timestamp = Date.now();
  
  // 4. Math.random() - дополнительная энтропия
  const mathRandom = Math.random();
  
  // 5. Системная информация (хеш user agent и других параметров)
  const systemInfo = typeof window !== 'undefined' && typeof navigator !== 'undefined'
    ? [
        navigator.userAgent || '',
        navigator.language || '',
        typeof screen !== 'undefined' ? screen.width : 0,
        typeof screen !== 'undefined' ? screen.height : 0,
        typeof window !== 'undefined' ? window.innerWidth : 0,
        typeof window !== 'undefined' ? window.innerHeight : 0,
      ].join('|')
    : `nodejs-${process.pid}-${Date.now()}`;
  
  // Простой хеш строки
  let systemHash = 0;
  for (let i = 0; i < systemInfo.length; i++) {
    const char = systemInfo.charCodeAt(i);
    systemHash = ((systemHash << 5) - systemHash) + char;
    systemHash = systemHash & systemHash; // Преобразуем в 32-битное число
  }
  
  return {
    crypto: cryptoBytes,
    performance: perfNow,
    timestamp,
    mathRandom,
    systemHash: Math.abs(systemHash),
  };
}

/**
 * Смешивает различные источники энтропии в единый seed
 * 
 * @param entropy - Источники энтропии
 * @returns Смешанный seed
 */
function mixEntropy(entropy: EntropySources): number {
  // XOR операция между различными источниками
  let seed = 0;
  
  // Криптографические байты
  for (let i = 0; i < entropy.crypto.length; i++) {
    seed ^= entropy.crypto[i];
    seed = (seed << 1) | (seed >>> 31); // Циклический сдвиг
  }
  
  // Performance timing
  const perfInt = Math.floor(entropy.performance * 1000) % 0xFFFFFFFF;
  seed ^= perfInt;
  seed = (seed << 1) | (seed >>> 31);
  
  // Timestamp
  seed ^= entropy.timestamp;
  seed = (seed << 1) | (seed >>> 31);
  
  // Math.random (преобразуем в целое)
  const mathInt = Math.floor(entropy.mathRandom * 0xFFFFFFFF);
  seed ^= mathInt;
  seed = (seed << 1) | (seed >>> 31);
  
  // System hash
  seed ^= entropy.systemHash;
  
  // Финальное смешивание
  seed = seed >>> 0; // Преобразуем в беззнаковое 32-битное число
  
  return seed;
}

/**
 * Генерирует случайный seed с максимальной энтропией
 * 
 * @returns Объект с seed и метаданными
 */
export function generateRandomSeed(): RandomSeed {
  const entropy = collectEntropy();
  const seed = mixEntropy(entropy);
  
  return {
    seed,
    timestamp: entropy.timestamp,
    entropy,
  };
}

/**
 * Перемешивает массив используя алгоритм Fisher-Yates с криптографически стойким генератором
 * 
 * @param array - Массив для перемешивания
 * @returns Новый перемешанный массив (исходный не изменяется)
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  // Создаём копию массива (immutability)
  const shuffled = [...array];
  
  // Fisher-Yates shuffle с криптографически стойким генератором
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = secureRandomInt(0, i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Выбирает случайные элементы из массива без повторений
 * 
 * @param array - Массив для выбора
 * @param count - Количество элементов для выбора
 * @returns Массив выбранных элементов
 */
export function selectRandomItems<T>(array: readonly T[], count: number): T[] {
  if (count > array.length) {
    throw new Error('count cannot be greater than array length');
  }
  
  if (count < 0) {
    throw new Error('count cannot be negative');
  }
  
  // Создаём копию и перемешиваем
  const shuffled = shuffleArray(array);
  
  // Возвращаем первые count элементов
  return shuffled.slice(0, count);
}

/**
 * Генерирует случайное булево значение с заданной вероятностью
 * 
 * @param probability - Вероятность true (0-1), по умолчанию 0.5
 * @returns Случайное булево значение
 */
export function randomBoolean(probability: number = 0.5): boolean {
  if (probability < 0 || probability > 1) {
    throw new Error('probability must be between 0 and 1');
  }
  
  return secureRandomFloat() < probability;
}

/**
 * Генерирует случайное число в диапазоне [min, max)
 * 
 * @param min - Минимальное значение (включительно)
 * @param max - Максимальное значение (исключительно)
 * @returns Случайное число
 */
export function randomInt(min: number, max: number): number {
  return secureRandomInt(min, max);
}

/**
 * Генерирует случайное число с плавающей точкой в диапазоне [min, max)
 * 
 * @param min - Минимальное значение (включительно)
 * @param max - Максимальное значение (исключительно)
 * @returns Случайное число
 */
export function randomFloat(min: number, max: number): number {
  if (min >= max) {
    throw new Error('min must be less than max');
  }
  
  return min + secureRandomFloat() * (max - min);
}

/**
 * Проверяет доступность Crypto API
 * 
 * @returns true если Crypto API доступен
 */
export function isCryptoAvailable(): boolean {
  return typeof crypto !== 'undefined' && 
         typeof crypto.getRandomValues === 'function';
}

/**
 * Получает информацию об уровне энтропии
 * 
 * @returns Объект с информацией об энтропии
 */
export function getEntropyInfo(): {
  cryptoAvailable: boolean;
  entropyLevel: 'high' | 'medium' | 'low';
  sources: string[];
} {
  const cryptoAvailable = isCryptoAvailable();
  const sources: string[] = [];
  
  if (cryptoAvailable) {
    sources.push('Crypto.getRandomValues()');
  }
  
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    sources.push('Performance.now()');
  } else if (typeof process !== 'undefined') {
    sources.push('Node.js process');
  }
  
  sources.push('Date.now()');
  sources.push('System information');
  
  let entropyLevel: 'high' | 'medium' | 'low' = 'low';
  
  if (cryptoAvailable && typeof performance !== 'undefined') {
    entropyLevel = 'high';
  } else if (cryptoAvailable || typeof performance !== 'undefined') {
    entropyLevel = 'medium';
  }
  
  return {
    cryptoAvailable,
    entropyLevel,
    sources,
  };
}

