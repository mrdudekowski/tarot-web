# 🧪 ТЕСТИРОВАНИЕ РАНДОМИЗАЦИИ

## 📋 Быстрый старт

### В браузере (консоль разработчика)

1. Откройте приложение в браузере
2. Откройте консоль разработчика (F12)
3. Импортируйте функции:

```javascript
// После загрузки модулей
import { testSimpleReading, logTestReading } from '@/utils/test-randomization-browser';

// Или используйте глобальные функции (если настроены)
testTarotReading(3); // Тест с 3 картами
testTarotReadingDetailed(5); // Подробный тест с 5 картами
```

### В коде (TypeScript/React)

```typescript
import { tarotDeck } from '@/data/tarot-deck';
import { createReading } from '@/utils/tarot-randomization';
import { formatReadingSimple } from '@/utils/format-reading';
import type { SpreadType } from '@/types';

// Создаём тестовый расклад
const testSpread: SpreadType = {
  id: 1,
  name: 'Test',
  nameRu: 'Тест',
  description: '',
  cardCount: 3,
  category: 'general',
  positions: [
    { position: 1, name: 'Pos 1', nameRu: 'Поз 1', meaning: '' },
    { position: 2, name: 'Pos 2', nameRu: 'Поз 2', meaning: '' },
    { position: 3, name: 'Pos 3', nameRu: 'Поз 3', meaning: '' },
  ],
  isPremium: false,
  icon: '🎴',
};

// Создаём расклад
const reading = createReading(tarotDeck, testSpread);

// Выводим результат
console.log(formatReadingSimple(reading.cards));
// Card ID: 42 | Положение: вертикальное
// Card ID: 15 | Положение: перевёрнутое
// Card ID: 67 | Положение: вертикальное
```

## 📊 Формат вывода

### Простой формат (только ID и положение)

```
Card ID: 42 | Положение: вертикальное
Card ID: 15 | Положение: перевёрнутое
Card ID: 67 | Положение: вертикальное
```

### Подробный формат

```
Позиция 1:
  Card ID: 42
  Название: Пятёрка Кубков
  Положение: вертикальное

Позиция 2:
  Card ID: 15
  Название: Смерть
  Положение: перевёрнутое
```

## 🧪 Доступные тесты

### 1. Простой тест

```typescript
import { testSimpleReading } from '@/utils/test-randomization-browser';

const result = testSimpleReading(3);
console.log(result);
```

### 2. Тест нескольких раскладов

```typescript
import { testMultipleReadings } from '@/utils/test-randomization';

const result = testMultipleReadings(5, 3); // 5 раскладов по 3 карты
console.log(result);
```

### 3. Тест уникальности

```typescript
import { testUniqueness } from '@/utils/test-randomization';

const result = testUniqueness(3, 100); // 100 итераций по 3 карты
console.log(result);
```

### 4. Все тесты

```typescript
import { runAllTests } from '@/utils/test-randomization';

const result = runAllTests();
console.log(result);
```

## ✅ Проверка работы

### Что проверяется:

1. ✅ Валидность колоды (78 карт)
2. ✅ Уникальность карт в раскладе
3. ✅ Правильность определения переворота
4. ✅ Распределение карт (равномерность)
5. ✅ Работа с JSON данными

### Ожидаемый результат:

- Каждая карта имеет уникальный ID (1-78)
- Положение: "вертикальное" или "перевёрнутое"
- Все карты в раскладе уникальны
- Распределение переворотов близко к 50/50

## 🐛 Отладка

Если что-то не работает:

1. Проверьте, что колода загружена:
```typescript
import { validateDeck, getDeckStatistics } from '@/data/tarot-deck';

console.log('Валидна:', validateDeck());
console.log('Статистика:', getDeckStatistics());
```

2. Проверьте доступность Crypto API:
```typescript
import { isCryptoAvailable, getEntropyInfo } from '@/utils/randomization';

console.log('Crypto доступен:', isCryptoAvailable());
console.log('Информация об энтропии:', getEntropyInfo());
```

3. Проверьте создание расклада:
```typescript
import { tarotDeck } from '@/data/tarot-deck';
import { createReading } from '@/utils/tarot-randomization';

try {
  const reading = createReading(tarotDeck, testSpread);
  console.log('Успех:', reading);
} catch (error) {
  console.error('Ошибка:', error);
}
```

## 📝 Примеры использования

См. файлы:
- `test-randomization.ts` - полные тесты
- `test-randomization-browser.ts` - тесты для браузера
- `test-randomization.ts` - простой запуск тестов

