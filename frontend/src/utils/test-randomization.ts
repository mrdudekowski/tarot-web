/**
 * 🧪 ТЕСТ РАНДОМИЗАЦИИ КАРТ ТАРО
 * 
 * Тестирует алгоритм рандомизации на JSON данных
 * Выводит результаты в формате: Card ID, Положение
 * 
 * @module utils/test-randomization
 */

import { tarotDeck, validateDeck, getDeckStatistics } from '@/data/tarot-deck';
import { createReading, selectCardsForSpread } from './tarot-randomization';
import type { SpreadType } from '@/types';

/**
 * Форматирует результат расклада для вывода
 * 
 * @param cards - Массив карт расклада
 * @returns Отформатированная строка с результатами
 */
export function formatReadingOutput(cards: Array<{ cardId: number; isReversed: boolean }>): string {
  const lines = cards.map(card => {
    const position = card.isReversed ? 'перевёрнутое' : 'вертикальное';
    return `Card ID: ${card.cardId} | Положение: ${position}`;
  });
  
  return lines.join('\n');
}

/**
 * Тестирует рандомизацию на полной колоде
 * 
 * @param cardCount - Количество карт для расклада (по умолчанию 3)
 * @returns Отформатированный результат
 */
export function testRandomization(cardCount: number = 3): string {
  // Проверяем валидность колоды
  if (!validateDeck()) {
    return '❌ Ошибка: Колода невалидна!';
  }

  const stats = getDeckStatistics();
  console.log('📊 Статистика колоды:', stats);

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

    // Форматируем вывод
    const output = formatReadingOutput(reading.cards);

    return `
✅ Рандомизация успешна!

📊 Статистика колоды:
- Всего карт: ${stats.total}
- Старшие Арканы: ${stats.majorArcana}
- Младшие Арканы: ${stats.minorArcana}

🎴 Результат расклада (${cardCount} карт):
${output}

🔑 Seed: ${reading.seed.seed}
⏰ Время: ${new Date(reading.timestamp).toLocaleString('ru-RU')}
`;
  } catch (error) {
    return `❌ Ошибка при создании расклада: ${error instanceof Error ? error.message : String(error)}`;
  }
}

/**
 * Тестирует несколько раскладов подряд
 * 
 * @param iterations - Количество итераций
 * @param cardCount - Количество карт в каждом раскладе
 * @returns Отформатированный результат
 */
export function testMultipleReadings(iterations: number = 5, cardCount: number = 3): string {
  const results: string[] = [];
  
  for (let i = 1; i <= iterations; i++) {
    results.push(`\n--- Расклад #${i} ---`);
    const reading = createReading(tarotDeck, {
      id: i,
      name: `Test ${i}`,
      nameRu: `Тест ${i}`,
      description: '',
      cardCount,
      category: 'general',
      positions: Array.from({ length: cardCount }, (_, j) => ({
        position: j + 1,
        name: `Pos ${j + 1}`,
        nameRu: `Поз ${j + 1}`,
        meaning: '',
      })),
      isPremium: false,
      icon: '🎴',
    });
    
    results.push(formatReadingOutput(reading.cards));
  }
  
  return results.join('\n');
}

/**
 * Проверяет уникальность карт в раскладе
 * 
 * @param cardCount - Количество карт для проверки
 * @param iterations - Количество итераций
 * @returns Результат проверки
 */
export function testUniqueness(cardCount: number = 3, iterations: number = 100): string {
  const allSelectedCards: number[] = [];
  let duplicateCount = 0;
  
  for (let i = 0; i < iterations; i++) {
    const reading = createReading(tarotDeck, {
      id: i,
      name: 'Test',
      nameRu: 'Тест',
      description: '',
      cardCount,
      category: 'general',
      positions: Array.from({ length: cardCount }, (_, j) => ({
        position: j + 1,
        name: `Pos ${j + 1}`,
        nameRu: `Поз ${j + 1}`,
        meaning: '',
      })),
      isPremium: false,
      icon: '🎴',
    });
    
    const cardIds = reading.cards.map(c => c.cardId);
    const uniqueIds = new Set(cardIds);
    
    // Проверяем уникальность внутри расклада
    if (uniqueIds.size !== cardIds.length) {
      duplicateCount++;
    }
    
    allSelectedCards.push(...cardIds);
  }
  
  const allUnique = new Set(allSelectedCards);
  const totalCards = allSelectedCards.length;
  const uniqueCards = allUnique.size;
  
  return `
📊 Тест уникальности (${iterations} итераций по ${cardCount} карт):

✅ Уникальность внутри расклада:
- Раскладов с дубликатами: ${duplicateCount} / ${iterations}
- Процент успешных: ${((iterations - duplicateCount) / iterations * 100).toFixed(2)}%

📈 Распределение карт:
- Всего выбрано карт: ${totalCards}
- Уникальных карт: ${uniqueCards}
- Покрытие колоды: ${(uniqueCards / 78 * 100).toFixed(2)}%
`;
}

/**
 * Выполняет все тесты
 * 
 * @returns Полный отчёт о тестировании
 */
export function runAllTests(): string {
  const results: string[] = [];
  
  results.push('🧪 === ТЕСТИРОВАНИЕ РАНДОМИЗАЦИИ КАРТ ТАРО ===\n');
  
  // Тест 1: Базовый тест
  results.push('📋 Тест 1: Базовый расклад (3 карты)');
  results.push(testRandomization(3));
  results.push('\n');
  
  // Тест 2: Большой расклад
  results.push('📋 Тест 2: Большой расклад (10 карт)');
  results.push(testRandomization(10));
  results.push('\n');
  
  // Тест 3: Несколько раскладов
  results.push('📋 Тест 3: Несколько раскладов подряд');
  results.push(testMultipleReadings(5, 3));
  results.push('\n');
  
  // Тест 4: Проверка уникальности
  results.push('📋 Тест 4: Проверка уникальности');
  results.push(testUniqueness(3, 100));
  
  return results.join('\n');
}

