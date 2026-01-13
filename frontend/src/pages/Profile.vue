<template>
  <div class="min-h-screen px-4 py-6">
    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
      class="mb-6"
    >
      <h1 class="text-2xl font-press-start mb-2 bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple neon-text">
        Профиль
      </h1>
    </div>

    <div class="space-y-6 pb-24">
      <div
        v-motion
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.5, delay: 0.1 }"
        class="rounded-[20px] border border-loona-border shadow-card bg-loona-gradient p-6"
      >
        <h2 class="text-xl font-bold text-loona-neon mb-4 neon-text">
          Статистика
        </h2>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-loona-text-primary">Всего гаданий</span>
            <span class="text-loona-neon font-bold">{{ stats.totalReadings }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-loona-text-primary">Карт просмотрено</span>
            <span class="text-loona-neon font-bold">{{ stats.cardsViewed }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-loona-text-primary">Активная колода</span>
            <span class="text-loona-text-secondary">{{ stats.activeDeck }}</span>
          </div>
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.5, delay: 0.2 }"
        class="rounded-[20px] border border-loona-border shadow-card bg-loona-gradient p-6"
      >
        <h2 class="text-xl font-bold text-loona-neon mb-4 neon-text">
          Настройки
        </h2>
        <div class="space-y-4">
          <button class="w-full text-left py-3 px-4 rounded-xl bg-loona-purple text-loona-text-primary hover:bg-loona-purple-dark transition">
            Выбор колоды
          </button>
          <button class="w-full text-left py-3 px-4 rounded-xl bg-loona-purple text-loona-text-primary hover:bg-loona-purple-dark transition">
            Уведомления
          </button>
          <button class="w-full text-left py-3 px-4 rounded-xl bg-loona-purple text-loona-text-primary hover:bg-loona-purple-dark transition">
            О приложении
          </button>
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.5, delay: 0.3 }"
        class="rounded-[20px] border border-loona-border shadow-card bg-loona-gradient p-6"
      >
        <h2 class="text-xl font-bold text-loona-neon mb-4 neon-text">
          История гаданий
        </h2>
        <p class="text-loona-text-secondary text-sm">
          Ваши последние расклады появятся здесь
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const stats = ref({
  totalReadings: 0,
  cardsViewed: 0,
  activeDeck: 'Классическая'
})

const resetScroll = () => {
  // Сбрасываем скролл несколькими способами для максимальной совместимости
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

onMounted(() => {
  // Сбрасываем сразу
  resetScroll()
  
  // Сбрасываем после завершения DOM рендера
  nextTick(() => {
    resetScroll()
  })
  
  // Сбрасываем после завершения transition анимации (300ms + запас 50ms)
  setTimeout(() => {
    resetScroll()
  }, 350)
  
  stats.value = {
    totalReadings: 5,
    cardsViewed: 12,
    activeDeck: 'Классическая'
  }
})
</script>
