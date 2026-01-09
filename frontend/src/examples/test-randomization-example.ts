/**
 * 📖 ПРИМЕР ИСПОЛЬЗОВАНИЯ РАНДОМИЗАЦИИ
 * 
 * Этот файл демонстрирует, как использовать систему рандомизации
 * с JSON данными карт таро
 * 
 * Запуск: импортируйте и вызовите функции в консоли браузера или в компоненте React
 */

import { tarotDeck, validateDeck, getDeckStatistics } from '@/data/tarot-deck';
import { createReading } from '@/utils/tarot-randomization';
import { formatReadingSimple, formatReadingDetailed } from '@/utils/format-reading';
import type { SpreadType } from '@/types';

/**
 * Пример 1: Простой расклад (3 карты)
 */
export function example1_SimpleReading(): void {
  console.log('📖 Пример 1: Простой расклад (3 карты)\n');
  
  // Проверяем колоду
  if (!validateDeck()) {
    console.error('❌ Колода невалидна!');
    return;
  }

  // Создаём тестовый расклад
  const spread: SpreadType = {
    id: 1,
    name: 'Three Card Spread',
    nameRu: 'Расклад на три карты',
    description: 'Простой расклад на три карты',
    cardCount: 3,
    category: 'general',
    positions: [
      { position: 1, name: 'Past', nameRu: 'Прошлое', meaning: 'Прошлое' },
      { position: 2, name: 'Present', nameRu: 'Настоящее', meaning: 'Настоящее' },
      { position: 3, name: 'Future', nameRu: 'Будущее', meaning: 'Будущее' },
    ],
    isPremium: false,
    icon: '🎴',
  };

  // Создаём расклад
  const reading = createReading(tarotDeck, spread);

  // Выводим результат в нужном формате
  console.log('Результат расклада:');
  console.log('─'.repeat(50));
  console.log(formatReadingSimple(reading.cards));
  console.log('─'.repeat(50));
}

/**
 * Пример 2: Расклад с подробной информацией
 */
export function example2_DetailedReading(): void {
  console.log('📖 Пример 2: Расклад с подробной информацией\n');
  
  const spread: SpreadType = {
    id: 2,
    name: 'Celtic Cross',
    nameRu: 'Кельтский крест',
    description: 'Классический расклад на 10 карт',
    cardCount: 10,
    category: 'advanced',
    positions: Array.from({ length: 10 }, (_, i) => ({
      position: i + 1,
      name: `Position ${i + 1}`,
      nameRu: `Позиция ${i + 1}`,
      meaning: `Meaning ${i + 1}`,
    })),
    isPremium: false,
    icon: '🎴',
  };

  const reading = createReading(tarotDeck, spread);

  console.log('Подробный результат:');
  console.log(formatReadingDetailed(reading.cards));
}

/**
 * Пример 3: Несколько раскладов подряд
 */
export function example3_MultipleReadings(): void {
  console.log('📖 Пример 3: Несколько раскладов подряд\n');
  
  const spread: SpreadType = {
    id: 3,
    name: 'Daily Spread',
    nameRu: 'Ежедневный расклад',
    description: 'Расклад на день',
    cardCount: 1,
    category: 'daily',
    positions: [
      { position: 1, name: 'Card of the Day', nameRu: 'Карта дня', meaning: 'Карта дня' },
    ],
    isPremium: false,
    icon: '🎴',
  };

  console.log('Создаём 5 раскладов подряд:\n');
  
  for (let i = 1; i <= 5; i++) {
    const reading = createReading(tarotDeck, spread);
    console.log(`Расклад #${i}:`);
    console.log(formatReadingSimple(reading.cards));
    console.log('');
  }
}

/**
 * Пример 4: Проверка статистики
 */
export function example4_Statistics(): void {
  console.log('📖 Пример 4: Статистика колоды\n');
  
  const stats = getDeckStatistics();
  
  console.log('📊 Статистика колоды:');
  console.log(`  Всего карт: ${stats.total}`);
  console.log(`  Старшие Арканы: ${stats.majorArcana}`);
  console.log(`  Младшие Арканы: ${stats.minorArcana}`);
  console.log(`  Жезлы: ${stats.wands}`);
  console.log(`  Кубки: ${stats.cups}`);
  console.log(`  Мечи: ${stats.swords}`);
  console.log(`  Пентакли: ${stats.pentacles}`);
  
  // Проверяем валидность
  const isValid = validateDeck();
  console.log(`\n✅ Колода валидна: ${isValid ? 'Да' : 'Нет'}`);
}

/**
 * Пример 5: Полный пример с выводом в нужном формате
 */
export function example5_FullExample(): void {
  console.log('📖 Пример 5: Полный пример\n');
  
  // Статистика
  example4_Statistics();
  console.log('\n');
  
  // Простой расклад
  example1_SimpleReading();
  console.log('\n');
  
  // Несколько раскладов
  example3_MultipleReadings();
}

// Экспортируем для использования
export default {
  example1_SimpleReading,
  example2_DetailedReading,
  example3_MultipleReadings,
  example4_Statistics,
  example5_FullExample,
};

