<template>
  <div class="relative aspect-[3/4]">
    <!-- Заглушка -->
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-loona-card-gradient rounded-xl overflow-hidden z-10"
    >
      <!-- Мерцающий градиент -->
      <div class="w-full h-full bg-gradient-to-br from-loona-purple to-loona-dark animate-pulse-glow" />
      <!-- Частицы (опционально) -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-loona-purple/20 to-transparent opacity-20 animate-float-particles pointer-events-none" />
      <!-- Солнечные частицы (маленькие точки) -->
      <div class="absolute inset-0 sunflare-particles pointer-events-none" />
    </div>

    <!-- Изображение -->
    <img
      ref="imgElement"
      :src="error ? getImagePath('images/placeholders/card-placeholder.webp') : src"
      :alt="alt"
      class="w-full h-full object-contain rounded-xl transition-opacity duration-300"
      :class="{ 'opacity-0': isLoading }"
      @load="onLoad"
      @error="onError"
    >
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { getImagePath } from '@/utils/imagePath'

defineProps({
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

const hideSkeleton = () => {
  // Скрываем заглушку только если:
  // 1. Изображение загружено
  // 2. Прошла минимальная задержка (200ms)
  if (isLoaded.value && minDelayPassed) {
    isLoading.value = false
  }
}

const onLoad = () => {
  error.value = false
  isLoaded.value = true
  // Проверяем, можно ли скрыть заглушку
  hideSkeleton()
}

const onError = () => {
  error.value = true
  isLoading.value = false
  // Отменяем таймер при ошибке
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

onMounted(async () => {
  // Устанавливаем таймер для минимальной задержки (200ms)
  // Это гарантирует, что заглушка будет видна минимум 200ms
  timer = setTimeout(() => {
    minDelayPassed = true
    // После прохождения минимальной задержки проверяем, можно ли скрыть заглушку
    hideSkeleton()
    timer = null
  }, 200)

  // Проверяем, если изображение уже в кэше браузера
  // Используем nextTick чтобы убедиться, что img элемент уже в DOM
  await nextTick()
  
  if (imgElement.value) {
    // Проверяем, загружено ли изображение из кэша
    // naturalHeight !== 0 означает, что изображение действительно загружено
    if (imgElement.value.complete && imgElement.value.naturalHeight !== 0) {
      isLoaded.value = true
      // Если изображение уже загружено, но минимальная задержка еще не прошла,
      // заглушка скроется после срабатывания таймера
      hideSkeleton()
    }
  }
})

onUnmounted(() => {
  // Очищаем таймер при размонтировании компонента
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})
</script>

<style scoped>
.sunflare-particles {
  background-image: 
    radial-gradient(2px 2px at 20% 30%, rgba(230, 0, 255, 0.8), transparent),
    radial-gradient(2px 2px at 60% 70%, rgba(147, 112, 219, 0.6), transparent),
    radial-gradient(1px 1px at 50% 50%, rgba(230, 0, 255, 0.9), transparent),
    radial-gradient(1px 1px at 80% 10%, rgba(147, 112, 219, 0.7), transparent),
    radial-gradient(2px 2px at 90% 50%, rgba(230, 0, 255, 0.5), transparent),
    radial-gradient(1px 1px at 33% 60%, rgba(147, 112, 219, 0.8), transparent),
    radial-gradient(1px 1px at 66% 20%, rgba(230, 0, 255, 0.6), transparent),
    radial-gradient(2px 2px at 10% 80%, rgba(147, 112, 219, 0.7), transparent),
    radial-gradient(1px 1px at 40% 90%, rgba(230, 0, 255, 0.5), transparent),
    radial-gradient(2px 2px at 70% 40%, rgba(147, 112, 219, 0.6), transparent),
    radial-gradient(1px 1px at 25% 15%, rgba(230, 0, 255, 0.8), transparent),
    radial-gradient(1px 1px at 75% 85%, rgba(147, 112, 219, 0.7), transparent),
    radial-gradient(2px 2px at 15% 55%, rgba(230, 0, 255, 0.6), transparent),
    radial-gradient(1px 1px at 85% 25%, rgba(147, 112, 219, 0.8), transparent),
    radial-gradient(2px 2px at 45% 75%, rgba(230, 0, 255, 0.5), transparent),
    radial-gradient(1px 1px at 55% 35%, rgba(147, 112, 219, 0.7), transparent),
    radial-gradient(1px 1px at 30% 95%, rgba(230, 0, 255, 0.6), transparent),
    radial-gradient(2px 2px at 95% 65%, rgba(147, 112, 219, 0.5), transparent),
    radial-gradient(1px 1px at 5% 45%, rgba(230, 0, 255, 0.8), transparent);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: sunflare-twinkle 3s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes sunflare-twinkle {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}
</style>