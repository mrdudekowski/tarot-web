/**
 * 🎴 КОЛОДА ТАРО - ДАННЫЕ И УТИЛИТЫ
 * 
 * Загрузка и работа с полной колодой таро из 78 карт
 * 
 * @module data/tarot-deck
 */

import { TarotCard } from '@/types';
import tarotDeckData from './tarot-deck.json';

/**
 * Полная колода таро (78 карт)
 */
export const tarotDeck: TarotCard[] = tarotDeckData.cards as TarotCard[];

/**
 * Получает все карты колоды
 * 
 * @returns Массив всех карт таро
 */
export function getAllCards(): TarotCard[] {
  return tarotDeck;
}

/**
 * Получает карту по ID
 * 
 * @param id - ID карты
 * @returns Карта таро или undefined
 */
export function getCardById(id: number): TarotCard | undefined {
  return tarotDeck.find(card => card.id === id);
}

/**
 * Получает все Старшие Арканы (22 карты)
 * 
 * @returns Массив Старших Арканов
 */
export function getMajorArcana(): TarotCard[] {
  return tarotDeck.filter(card => card.arcana === 'major');
}

/**
 * Получает все Младшие Арканы (56 карт)
 * 
 * @returns Массив Младших Арканов
 */
export function getMinorArcana(): TarotCard[] {
  return tarotDeck.filter(card => card.arcana === 'minor');
}

/**
 * Получает карты по масти
 * 
 * @param suit - Масть карт
 * @returns Массив карт указанной масти
 */
export function getCardsBySuit(suit: 'wands' | 'cups' | 'swords' | 'pentacles'): TarotCard[] {
  return tarotDeck.filter(card => card.suit === suit);
}

/**
 * Получает карты по номеру (для Младших Арканов)
 * 
 * @param number - Номер карты (1-14)
 * @returns Массив карт с указанным номером
 */
export function getCardsByNumber(number: number): TarotCard[] {
  return tarotDeck.filter(card => card.number === number);
}

/**
 * Получает Старший Аркан по номеру
 * 
 * @param number - Номер Старшего Аркана (0-21)
 * @returns Старший Аркан или undefined
 */
export function getMajorArcanaByNumber(number: number): TarotCard | undefined {
  return tarotDeck.find(card => card.arcana === 'major' && card.number === number);
}

/**
 * Получает Младший Аркан по масти и номеру
 * 
 * @param suit - Масть карты
 * @param number - Номер карты (1-14)
 * @returns Младший Аркан или undefined
 */
export function getMinorArcanaBySuitAndNumber(
  suit: 'wands' | 'cups' | 'swords' | 'pentacles',
  number: number
): TarotCard | undefined {
  return tarotDeck.find(
    card => card.arcana === 'minor' && card.suit === suit && card.number === number
  );
}

/**
 * Проверяет валидность колоды
 * 
 * @returns true если колода валидна (78 карт)
 */
export function validateDeck(): boolean {
  return tarotDeck.length === 78;
}

/**
 * Получает статистику колоды
 * 
 * @returns Объект со статистикой колоды
 */
export function getDeckStatistics(): {
  total: number;
  majorArcana: number;
  minorArcana: number;
  wands: number;
  cups: number;
  swords: number;
  pentacles: number;
} {
  return {
    total: tarotDeck.length,
    majorArcana: getMajorArcana().length,
    minorArcana: getMinorArcana().length,
    wands: getCardsBySuit('wands').length,
    cups: getCardsBySuit('cups').length,
    swords: getCardsBySuit('swords').length,
    pentacles: getCardsBySuit('pentacles').length,
  };
}

