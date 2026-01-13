# 🖼️ Стратегия подгрузки изображений в деплое

Анализ текущей ситуации и рекомендации по оптимальной подгрузке изображений.

## 📊 Текущая ситуация

### Проблема
Все пути к изображениям жестко заданы как абсолютные пути:
```javascript
/image: '/images/cards/major/00-TheFool.webp'
```

При деплое на GitHub Pages с `BASE_URL = /tarot-web/` эти пути не работают, т.к. браузер ищет:
- `https://mrdudekowski.github.io/images/cards/...` ❌
- Вместо: `https://mrdudekowski.github.io/tarot-web/images/cards/...` ✅

### Где используются пути
1. **tarotService.js** - все карты (22 major + 56 minor = 78 путей)
2. **Reading.vue** - 3 изображения для типов раскладов
3. **Encyclopedia.vue** - все карты + иконки мастей
4. **Collection.vue** - 8 изображений колод

**Всего:** ~90+ путей к изображениям

---

## ✅ Рекомендуемые решения (от лучшего к худшему)

### 🥇 Вариант 1: Утилита-хелпер для путей (РЕКОМЕНДУЕТСЯ)

**Преимущества:**
- ✅ Single Source of Truth
- ✅ Работает автоматически с `BASE_URL`
- ✅ Легко поддерживать и тестировать
- ✅ Минимальные изменения в коде
- ✅ Работает локально (`/`) и на GitHub Pages (`/tarot-web/`)

**Реализация:**

1. Создать утилиту `src/utils/imagePath.js`:
```javascript
/**
 * Генерирует путь к изображению с учетом BASE_URL
 * @param {string} path - Путь относительно public/ (например: 'images/cards/major/00-TheFool.webp')
 * @returns {string} Полный путь с учетом BASE_URL
 */
export function getImagePath(path) {
  // Убираем ведущий слеш, если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // BASE_URL уже содержит завершающий слеш или нет
  const base = import.meta.env.BASE_URL || '/'
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`
  
  return `${baseWithSlash}${cleanPath}`
}

/**
 * Alias для более короткого использования
 */
export const img = getImagePath
```

2. Использовать во всех местах:
```javascript
// Было:
image: '/images/cards/major/00-TheFool.webp'

// Стало:
import { getImagePath } from '@/utils/imagePath'
image: getImagePath('images/cards/major/00-TheFool.webp')
```

**Плюсы:**
- Централизованное управление путями
- Автоматическая работа с любым BASE_URL
- Легко добавить дополнительные функции (lazy loading, кеширование)

---

### 🥈 Вариант 2: Использовать `import.meta.env.BASE_URL` напрямую

**Преимущества:**
- ✅ Работает "из коробки"
- ✅ Не требует дополнительных утилит

**Недостатки:**
- ❌ Нужно менять каждый путь вручную
- ❌ Легко забыть добавить BASE_URL в новом месте
- ❌ Много дублирования кода

**Реализация:**
```javascript
const baseUrl = import.meta.env.BASE_URL || '/'
image: `${baseUrl}images/cards/major/00-TheFool.webp`
```

---

### 🥉 Вариант 3: Vite Asset Import (НЕ РЕКОМЕНДУЕТСЯ)

**Преимущества:**
- ✅ Vite обрабатывает пути автоматически
- ✅ Оптимизация и хеширование файлов

**Недостатки:**
- ❌ Требует импорта каждого изображения
- ❌ Увеличивает размер бандла
- ❌ Сложнее для динамических путей
- ❌ Не подходит для большого количества изображений (90+)

**Реализация:**
```javascript
import foolCard from '/public/images/cards/major/00-TheFool.webp'
```

---

## 🎯 Рекомендуемый план действий

### Шаг 1: Создать утилиту `imagePath.js`

Файл: `frontend/src/utils/imagePath.js`

```javascript
/**
 * Генерирует путь к изображению с учетом BASE_URL
 * Работает локально (BASE_URL = '/') и на GitHub Pages (BASE_URL = '/tarot-web/')
 * 
 * @param {string} path - Путь относительно public/ 
 *   Примеры:
 *   - 'images/cards/major/00-TheFool.webp'
 *   - '/images/cards/major/00-TheFool.webp' (ведущий слеш будет удален)
 * @returns {string} Полный путь с учетом BASE_URL
 * 
 * @example
 * getImagePath('images/cards/major/00-TheFool.webp')
 * // Локально: '/images/cards/major/00-TheFool.webp'
 * // GitHub Pages: '/tarot-web/images/cards/major/00-TheFool.webp'
 */
export function getImagePath(path) {
  // Убираем ведущий слеш, если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Получаем BASE_URL (должен быть установлен в vite.config.js и workflow)
  const base = import.meta.env.BASE_URL || '/'
  
  // Убеждаемся, что base заканчивается на слеш
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`
  
  return `${baseWithSlash}${cleanPath}`
}

/**
 * Короткий alias для удобства
 */
export const img = getImagePath
```

### Шаг 2: Обновить `tarotService.js`

```javascript
import { getImagePath } from '../utils/imagePath.js'

const MAJOR_ARCANA = [
  { 
    id: '00', 
    name: 'Шут', 
    image: getImagePath('images/cards/major/00-TheFool.webp'), 
    description: 'Начало пути, невинность, спонтанность' 
  },
  // ... остальные карты
]

// В функции генерации minor arcana:
const imagePath = getImagePath(`images/cards/minor/${suit}/${suitCapitalized}${String(number).padStart(2, '0')}.webp`)
```

### Шаг 3: Обновить компоненты Vue

**Reading.vue:**
```javascript
import { getImagePath } from '@/utils/imagePath'

const readingTypes = [
  {
    type: 'daily',
    title: 'Карта дня',
    image: getImagePath('images/cards/reading_cards/day.webp')
  },
  // ...
]
```

**Encyclopedia.vue:**
```javascript
import { getImagePath } from '@/utils/imagePath'

const majorArcana = [
  { id: 0, name: 'The Fool', image: getImagePath('images/cards/major/00-TheFool.webp'), ... },
  // ...
]

const minorSuits = [
  { 
    id: 'cups', 
    icon: getImagePath('images/cards/minor/cups/Cups01.webp'),
    // ...
  },
  // ...
]
```

**Collection.vue:**
```javascript
import { getImagePath } from '@/utils/imagePath'

const loadDecks = () => {
  decks.value = [
    {
      id: 1,
      image: getImagePath('images/cards/major/00-TheFool.webp')
    },
    // ...
  ]
}
```

---

## 🔍 Дополнительные оптимизации

### 1. Lazy Loading изображений

Добавить в компонент `TarotCard.vue`:

```vue
<img
  v-if="card?.image"
  :src="card.image"
  loading="lazy"
  :alt="card?.name || 'Tarot Card'"
  class="w-full h-full object-contain"
  @error="handleImageError"
/>
```

### 2. Preload критичных изображений

В `index.html`:

```html
<link rel="preload" as="image" href="/images/cards/reading_cards/day.webp" />
```

### 3. Оптимизация формата

Все изображения уже в формате WebP ✅ - это оптимально.

### 4. Кеширование

GitHub Pages автоматически кеширует статические файлы. Можно добавить версионирование:

```javascript
export function getImagePath(path, version = '') {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  const base = import.meta.env.BASE_URL || '/'
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`
  const versionQuery = version ? `?v=${version}` : ''
  
  return `${baseWithSlash}${cleanPath}${versionQuery}`
}
```

---

## ✅ Проверочный чеклист

После реализации проверьте:

- [ ] Утилита `imagePath.js` создана
- [ ] Все пути в `tarotService.js` обновлены
- [ ] Все пути в `Reading.vue` обновлены
- [ ] Все пути в `Encyclopedia.vue` обновлены
- [ ] Все пути в `Collection.vue` обновлены
- [ ] Приложение работает локально (`npm run dev`)
- [ ] Приложение работает на GitHub Pages
- [ ] Все изображения загружаются корректно

---

## 🧪 Тестирование

### Локально:
```bash
cd frontend
npm run dev
# Проверить: http://localhost:3000
# Все изображения должны загружаться
```

### На GitHub Pages:
1. Запушить изменения в `main`
2. Дождаться деплоя
3. Открыть: `https://mrdudekowski.github.io/tarot-web/`
4. Проверить в DevTools (Network tab), что все изображения загружаются с правильными путями
5. Проверить консоль на ошибки 404

---

## 📝 Пример использования в разных сценариях

```javascript
// Статический путь
getImagePath('images/cards/major/00-TheFool.webp')

// Динамический путь
const cardId = '00'
getImagePath(`images/cards/major/${cardId}-TheFool.webp`)

// Путь с ведущим слешом (будет обработан)
getImagePath('/images/cards/major/00-TheFool.webp')

// Короткий alias
import { img } from '@/utils/imagePath'
img('images/cards/major/00-TheFool.webp')
```

---

## 🎯 Итоговая рекомендация

**Использовать Вариант 1 (утилита-хелпер)** по следующим причинам:

1. ✅ **Single Source of Truth** - все пути управляются из одного места
2. ✅ **Автоматическая работа** - не нужно думать о BASE_URL в каждом месте
3. ✅ **Легкая поддержка** - при изменении логики меняем один файл
4. ✅ **Расширяемость** - легко добавить дополнительные функции (кеширование, lazy loading)
5. ✅ **Тестируемость** - легко писать тесты для утилиты

Это решение соответствует принципу **Single Source of Truth** из ваших правил разработки.
