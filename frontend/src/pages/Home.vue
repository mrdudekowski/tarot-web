<template>
  <div
    :style="{ height: 'calc(100dvh - 80px)', maxHeight: 'calc(100dvh - 80px)' }"
    class="overflow-hidden flex flex-col px-2 py-1"
  >
    <!-- Заголовок -->
    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
      class="text-center mb-1 flex-shrink-0"
    >
      <h1 class="text-base font-press-start mb-0.5 bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple neon-text">
        🔮 Tarot Web App
      </h1>
      <p class="text-loona-text-secondary text-xs leading-tight">
        Откройте тайны Вселенной с помощью карт Таро
      </p>
    </div>

    <!-- Луна -->
    <div class="flex-1 flex justify-center items-center min-h-0 overflow-hidden">
      <div class="max-w-[45%] max-h-[50%] flex items-center justify-center">
        <div class="text-4xl md:text-5xl animate-neon-glow w-full h-full flex items-center justify-center">
          🌙
        </div>
      </div>
    </div>

    <!-- Кнопка -->
    <div class="mt-1 w-full flex-shrink-0">
      <GradientButton
        variant="primary"
        class="w-full py-2.5 text-sm rounded-xl"
        @click="startReading"
      >
        Гадать
      </GradientButton>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import GradientButton from '../components/ui/GradientButton.vue'

const router = useRouter()

const startReading = () => {
  router.push('/reading')
}

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
})
</script>
