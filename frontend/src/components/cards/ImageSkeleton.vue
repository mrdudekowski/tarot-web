<template>
  <div class="relative aspect-[3/4]">
    <!-- Заглушка -->
    <div v-if="isLoading" class="absolute inset-0 bg-loona-card-gradient rounded-xl overflow-hidden z-10">
      <!-- Мерцающий градиент -->
      <div class="w-full h-full bg-gradient-to-br from-loona-purple to-loona-dark animate-pulse-glow"></div>
      <!-- Частицы (опционально) -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-loona-purple/20 to-transparent opacity-20 animate-float-particles pointer-events-none"></div>
    </div>

    <!-- Изображение -->
    <img
      ref="imgElement"
      :src="error ? '/images/placeholders/card-placeholder.webp' : src"
      :alt="alt"
      @load="onLoad"
      @error="onError"
      :class="{ 'opacity-0': isLoading }"
      class="w-full h-full object-contain rounded-xl transition-opacity duration-300"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Card image'
  }
})

const isLoading = ref(true)
const error = ref(false)
const isLoaded = ref(false)
const imgElement = ref(null)
let timer = null
let minDelayPassed = false

const onLoad = () => {
  error.value = false
  isLoaded.value = true
  
  // Если минимальная задержка уже прошла, скрываем заглушку сразу
  if (minDelayPassed) {
    isLoading.value = false
  }
  // Иначе заглушка скроется после срабатывания таймера
}

const onError = () => {
  error.value = true
  isLoading.value = false
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

onMounted(() => {
  // Минимальная задержка для видимости заглушки (200ms)
  timer = setTimeout(() => {
    minDelayPassed = true
    // Если изображение уже загружено, скрываем заглушку
    if (isLoaded.value) {
      isLoading.value = false
    }
    timer = null
  }, 200)
  
  // Проверяем, если изображение уже в кэше браузера
  // Используем nextTick чтобы убедиться, что img элемент уже в DOM
  setTimeout(() => {
    if (imgElement.value && imgElement.value.complete) {
      isLoaded.value = true
      // Если минимальная задержка уже прошла, скрываем заглушку
      if (minDelayPassed) {
        isLoading.value = false
      }
      // Иначе заглушка скроется после срабатывания таймера
    }
  }, 0)
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})
</script>