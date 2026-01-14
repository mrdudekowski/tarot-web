<template>
  <div class="relative w-full h-full">
    <!-- Заглушка (показывается, пока изображение не загружено) -->
    <div v-if="!isLoaded" class="skeleton-card">
      <div class="skeleton-particles"></div>
      <div class="skeleton-image"></div>
    </div>

    <!-- Реальное изображение (показывается после загрузки) -->
    <img 
      ref="imgElement"
      :src="src" 
      :alt="alt"
      @load="onImageLoad"
      @error="onImageError"
      :class="{ 'opacity-0': !isLoaded }"
      class="w-full h-full object-contain rounded-xl transition-opacity duration-300"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

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

const isLoaded = ref(false)
const imgElement = ref(null)

const onImageLoad = () => {
  isLoaded.value = true
}

const onImageError = () => {
  // Если изображение не загрузилось, оставляем заглушку
  // Можно добавить обработку ошибок при необходимости
  console.warn('Failed to load image:', props.src)
}

// Проверяем, если изображение уже загружено в кэше браузера
onMounted(async () => {
  await nextTick()
  if (imgElement.value && imgElement.value.complete) {
    isLoaded.value = true
  }
})
</script>

<style scoped>
.skeleton-card {
  @apply absolute inset-0 bg-loona-dark border border-loona-purple rounded-xl overflow-hidden;
  z-index: 1;
}

.skeleton-particles {
  @apply absolute inset-0 pointer-events-none;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(74,0,255,0.1) 50%, rgba(0,0,0,0) 100%);
  animation: float-particles 3s ease-in-out infinite;
}

.skeleton-image {
  @apply w-full h-full aspect-[3/4] bg-gradient-to-br from-loona-purple via-loona-purple-dark to-loona-dark rounded-xl;
  animation: pulse-glow 1.5s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@keyframes float-particles {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>