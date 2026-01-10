<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-loona-dark border-t border-loona-border flex justify-around py-2 px-4 z-50"
       style="padding-bottom: calc(0.5rem + env(safe-area-inset-bottom))">
    <router-link
      to="/encyclopedia"
      class="flex flex-col items-center p-2 transition-all duration-200"
      :class="isActive('/encyclopedia') ? 'text-loona-neon scale-110' : 'text-loona-text-secondary'"
    >
      <div class="w-8 h-8 mb-1 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <span class="text-xs">Энциклопедия</span>
    </router-link>

    <router-link
      to="/reading"
      class="flex flex-col items-center p-2 transition-all duration-200"
      :class="isActive('/reading') ? 'text-loona-neon scale-110' : 'text-loona-text-secondary'"
    >
      <div class="w-8 h-8 mb-1 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <span class="text-xs">Гадание</span>
    </router-link>

    <router-link
      to="/"
      class="flex flex-col items-center p-2 transition-transform duration-300"
      :class="isActive('/') ? 'text-loona-neon scale-110' : 'text-loona-text-secondary'"
    >
      <div class="w-10 h-10 mb-1 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      </div>
      <span class="text-xs">Главная</span>
    </router-link>

    <router-link
      to="/collection"
      class="flex flex-col items-center p-2 transition-all duration-200"
      :class="isActive('/collection') ? 'text-loona-neon scale-110' : 'text-loona-text-secondary'"
    >
      <div class="w-8 h-8 mb-1 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
        </svg>
      </div>
      <span class="text-xs">Коллекция</span>
    </router-link>

    <router-link
      to="/profile"
      class="flex flex-col items-center p-2 transition-all duration-200"
      :class="isActive('/profile') ? 'text-loona-neon scale-110' : 'text-loona-text-secondary'"
    >
      <div class="w-8 h-8 mb-1 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      <span class="text-xs">Профиль</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path) => {
  return route.path === path
}
</script>
