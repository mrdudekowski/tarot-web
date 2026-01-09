/**
 * 🎴 УТИЛИТЫ ДЛЯ РАНДОМИЗАЦИИ КАРТ ТАРО
 * 
 * Использует систему "вселенского" рандома для:
 * - Перемешивания колоды
 * - Выбора карт для расклада
 * - Определения переворота карт
 * 
 * @module utils/tarot-randomization
 */

import { TarotCard, ReadingCard, SpreadType } from '@/types';
import {
  shuffleArray,
  selectRandomItems,
  randomBoolean,
  generateRandomSeed,
  type RandomSeed,
} from './randomization';

/**
 * Результат создания расклада
 */
export interface ReadingResult {
  cards: ReadingCard[];
  seed: RandomSeed;
  timestamp: number;
}

/**
 * Перемешивает колоду карт таро с максимальной случайностью
 * 
 * @param cards - Колода карт таро
 * @returns Перемешанная колода (новая, исходная не изменяется)
 */
export function shuffleTarotDeck(cards: readonly TarotCard[]): TarotCard[] {
  return shuffleArray(cards);
}

/**
 * Выбирает карты для расклада с определением их позиций и переворотов
 * 
 * @param cards - Полная колода карт таро
 * @param spread - Тип расклада
 * @returns Массив выбранных карт с позициями и переворотами
 */
export function selectCardsForSpread(
  cards: readonly TarotCard[],
  spread: SpreadType
): ReadingCard[] {
  if (cards.length < spread.cardCount) {
    throw new Error(`Not enough cards in deck. Need ${spread.cardCount}, have ${cards.length}`);
  }
  
  // Перемешиваем колоду
  const shuffledDeck = shuffleTarotDeck(cards);
  
  // Выбираем нужное количество карт
  const selectedCards = selectRandomItems(shuffledDeck, spread.cardCount);
  
  // Создаём карты для расклада с позициями и переворотами
  const readingCards: ReadingCard[] = selectedCards.map((card, index) => {
    // Определяем переворот карты (50/50 вероятность)
    const isReversed = randomBoolean(0.5);
    
    // Получаем позицию из spread или используем индекс
    const position = spread.positions[index]?.position ?? index + 1;
    
    return {
      cardId: card.id,
      position,
      isReversed,
      card: {
        id: card.id,
        name: card.name,
        nameRu: card.nameRu,
        imageUrl: card.imageUrl,
        meanings: card.meanings,
      },
    };
  });
  
  return readingCards;
}

/**
 * Создаёт полный расклад с метаданными
 * 
 * @param cards - Полная колода карт таро
 * @param spread - Тип расклада
 * @returns Результат создания расклада
 */
export function createReading(
  cards: readonly TarotCard[],
  spread: SpreadType
): ReadingResult {
  const seed = generateRandomSeed();
  const readingCards = selectCardsForSpread(cards, spread);
  
  return {
    cards: readingCards,
    seed,
    timestamp: Date.now(),
  };
}

/**
 * Воспроизводит расклад по сохранённому seed
 * (для будущей функциональности истории)
 * 
 * @param cards - Полная колода карт таро
 * @param spread - Тип расклада
 * @param seed - Сохранённый seed
 * @returns Результат создания расклада
 */
export function recreateReading(
  cards: readonly TarotCard[],
  spread: SpreadType,
  seed: RandomSeed
): ReadingResult {
  // TODO: Реализовать воспроизведение по seed
  // Пока используем обычное создание
  return createReading(cards, spread);
}

/**
 * Определяет переворот карты с заданной вероятностью
 * 
 * @param probability - Вероятность переворота (0-1), по умолчанию 0.5
 * @returns true если карта перевёрнута
 */
export function determineCardReversal(probability: number = 0.5): boolean {
  return randomBoolean(probability);
}

/**
 * Проверяет валидность расклада
 * 
 * @param cards - Выбранные карты
 * @param spread - Тип расклада
 * @returns true если расклад валиден
 */
export function validateReading(
  cards: ReadingCard[],
  spread: SpreadType
): boolean {
  // Проверяем количество карт
  if (cards.length !== spread.cardCount) {
    return false;
  }
  
  // Проверяем уникальность карт
  const cardIds = cards.map(c => c.cardId);
  const uniqueIds = new Set(cardIds);
  
  if (uniqueIds.size !== cardIds.length) {
    return false;
  }
  
  // Проверяем позиции
  const positions = cards.map(c => c.position);
  const expectedPositions = spread.positions.map(p => p.position);
  
  // Позиции должны совпадать (порядок может быть разным)
  const sortedPositions = [...positions].sort((a, b) => a - b);
  const sortedExpected = [...expectedPositions].sort((a, b) => a - b);
  
  return JSON.stringify(sortedPositions) === JSON.stringify(sortedExpected);
}

