/**
 * 📝 ФОРМАТИРОВАНИЕ РЕЗУЛЬТАТОВ РАСКЛАДА
 * 
 * Утилиты для форматирования результатов расклада
 * в читаемый формат с Card ID и положением карты
 * 
 * @module utils/format-reading
 */

import { ReadingCard } from '@/types';

/**
 * Форматирует одну карту для вывода
 * 
 * @param card - Карта расклада
 * @returns Отформатированная строка
 */
export function formatCard(card: ReadingCard): string {
  const position = card.isReversed ? 'перевёрнутое' : 'вертикальное';
  return `Card ID: ${card.cardId} | Положение: ${position}`;
}

/**
 * Форматирует одну карту с названием и пояснением
 * 
 * @param card - Карта расклада
 * @returns Отформатированная строка с названием и пояснением
 */
export function formatCardWithMeaning(card: ReadingCard): string {
  const position = card.isReversed ? 'перевёрнутое' : 'вертикальное';
  const cardName = card.card.nameRu || card.card.name;
  const meaning = card.isReversed 
    ? card.card.meanings.reversed 
    : card.card.meanings.upright;
  
  return `Card ID: ${card.cardId} | Название: ${cardName} | Положение: ${position}\n   Пояснение: ${meaning}`;
}

/**
 * Форматирует массив карт для вывода
 * 
 * @param cards - Массив карт расклада
 * @returns Отформатированная строка с результатами
 */
export function formatReading(cards: ReadingCard[]): string {
  return cards.map((card, index) => {
    return `${index + 1}. ${formatCard(card)}`;
  }).join('\n');
}

/**
 * Форматирует расклад в простой формат (только ID и положение)
 * 
 * @param cards - Массив карт расклада
 * @returns Отформатированная строка
 */
export function formatReadingSimple(cards: ReadingCard[]): string {
  return cards.map(card => formatCard(card)).join('\n');
}

/**
 * Форматирует расклад с названиями и пояснениями
 * 
 * @param cards - Массив карт расклада
 * @returns Отформатированная строка с названиями и пояснениями
 */
export function formatReadingWithMeanings(cards: ReadingCard[]): string {
  return cards.map((card, index) => {
    return `${index + 1}. ${formatCardWithMeaning(card)}`;
  }).join('\n\n');
}

/**
 * Форматирует расклад с дополнительной информацией
 * 
 * @param cards - Массив карт расклада
 * @returns Отформатированная строка с подробной информацией
 */
export function formatReadingDetailed(cards: ReadingCard[]): string {
  return cards.map((card) => {
    const position = card.isReversed ? 'перевёрнутое' : 'вертикальное';
    const cardName = card.card.nameRu || card.card.name;
    const meaning = card.isReversed 
      ? card.card.meanings.reversed 
      : card.card.meanings.upright;
    
    return [
      `Позиция ${card.position}:`,
      `  Card ID: ${card.cardId}`,
      `  Название: ${cardName}`,
      `  Положение: ${position}`,
      `  Пояснение: ${meaning}`,
    ].join('\n');
  }).join('\n\n');
}

