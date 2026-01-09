# Tarot Web App - Vue 3 Frontend

## Технологии

- Vue 3 (Composition API)
- Vue Router 4
- Tailwind CSS
- @vueuse/motion (анимации)
- @twa-dev/sdk (Telegram Web App SDK)

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

## Сборка

```bash
npm run build
```

## Структура проекта

```
src/
├── assets/
│   └── animations/
│       └── neon-glow.css
├── components/
│   ├── cards/
│   │   ├── TarotCard.vue
│   │   └── GridCard.vue
│   ├── navigation/
│   │   └── BottomNav.vue
│   └── ui/
│       ├── GradientButton.vue
│       └── StarryBackground.vue
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

## Особенности

- Мобильная оптимизация (минимум 48x48px для тач-элементов)
- Учет безопасных зон Telegram (env(safe-area-inset-*))
- Анимации с помощью @vueuse/motion
- Темная тема в стиле Loona (неон, градиенты, звездное небо)
- Адаптивный дизайн для Telegram Web App

## Цветовая палитра

- Фон: `#0a0a1a` (loona-dark)
- Градиенты: `#1a0d3e` → `#0d0d2b` (loona-gradient)
- Неон: `#e600ff` (loona-neon)
- Оранжевый: `#ff6b35` (loona-orange)
