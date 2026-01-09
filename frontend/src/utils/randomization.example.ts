/**
 * 📖 ПРИМЕРЫ ИСПОЛЬЗОВАНИЯ СИСТЕМЫ РАНДОМИЗАЦИИ
 * 
 * Этот файл содержит примеры использования системы рандомизации
 * для различных сценариев в таро-приложении.
 */

import {
  generateRandomSeed,
  shuffleArray,
  selectRandomItems,
  randomBoolean,
  randomInt,
  randomFloat,
  getEntropyInfo,
} from './randomization';

import {
  shuffleTarotDeck,
  selectCardsForSpread,
  createReading,
  determineCardReversal,
} from './tarot-randomization';

import type { TarotCard, SpreadType } from '@/types';

// ============================================
// ПРИМЕР 1: Базовое использование
// ============================================

export function exampleBasicUsage() {
  // Генерация случайного числа
  const randomNumber = randomInt(1, 100);
  console.log('Случайное число от 1 до 100:', randomNumber);
  
  // Генерация случайного булева значения
  const isTrue = randomBoolean(0.7); // 70% вероятность true
  console.log('Случайное булево значение:', isTrue);
  
  // Генерация seed для воспроизводимости
  const seed = generateRandomSeed();
  console.log('Сгенерированный seed:', seed);
}

// ============================================
// ПРИМЕР 2: Перемешивание массива
// ============================================

export function exampleShuffleArray() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // Перемешиваем массив
  const shuffled = shuffleArray(numbers);
  console.log('Исходный массив:', numbers);
  console.log('Перемешанный массив:', shuffled);
  
  // Исходный массив не изменён (immutability)
  console.log('Исходный массив после перемешивания:', numbers);
}

// ============================================
// ПРИМЕР 3: Выбор случайных элементов
// ============================================

export function exampleSelectRandomItems() {
  const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  // Выбираем 3 случайных элемента
  const selected = selectRandomItems(items, 3);
  console.log('Исходный массив:', items);
  console.log('Выбранные элементы:', selected);
}

// ============================================
// ПРИМЕР 4: Работа с картами таро
// ============================================

export function exampleTarotCards(cards: TarotCard[], spread: SpreadType) {
  // Перемешиваем колоду
  const shuffledDeck = shuffleTarotDeck(cards);
  console.log('Перемешанная колода:', shuffledDeck.length, 'карт');
  
  // Выбираем карты для расклада
  const readingCards = selectCardsForSpread(cards, spread);
  console.log('Выбранные карты для расклада:', readingCards);
  
  // Определяем переворот карты
  const isReversed = determineCardReversal();
  console.log('Карта перевёрнута:', isReversed);
  
  // Создаём полный расклад
  const reading = createReading(cards, spread);
  console.log('Созданный расклад:', reading);
}

// ============================================
// ПРИМЕР 5: Проверка уровня энтропии
// ============================================

export function exampleEntropyCheck() {
  const entropyInfo = getEntropyInfo();
  console.log('Информация об энтропии:', entropyInfo);
  
  if (entropyInfo.entropyLevel === 'high') {
    console.log('✅ Высокий уровень энтропии - "вселенский" рандом доступен!');
  } else if (entropyInfo.entropyLevel === 'medium') {
    console.log('⚠️ Средний уровень энтропии');
  } else {
    console.log('❌ Низкий уровень энтропии');
  }
}

// ============================================
// ПРИМЕР 6: Использование в компоненте React
// ============================================

/*
import { useState } from 'react';
import { createReading } from '@/utils/tarot-randomization';
import { useTarotStore } from '@/store/tarot.store';

function ReadingComponent() {
  const { cards, spreads } = useTarotStore();
  const [reading, setReading] = useState(null);
  
  const handleCreateReading = (spreadId: number) => {
    const spread = spreads.find(s => s.id === spreadId);
    if (!spread || !cards.length) return;
    
    // Создаём расклад с максимальной случайностью
    const result = createReading(cards, spread);
    setReading(result);
  };
  
  return (
    <div>
      <button onClick={() => handleCreateReading(1)}>
        Создать расклад
      </button>
      {reading && (
        <div>
          <p>Создан расклад с {reading.cards.length} картами</p>
          <p>Seed: {reading.seed.seed}</p>
        </div>
      )}
    </div>
  );
}
*/

// ============================================
// ПРИМЕР 7: Кастомная вероятность переворота
// ============================================

export function exampleCustomReversal() {
  // 30% вероятность переворота (вместо стандартных 50%)
  const isReversed = determineCardReversal(0.3);
  console.log('Карта перевёрнута (30% вероятность):', isReversed);
  
  // 80% вероятность переворота
  const isReversedHigh = determineCardReversal(0.8);
  console.log('Карта перевёрнута (80% вероятность):', isReversedHigh);
}

// ============================================
// ПРИМЕР 8: Генерация нескольких seed
// ============================================

export function exampleMultipleSeeds() {
  const seeds = Array.from({ length: 5 }, () => generateRandomSeed());
  console.log('Сгенерированные seeds:', seeds);
  
  // Каждый seed уникален
  const uniqueSeeds = new Set(seeds.map(s => s.seed));
  console.log('Уникальных seeds:', uniqueSeeds.size);
}

// ============================================
// ПРИМЕР 9: Сравнение с Math.random()
// ============================================

export function exampleComparison() {
  // Math.random() - простой генератор
  const mathRandom = Math.floor(Math.random() * 100);
  console.log('Math.random():', mathRandom);
  
  // Наша система - криптографически стойкая
  const secureRandom = randomInt(0, 100);
  console.log('Secure random:', secureRandom);
  
  // Math.random() предсказуем при известном seed
  // Наша система использует множественные источники энтропии
}

// ============================================
// ПРИМЕР 10: Валидация расклада
// ============================================

/*
import { validateReading } from '@/utils/tarot-randomization';

export function exampleValidation(cards: ReadingCard[], spread: SpreadType) {
  const isValid = validateReading(cards, spread);
  
  if (isValid) {
    console.log('✅ Расклад валиден');
  } else {
    console.log('❌ Расклад невалиден');
  }
}
*/

