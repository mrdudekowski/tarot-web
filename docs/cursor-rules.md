# 🧭 Cursor Rules: Tarot Web App (Vue 3 + Tailwind CSS + @vueuse/motion)

> **Обновлено:** Декабрь 2024  
> **Архитектура:** Vue 3 (Composition API) + Tailwind CSS + @vueuse/motion + Telegram Web App SDK  
> **Цель:** Детальные, однозначные правила для работы с новой архитектурой, устранение двусмысленностей

---

## ⚠️ КРИТИЧЕСКИ ВАЖНО - ПРОЧИТАТЬ ПЕРВЫМ

### Запрещено категорически:
1. ❌ Использовать старые файлы из предыдущего билда (React, TypeScript конфиги и т.д.)
2. ❌ Добавлять `!important` в CSS (только через Tailwind-классы)
3. ❌ Игнорировать безопасные зоны Telegram (обязательно использовать `env(safe-area-inset-*)`)
4. ❌ Писать inline-стили (кроме анимаций @vueuse/motion через директивы)
5. ❌ Использовать React-компоненты или TypeScript (.tsx файлы)
6. ❌ Использовать старые библиотеки (framer-motion напрямую, react-router и т.д.)

### Обязательно:
1. ✅ Все компоненты в `src/components/` с чёткой структурой (navigation, cards, ui)
2. ✅ Использовать Composition API + `<script setup>` во всех `.vue` файлах
3. ✅ Все стили только через Tailwind CSS классы
4. ✅ Анимации через @vueuse/motion (директива `v-motion`)
5. ✅ Учитывать безопасные зоны Telegram во всех компонентах
6. ✅ Размеры тач-элементов минимум 48x48px

---

## 1. Общие принципы

### 1.1 Структура проекта
```
src/
├── assets/
│   └── animations/     # CSS анимации (только для neon-glow)
├── components/
│   ├── cards/          # TarotCard.vue, GridCard.vue
│   ├── navigation/     # BottomNav.vue
│   └── ui/             # GradientButton.vue, StarryBackground.vue
├── layouts/
│   └── DefaultLayout.vue
├── pages/
│   ├── Home.vue
│   ├── Encyclopedia.vue
│   ├── Reading.vue
│   ├── Collection.vue
│   └── Profile.vue
├── router/
│   └── index.js
├── styles/
│   └── tailwind.css
├── App.vue
└── main.js
```

### 1.2 Правила именования компонентов
- Все компоненты в PascalCase: `TarotCard.vue`, `BottomNav.vue`
- Папки в lowercase: `cards/`, `navigation/`, `ui/`
- Каждый компонент должен иметь комментарий с описанием назначения

### 1.3 Composition API + `<script setup>`
**✅ Правильно:**
```vue
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const count = ref(0)
</script>
```

**❌ Неправильно:**
```vue
<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
```

---

## 2. Правила для компонентов

### 2.1 Карточки (TarotCard.vue, GridCard.vue)

#### Обязательные параметры:
- **Размер:** `320x200px` (мобильное разрешение)
- **Скругление:** `rounded-[20px]` (20px)
- **Тень:** `shadow-card` (настроено в Tailwind)
- **Градиент:** `bg-loona-gradient`
- **Граница:** `border border-loona-border` (1px solid #8a2be2)

**✅ Правильно:**
```vue
<template>
  <div
    v-motion
    :initial="{ scale: 0.9, opacity: 0 }"
    :enter="{ scale: 1, opacity: 1 }"
    :transition="{ duration: 0.5, delay }"
    class="w-full max-w-[320px] h-[200px] rounded-[20px] overflow-hidden border border-loona-border shadow-card bg-loona-gradient relative mx-auto"
  >
    <img
      v-if="card?.image"
      :src="card.image"
      :alt="card?.name || 'Tarot Card'"
      class="w-full h-32 object-cover"
    />
    <div class="p-3">
      <h3 class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple neon-text">
        {{ card.name }}
      </h3>
    </div>
  </div>
</template>
```

**❌ Неправильно:**
```vue
<!-- Неправильно: inline-стили, неправильные размеры -->
<div style="width: 300px; border-radius: 24px; box-shadow: 0 0 20px #8a2be2">
  <img :src="card.image" style="max-width: 100%" />
</div>

<!-- Неправильно: нет анимации, старые классы -->
<div class="card bg-gray-900">
  <img :src="card.image" />
</div>
```

#### Запрещено для карточек:
- ❌ Использовать `max-width` без `w-full max-w-[320px]`
- ❌ Использовать другие размеры, кроме `320x200px`
- ❌ Пропускать `v-motion` директиву для анимации появления
- ❌ Использовать кастомные CSS классы вместо Tailwind

---

### 2.2 Нижняя навигация (BottomNav.vue)

#### Обязательные параметры:
- **Позиционирование:** `fixed bottom-0 left-0 right-0`
- **Безопасные зоны:** `padding-bottom: calc(0.5rem + env(safe-area-inset-bottom))`
- **Активная иконка:** `text-loona-neon scale-110`
- **Неактивная иконка:** `text-loona-text-secondary`

**✅ Правильно:**
```vue
<template>
  <nav 
    class="fixed bottom-0 left-0 right-0 bg-loona-dark border-t border-loona-border flex justify-around py-2 px-4 z-50"
    style="padding-bottom: calc(0.5rem + env(safe-area-inset-bottom))"
  >
    <router-link
      to="/"
      class="flex flex-col items-center p-2 transition-all duration-200"
      :class="isActive('/') ? 'text-loona-neon scale-110' : 'text-loona-text-secondary'"
    >
      <div class="w-8 h-8 mb-1 flex items-center justify-center">
        <!-- SVG иконка -->
      </div>
      <span class="text-xs">Главная</span>
    </router-link>
  </nav>
</template>
```

**❌ Неправильно:**
```vue
<!-- Неправильно: нет безопасных зон -->
<nav class="fixed bottom-0">
  <a href="/">Home</a>
</nav>

<!-- Неправильно: inline-стили для цвета -->
<nav>
  <a style="color: #e600ff">Home</a>
</nav>
```

#### Запрещено для навигации:
- ❌ Игнорировать `env(safe-area-inset-bottom)`
- ❌ Использовать `px` значения для padding-bottom без учета safe-area
- ❌ Использовать не SVG иконки (только SVG или emoji)

---

### 2.3 Кнопки (GradientButton.vue)

#### Обязательные параметры:
- **Минимальный размер:** `min-h-[48px] min-w-[48px]` (для тач-элементов)
- **Скругление:** `rounded-[24px]`
- **Градиент:** `bg-gradient-to-r from-loona-neon to-loona-glow-purple`
- **Тень:** `shadow-button`
- **Анимация:** `hover:scale-105 active:scale-95`

**✅ Правильно:**
```vue
<template>
  <button
    class="px-6 py-3 min-h-[48px] min-w-[48px] rounded-[24px] font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 bg-gradient-to-r from-loona-neon to-loona-glow-purple shadow-button neon-glow"
  >
    <slot />
  </button>
</template>
```

**❌ Неправильно:**
```vue
<!-- Неправильно: inline-стили, нет минимального размера -->
<button style="background: linear-gradient(145deg, #e600ff 0%, #9370db 100%); border-radius: 24px">
  Гадать
</button>

<!-- Неправильно: кастомный CSS класс -->
<button class="custom-button">
  Гадать
</button>
```

#### Запрещено для кнопок:
- ❌ Использовать кнопки меньше 48x48px
- ❌ Пропускать `transition-all duration-200`
- ❌ Использовать inline-стили для градиентов
- ❌ Использовать `!important` в CSS

---

## 3. Правила для Tailwind CSS

### 3.1 Кастомные цвета (tailwind.config.js)

**Обязательные цвета:**
```js
colors: {
  'loona-dark': '#0a0a1a',
  'loona-purple': '#1a0d3e',
  'loona-purple-dark': '#0d0d2b',
  'loona-neon': '#e600ff',
  'loona-orange': '#ff6b35',
  'loona-orange-light': '#ff9e00',
  'loona-text-primary': '#c3c3c3',
  'loona-text-secondary': '#7a7a7a',
  'loona-border': '#8a2be2',
  'loona-glow-purple': '#9370db',
}
```

**✅ Правильно:**
```vue
<div class="bg-loona-dark text-loona-text-primary">
  <h1 class="text-loona-neon">Заголовок</h1>
</div>
```

**❌ Неправильно:**
```vue
<!-- Неправильно: стандартные цвета Tailwind -->
<div class="bg-gray-900 text-gray-300">
  <h1 class="text-purple-500">Заголовок</h1>
</div>
```

### 3.2 Градиенты

**Обязательные градиенты:**
```js
backgroundImage: {
  'loona-gradient': 'linear-gradient(145deg, #1a0d3e 0%, #0d0d2b 100%)',
  'loona-neon-gradient': 'linear-gradient(145deg, #e600ff 0%, #9370db 100%)',
  'loona-orange-gradient': 'linear-gradient(145deg, #ff6b35 0%, #ff9e00 100%)',
}
```

**✅ Правильно:**
```vue
<div class="bg-loona-gradient">
  <button class="bg-loona-neon-gradient">Кнопка</button>
</div>
```

**❌ Неправильно:**
```vue
<!-- Неправильно: inline-стили для градиента -->
<div style="background: linear-gradient(145deg, #1a0d3e 0%, #0d0d2b 100%)">
</div>
```

### 3.3 Тени

**Обязательные тени:**
```js
boxShadow: {
  'neon': '0 0 10px #e600ff, 0 0 20px #9370db',
  'neon-lg': '0 0 20px #e600ff, 0 0 40px #9370db',
  'card': '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px #8a2be2',
  'button': '0 4px 15px rgba(230, 0, 255, 0.3)',
}
```

**✅ Правильно:**
```vue
<div class="shadow-card">
  <button class="shadow-button neon-glow">Кнопка</button>
</div>
```

### 3.4 Безопасные зоны Telegram

**Обязательно использовать:**
```vue
<!-- В стилях -->
<div class="pb-[env(safe-area-inset-bottom)]">
  Контент
</div>

<!-- Или через inline-стиль (единственное исключение!) -->
<nav style="padding-bottom: calc(0.5rem + env(safe-area-inset-bottom))">
</nav>
```

**❌ Неправильно:**
```vue
<!-- Неправильно: фиксированный padding -->
<div class="pb-6">
  Контент
</div>
```

### 3.5 Запрещено в Tailwind:
- ❌ Использовать `bg-gray-900`, `text-black` и другие стандартные цвета вместо кастомных
- ❌ Добавлять `@apply` в компонентах (только в `tailwind.css`)
- ❌ Использовать кастомные CSS классы вместо Tailwind utilities
- ❌ Пропускать безопасные зоны

---

## 4. Правила для анимаций (@vueuse/motion)

### 4.1 Общие требования
- Все анимации должны использовать директиву `v-motion` из @vueuse/motion
- Длительность: `0.5s` (стандарт), `0.3s` (микроанимации)
- Эффект: `ease-in-out` (по умолчанию)

### 4.2 Примеры использования

**Появление элемента:**
```vue
<div
  v-motion
  :initial="{ opacity: 0, y: 20 }"
  :enter="{ opacity: 1, y: 0 }"
  :transition="{ duration: 0.5 }"
>
  Контент
</div>
```

**Анимация карточки при появлении:**
```vue
<div
  v-motion
  :initial="{ scale: 0.9, opacity: 0 }"
  :enter="{ scale: 1, opacity: 1 }"
  :transition="{ duration: 0.5, delay: 0.1 }"
>
  Карточка
</div>
```

**Последовательная анимация (задержка):**
```vue
<div
  v-for="(item, index) in items"
  :key="item.id"
  v-motion
  :initial="{ opacity: 0, x: -20 }"
  :enter="{ opacity: 1, x: 0 }"
  :transition="{ duration: 0.4, delay: index * 0.1 }"
>
  {{ item.name }}
</div>
```

**❌ Неправильно:**
```vue
<!-- Неправильно: CSS-анимации вместо @vueuse/motion -->
<div class="animate-fade-in">
  Контент
</div>

<style>
.animate-fade-in {
  animation: fadeIn 0.5s;
}
</style>

<!-- Неправильно: inline-стили для анимаций -->
<div style="transition: all 0.3s">
  Контент
</div>
```

### 4.3 Запрещено для анимаций:
- ❌ Использовать CSS `@keyframes` для анимаций элементов (только для neon-glow эффектов)
- ❌ Использовать `transition: all` в inline-стилях
- ❌ Пропускать `v-motion` директиву для анимированных элементов

---

## 5. Правила для Telegram WebApp

### 5.1 Инициализация (main.js)

**✅ Обязательно:**
```js
import { WebApp } from '@twa-dev/sdk'

WebApp.ready()
WebApp.expand()

const app = createApp(App)
app.use(router)
app.use(MotionPlugin)
app.mount('#app')
```

### 5.2 Использование в компонентах

**Хаптическая обратная связь при клике:**
```vue
<script setup>
import { WebApp } from '@twa-dev/sdk'

const handleClick = () => {
  WebApp.HapticFeedback.impactOccurred('light')
  // логика
}
</script>

<template>
  <button @click="handleClick">Кнопка</button>
</template>
```

**❌ Неправильно:**
```vue
<!-- Неправильно: использование window.alert() -->
<button @click="() => window.alert('Сообщение')">
  Кнопка
</button>
```

### 5.3 Запрещено для Telegram:
- ❌ Использовать `window.alert()`, `window.confirm()` (только кастомные модалки)
- ❌ Игнорировать `WebApp.expand()`
- ❌ Использовать горизонтальный скролл

---

## 6. Правила для страниц

### 6.1 Структура страницы

**✅ Правильно:**
```vue
<template>
  <div class="min-h-screen px-4 py-6 pb-24">
    <!-- Заголовок -->
    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
      class="mb-6"
    >
      <h1 class="text-2xl font-press-start mb-2 bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple neon-text">
        Заголовок
      </h1>
    </div>

    <!-- Контент -->
    <div class="space-y-4">
      <!-- элементы -->
    </div>
  </div>
</template>
```

**Обязательные классы для страниц:**
- `min-h-screen` - минимальная высота экрана
- `px-4 py-6` - отступы
- `pb-24` - отступ снизу для навигации

### 6.2 Сетки для карточек

**✅ Правильно (2 колонки):**
```vue
<div class="grid grid-cols-2 gap-4 pb-24">
  <GridCard
    v-for="(item, index) in items"
    :key="item.id"
    :title="item.name"
    :delay="index * 0.1"
  />
</div>
```

---

## 7. Проверки перед коммитом

Cursor AI должен проверить:

- [ ] Нет ли файлов из старого билда (React, TypeScript конфиги)
- [ ] Все компоненты используют Composition API + `<script setup>`
- [ ] В `tailwind.config.js` настроены все кастомные цвета и градиенты
- [ ] Нижняя навигация фиксирована и учитывает безопасные зоны
- [ ] Безопасные зоны учтены через `env(safe-area-inset-bottom)`
- [ ] Анимации реализованы через `v-motion`, а не CSS
- [ ] Все тач-элементы минимум 48x48px
- [ ] Нет inline-стилей (кроме безопасных зон и анимаций @vueuse/motion)
- [ ] Нет использования `!important`
- [ ] Все цвета из кастомной палитры (loona-*)

---

## 8. Примеры "Правильно/Неправильно"

### Пример 1: Карточка Таро

**✅ Правильно:**
```vue
<template>
  <div
    v-motion
    :initial="{ scale: 0.9, opacity: 0 }"
    :enter="{ scale: 1, opacity: 1 }"
    :transition="{ duration: 0.5, delay }"
    class="w-full max-w-[320px] h-[200px] rounded-[20px] overflow-hidden border border-loona-border shadow-card bg-loona-gradient relative mx-auto"
  >
    <img
      :src="card.image"
      :alt="card.name"
      class="w-full h-32 object-cover"
    />
    <div class="p-3">
      <h3 class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple">
        {{ card.name }}
      </h3>
    </div>
  </div>
</template>
```

**❌ Неправильно:**
```vue
<template>
  <div style="border-radius: 24px; box-shadow: 0 0 20px #8a2be2; width: 300px">
    <img :src="card.image" style="max-width: 100%" />
    <h3 style="color: #e600ff">{{ card.name }}</h3>
  </div>
</template>
```

### Пример 2: Кнопка

**✅ Правильно:**
```vue
<template>
  <button
    class="px-6 py-3 min-h-[48px] rounded-[24px] bg-gradient-to-r from-loona-neon to-loona-glow-purple text-white font-bold shadow-button hover:scale-105 transition-all duration-200"
    @click="handleClick"
  >
    Гадать
  </button>
</template>
```

**❌ Неправильно:**
```vue
<template>
  <button 
    style="background: linear-gradient(145deg, #e600ff 0%, #9370db 100%); border-radius: 24px; padding: 10px 20px"
    @click="handleClick"
  >
    Гадать
  </button>
</template>
```

### Пример 3: Заголовок страницы

**✅ Правильно:**
```vue
<h1 class="text-2xl font-press-start mb-2 bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple neon-text">
  Энциклопедия Таро
</h1>
```

**❌ Неправильно:**
```vue
<h1 style="color: #e600ff; font-size: 24px; text-shadow: 0 0 10px #e600ff">
  Энциклопедия Таро
</h1>
```

---

## 9. Референсы и стандарты

### Цветовая палитра:
- Фон: `#0a0a1a` (loona-dark)
- Градиенты карточек: `#1a0d3e` → `#0d0d2b` (loona-gradient)
- Неон: `#e600ff` (loona-neon)
- Граница: `#8a2be2` (loona-border)
- Текст основной: `#c3c3c3` (loona-text-primary)
- Текст вторичный: `#7a7a7a` (loona-text-secondary)

### Размеры:
- Карточки: `320x200px`
- Скругление: `20px` (rounded-[20px])
- Кнопки: минимум `48x48px`
- Отступы: стандартные Tailwind (4px, 8px, 16px и т.д.)

### Шрифты:
- Заголовки: `font-press-start` (Press Start 2P)
- Основной текст: `font-sans` (Inter)

---

## 10. Если не уверен

**Не домысливай!** Если не уверен в деталях:
1. Проверь существующие компоненты в проекте
2. Сверься с `tailwind.config.js` для цветов и градиентов
3. Посмотри примеры в `src/components/` или `src/pages/`
4. Спроси у пользователя

**Пример вопроса:**
> "Нужно ли добавить анимацию для лунных фаз в карточках коллекции?"

---

## 11. Приоритеты при принятии решений

1. **Соответствие референсам** - цвета, размеры, стили должны точно соответствовать
2. **Мобильная оптимизация** - всё должно работать на мобильных устройствах
3. **Telegram Web App** - учет безопасных зон, хаптическая обратная связь
4. **Производительность** - анимации плавные, без лагов
5. **Читаемость кода** - понятные имена, структура компонентов

---

**Помни:** Правила созданы для того, чтобы код был консистентным, понятным и соответствовал референсам. Следуй им строго!
