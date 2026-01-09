# 🎴 ДАННЫЕ ТАРО - КОЛОДА КАРТ

## 📋 ОБЗОР

Этот модуль содержит полную колоду таро из **78 карт** в формате JSON с полной информацией о каждой карте.

## 📊 СТРУКТУРА

### Старшие Арканы (22 карты)
- ID: 1-22
- Номера: 0-21 (Шут = 0, Мир = 21)
- Без масти (suit отсутствует)

### Младшие Арканы (56 карт)
- ID: 23-78
- 4 масти по 14 карт каждая:
  - **Жезлы (Wands)** - ID: 23-36
  - **Кубки (Cups)** - ID: 37-50
  - **Мечи (Swords)** - ID: 51-64
  - **Пентакли (Pentacles)** - ID: 65-78

Каждая масть содержит:
- Тузы-Десятки (1-10)
- Придворные карты: Паж (11), Рыцарь (12), Королева (13), Король (14)

## 📁 ФАЙЛЫ

- `tarot-deck.json` - JSON файл с полной колодой (78 карт)
- `tarot-deck.ts` - Утилиты для работы с колодой

## 🚀 ИСПОЛЬЗОВАНИЕ

### Импорт колоды

```typescript
import { tarotDeck, getAllCards } from '@/data/tarot-deck';

// Получить все карты
const allCards = getAllCards();

// Или напрямую
const cards = tarotDeck;
```

### Получение карт по категориям

```typescript
import {
  getMajorArcana,
  getMinorArcana,
  getCardsBySuit,
  getCardById,
} from '@/data/tarot-deck';

// Старшие Арканы
const majorCards = getMajorArcana(); // 22 карты

// Младшие Арканы
const minorCards = getMinorArcana(); // 56 карт

// По масти
const wands = getCardsBySuit('wands'); // 14 карт
const cups = getCardsBySuit('cups'); // 14 карт
const swords = getCardsBySuit('swords'); // 14 карт
const pentacles = getCardsBySuit('pentacles'); // 14 карт

// По ID
const card = getCardById(1); // Шут
```

### Использование с системой рандомизации

```typescript
import { tarotDeck } from '@/data/tarot-deck';
import { createReading } from '@/utils/tarot-randomization';
import type { SpreadType } from '@/types';

const spread: SpreadType = {
  id: 1,
  name: 'Three Card Spread',
  nameRu: 'Расклад на три карты',
  cardCount: 3,
  // ... другие поля
};

// Создать расклад
const reading = createReading(tarotDeck, spread);
console.log('Выбранные карты:', reading.cards);
```

## 📝 СТРУКТУРА КАРТЫ

Каждая карта содержит:

```typescript
{
  id: number;              // Уникальный ID (1-78)
  name: string;            // Английское название
  nameRu: string;          // Русское название
  arcana: 'major' | 'minor'; // Тип аркана
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles'; // Масть (только для младших)
  number?: number;        // Номер (0-21 для старших, 1-14 для младших)
  meanings: {
    upright: string;       // Значение прямой карты
    reversed: string;      // Значение перевёрнутой карты
  };
  keywords: string[];     // Ключевые слова
  element?: string;        // Элемент (Fire, Water, Air, Earth)
  astrology?: string;      // Астрологическое соответствие
  imageUrl: string;        // Путь к изображению карты
}
```

## ✅ ВАЛИДАЦИЯ

```typescript
import { validateDeck, getDeckStatistics } from '@/data/tarot-deck';

// Проверить валидность колоды
const isValid = validateDeck(); // true если 78 карт

// Получить статистику
const stats = getDeckStatistics();
console.log(stats);
// {
//   total: 78,
//   majorArcana: 22,
//   minorArcana: 56,
//   wands: 14,
//   cups: 14,
//   swords: 14,
//   pentacles: 14
// }
```

## 🎯 ПРИМЕРЫ

### Получить все карты масти Жезлов

```typescript
import { getCardsBySuit } from '@/data/tarot-deck';

const wands = getCardsBySuit('wands');
// 14 карт: от Туза до Короля Жезлов
```

### Получить конкретную карту

```typescript
import { getCardById, getMajorArcanaByNumber } from '@/data/tarot-deck';

// По ID
const fool = getCardById(1); // Шут

// Старший Аркан по номеру
const magician = getMajorArcanaByNumber(1); // Маг
```

### Получить Младший Аркан по масти и номеру

```typescript
import { getMinorArcanaBySuitAndNumber } from '@/data/tarot-deck';

const aceOfWands = getMinorArcanaBySuitAndNumber('wands', 1);
const kingOfCups = getMinorArcanaBySuitAndNumber('cups', 14);
```

## 📚 ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ

- Все карты имеют уникальные ID от 1 до 78
- Старшие Арканы: ID 1-22, номера 0-21
- Младшие Арканы: ID 23-78, номера 1-14
- Каждая карта имеет значения для прямой и перевёрнутой позиции
- Все карты содержат ключевые слова для интерпретации

