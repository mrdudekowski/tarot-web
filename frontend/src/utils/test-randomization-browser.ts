/**
 * 🌐 ТЕСТ РАНДОМИЗАЦИИ ДЛЯ БРАУЗЕРА
 * 
 * Простой способ протестировать рандомизацию в консоли браузера
 * 
 * Использование:
 * 1. Импортируйте этот файл в компонент React
 * 2. Или используйте в консоли браузера после загрузки модуля
 */

import { tarotDeck, validateDeck, getDeckStatistics } from '@/data/tarot-deck';
import { createReading } from './tarot-randomization';
import { formatReadingSimple, formatReadingDetailed } from './format-reading';
import type { SpreadType } from '@/types';

/**
 * Создаёт простой тестовый расклад
 * 
 * @param cardCount - Количество карт
 * @returns Отформатированный результат
 */
export function testSimpleReading(cardCount: number = 3): string {
  if (!validateDeck()) {
    return '❌ Ошибка: Колода невалидна!';
  }

  const testSpread: SpreadType = {
    id: 1,
    name: 'Test Spread',
    nameRu: 'Тестовый расклад',
    description: 'Тестовый расклад',
    cardCount,
    category: 'general',
    positions: Array.from({ length: cardCount }, (_, i) => ({
      position: i + 1,
      name: `Position ${i + 1}`,
      nameRu: `Позиция ${i + 1}`,
      meaning: `Meaning ${i + 1}`,
    })),
    isPremium: false,
    icon: '🎴',
  };

  try {
    const reading = createReading(tarotDeck, testSpread);
    return formatReadingSimple(reading.cards);
  } catch (error) {
    return `❌ Ошибка: ${error instanceof Error ? error.message : String(error)}`;
  }
}

/**
 * Выводит результат в консоль браузера
 */
export function logTestReading(cardCount: number = 3): void {
  console.log('🎴 === ТЕСТ РАНДОМИЗАЦИИ КАРТ ТАРО ===\n');
  
  const stats = getDeckStatistics();
  console.log('📊 Статистика колоды:', stats);
  console.log('\n');
  
  const result = testSimpleReading(cardCount);
  console.log('Результат расклада:');
  console.log(result);
  
  console.log('\n✅ Тест завершён!');
}

/**
 * Выводит подробный результат в консоль
 */
export function logDetailedReading(cardCount: number = 3): void {
  if (!validateDeck()) {
    console.error('❌ Ошибка: Колода невалидна!');
    return;
  }

  const testSpread: SpreadType = {
    id: 1,
    name: 'Test Spread',
    nameRu: 'Тестовый расклад',
    description: 'Тестовый расклад',
    cardCount,
    category: 'general',
    positions: Array.from({ length: cardCount }, (_, i) => ({
      position: i + 1,
      name: `Position ${i + 1}`,
      nameRu: `Позиция ${i + 1}`,
      meaning: `Meaning ${i + 1}`,
    })),
    isPremium: false,
    icon: '🎴',
  };

  try {
    const reading = createReading(tarotDeck, testSpread);
    
    console.log('🎴 === ПОДРОБНЫЙ РАСКЛАД ===\n');
    console.log(formatReadingDetailed(reading.cards));
    console.log('\n🔑 Seed:', reading.seed.seed);
    console.log('⏰ Время:', new Date(reading.timestamp).toLocaleString('ru-RU'));
  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
}

// Экспортируем для использования в консоли браузера
if (typeof window !== 'undefined') {
  (window as any).testTarotReading = logTestReading;
  (window as any).testTarotReadingDetailed = logDetailedReading;
  (window as any).testTarotSimple = testSimpleReading;
}

