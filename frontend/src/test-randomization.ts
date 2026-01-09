/**
 * 🧪 ТЕСТ РАНДОМИЗАЦИИ - ЗАПУСК
 * 
 * Простой скрипт для тестирования рандомизации карт таро
 * 
 * Запуск:
 * - В браузере: импортируйте и вызовите функции
 * - В консоли: используйте функции из test-randomization-browser.ts
 */

import { tarotDeck, validateDeck, getDeckStatistics } from './data/tarot-deck';
import { createReading } from './utils/tarot-randomization';
import { formatReadingWithMeanings, formatReadingDetailed } from './utils/format-reading';
import type { SpreadType } from './types';

/**
 * Простой тест - создаёт расклад и выводит результат
 */
function simpleTest(cardCount: number = 3): void {
  console.log('🎴 === ТЕСТ РАНДОМИЗАЦИИ КАРТ ТАРО ===\n');
  
  // Проверяем валидность колоды
  if (!validateDeck()) {
    console.error('❌ Ошибка: Колода невалидна!');
    return;
  }

  const stats = getDeckStatistics();
  console.log('📊 Статистика колоды:');
  console.log(`  - Всего карт: ${stats.total}`);
  console.log(`  - Старшие Арканы: ${stats.majorArcana}`);
  console.log(`  - Младшие Арканы: ${stats.minorArcana}`);
  console.log(`  - Жезлы: ${stats.wands}, Кубки: ${stats.cups}, Мечи: ${stats.swords}, Пентакли: ${stats.pentacles}\n`);

  // Создаём тестовый расклад
  const testSpread: SpreadType = {
    id: 1,
    name: 'Test Spread',
    nameRu: 'Тестовый расклад',
    description: 'Тестовый расклад для проверки рандомизации',
    cardCount,
    category: 'general',
    positions: Array.from({ length: cardCount }, (_, i) => ({
      position: i + 1,
      name: `Position ${i + 1}`,
      nameRu: `Позиция ${i + 1}`,
      meaning: `Meaning for position ${i + 1}`,
    })),
    isPremium: false,
    icon: '🎴',
  };

  try {
    // Создаём расклад
    const reading = createReading(tarotDeck, testSpread);

    console.log(`✅ Расклад создан успешно (${cardCount} карт)\n`);
    console.log('📋 Результат с названиями и пояснениями:');
    console.log('─'.repeat(50));
    console.log(formatReadingWithMeanings(reading.cards));
    console.log('─'.repeat(50));
    
    console.log('\n📊 Дополнительная информация:');
    console.log(`  - Seed: ${reading.seed.seed}`);
    console.log(`  - Время: ${new Date(reading.timestamp).toLocaleString('ru-RU')}`);
    
    console.log('\n📝 Подробная информация:');
    console.log(formatReadingDetailed(reading.cards));
    
    console.log('\n✅ Тест завершён успешно!');
  } catch (error) {
    console.error('❌ Ошибка при создании расклада:', error);
  }
}

/**
 * Тест нескольких раскладов
 */
function multipleTest(iterations: number = 5, cardCount: number = 3): void {
  console.log(`🎴 === ТЕСТ ${iterations} РАСКЛАДОВ ===\n`);
  
  const testSpread: SpreadType = {
    id: 1,
    name: 'Test Spread',
    nameRu: 'Тестовый расклад',
    description: '',
    cardCount,
    category: 'general',
    positions: Array.from({ length: cardCount }, (_, i) => ({
      position: i + 1,
      name: `Pos ${i + 1}`,
      nameRu: `Поз ${i + 1}`,
      meaning: '',
    })),
    isPremium: false,
    icon: '🎴',
  };

  for (let i = 1; i <= iterations; i++) {
    console.log(`\n--- Расклад #${i} ---`);
    const reading = createReading(tarotDeck, testSpread);
    console.log(formatReadingWithMeanings(reading.cards));
  }
  
  console.log('\n✅ Все расклады созданы!');
}

// Если файл запускается напрямую
if (typeof window === 'undefined') {
  // Node.js окружение
  simpleTest(3);
  console.log('\n\n');
  multipleTest(3, 3);
} else {
  // Браузерное окружение - экспортируем функции
  (window as any).testTarotSimple = () => simpleTest(3);
  (window as any).testTarotMultiple = (iterations: number, cardCount: number) => 
    multipleTest(iterations, cardCount);
}

export { simpleTest, multipleTest };

