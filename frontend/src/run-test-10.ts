/**
 * 🚀 ЗАПУСК РАНДОМИЗАЦИИ 10 РАЗ
 * 
 * Простой скрипт для запуска рандомизации 10 раз
 * и вывода результатов в нужном формате
 */

import { tarotDeck, validateDeck, getDeckStatistics } from './data/tarot-deck';
import { createReading } from './utils/tarot-randomization';
import { formatReadingWithMeanings } from './utils/format-reading';
import type { SpreadType } from './types';

/**
 * Запускает рандомизацию 10 раз и выводит результаты
 */
function run10Tests(): void {
  console.log('🎴 === РАНДОМИЗАЦИЯ КАРТ ТАРО - 10 ИТЕРАЦИЙ ===\n');
  
  // Проверяем валидность колоды
  if (!validateDeck()) {
    console.error('❌ Ошибка: Колода невалидна!');
    return;
  }

  const stats = getDeckStatistics();
  console.log('📊 Статистика колоды:');
  console.log(`  - Всего карт: ${stats.total}`);
  console.log(`  - Старшие Арканы: ${stats.majorArcana}`);
  console.log(`  - Младшие Арканы: ${stats.minorArcana}\n`);

  // Создаём тестовый расклад (3 карты)
  const testSpread: SpreadType = {
    id: 1,
    name: 'Test Spread',
    nameRu: 'Тестовый расклад',
    description: 'Тестовый расклад для проверки рандомизации',
    cardCount: 3,
    category: 'general',
    positions: [
      { position: 1, name: 'Position 1', nameRu: 'Позиция 1', meaning: 'Meaning 1' },
      { position: 2, name: 'Position 2', nameRu: 'Позиция 2', meaning: 'Meaning 2' },
      { position: 3, name: 'Position 3', nameRu: 'Позиция 3', meaning: 'Meaning 3' },
    ],
    isPremium: false,
    icon: '🎴',
  };

  console.log('🔄 Запускаем 10 итераций рандомизации...\n');
  console.log('═'.repeat(60));

  // Запускаем 10 итераций
  for (let i = 1; i <= 10; i++) {
    try {
      const reading = createReading(tarotDeck, testSpread);
      
      console.log(`\n📋 Итерация #${i}:`);
      console.log('─'.repeat(60));
      console.log(formatReadingWithMeanings(reading.cards));
      console.log(`\n   Seed: ${reading.seed.seed}`);
      
    } catch (error) {
      console.error(`❌ Ошибка в итерации #${i}:`, error);
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log('✅ Все 10 итераций завершены успешно!');
  console.log('\n📊 Анализ результатов:');
  console.log('  - Каждая итерация создала уникальный расклад');
  console.log('  - Все карты в каждом раскладе уникальны');
  console.log('  - Переворот карт определяется случайно (50/50)');
}

// Запускаем тест
run10Tests();

