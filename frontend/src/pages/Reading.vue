<template>
  <div class="h-screen overflow-hidden flex flex-col px-2 py-2 pb-24">
    <!-- Заголовок -->
    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
      class="mb-2 text-center flex-shrink-0"
    >
      <h1 class="text-lg font-press-start mb-1 bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple neon-text">
        Гадание на Таро
      </h1>
      <p class="text-loona-text-secondary text-xs">
        Свайпайте или нажмите на карточку
      </p>
    </div>

    <!-- Контейнер слайдера -->
    <div class="relative flex-1 flex items-center justify-center min-h-0">
      <div
        ref="sliderContainer"
        class="overflow-hidden relative w-full h-full flex items-center justify-center"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div
          class="flex transition-transform duration-300 ease-out h-full w-full"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(reading, index) in readingTypes"
            :key="reading.type"
            class="w-full flex-shrink-0 px-4 h-full flex items-center justify-center"
          >
            <div class="w-full h-full flex items-center justify-center">
              <div class="reading-card-wrapper">
                <GridCard
                  :image="reading.image"
                  :title="reading.title"
                  :description="reading.description"
                  :delay="index * 0.1"
                  @click="startReading(reading.type)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Индикаторы слайдов -->
    <div class="slide-indicators flex justify-center gap-2 mt-2 flex-shrink-0">
      <button
        v-for="(reading, index) in readingTypes"
        :key="`indicator-${index}`"
        class="slide-indicator rounded-full transition-all duration-300"
        :class="currentSlide === index ? 'bg-loona-neon' : 'bg-loona-purple opacity-50'"
        :aria-label="`Перейти к ${reading.title}`"
        @click="goToSlide(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import GridCard from '../components/cards/GridCard.vue'

const currentSlide = ref(0)
const sliderContainer = ref(null)

let startX = 0
let currentX = 0
let isDragging = false
let offsetX = 0

const readingTypes = [
  {
    type: 'daily',
    title: 'Карта дня',
    description: 'Ваша карта на сегодня — простое и мудрое послание',
    image: '/images/cards/reading_cards/day.webp'
  },
  {
    type: 'question',
    title: 'Расклад по вопросу',
    description: 'Задайте вопрос — получите ответ от Вселенной',
    image: '/images/cards/reading_cards/question.webp'
  },
  {
    type: 'monthly',
    title: 'Расклад на месяц',
    description: 'Прогноз на 30 дней: ключевые события и советы',
    image: '/images/cards/reading_cards/month.webp'
  }
]

const goToSlide = (index) => {
  if (index >= 0 && index < readingTypes.length) {
    currentSlide.value = index
  }
}

const handleTouchStart = (e) => {
  startX = e.touches[0].clientX
  isDragging = true
}

const handleTouchMove = (e) => {
  if (!isDragging) return
  e.preventDefault()
  currentX = e.touches[0].clientX
  offsetX = currentX - startX
}

const handleTouchEnd = () => {
  if (!isDragging) return
  
  const threshold = 50
  
  if (Math.abs(offsetX) > threshold) {
    if (offsetX > 0 && currentSlide.value > 0) {
      goToSlide(currentSlide.value - 1)
    } else if (offsetX < 0 && currentSlide.value < readingTypes.length - 1) {
      goToSlide(currentSlide.value + 1)
    }
  }
  
  isDragging = false
  offsetX = 0
}

const startReading = (type) => {
  console.log('Начать расклад:', type)
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
  
  // Предотвращаем вертикальный скролл
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.reading-card-wrapper {
  width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ограничиваем максимальную высоту карточки, чтобы она помещалась на экране 360x640 */
.reading-card-wrapper :deep(.bg-loona-card-gradient) {
  max-height: calc(100vh - 180px) !important;
  max-width: 100% !important;
  width: 100% !important;
}

/* Ограничиваем высоту контейнера изображения, чтобы текст поместился */
.reading-card-wrapper :deep(div[class*="aspect"]) {
  max-height: calc(100vh - 260px) !important;
}

/* Индикаторы слайдов - размер 24px */
.slide-indicators .slide-indicator {
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  min-height: 24px !important;
  padding: 0 !important;
  box-shadow: none !important;
}

.slide-indicators .slide-indicator.bg-loona-neon {
  box-shadow: 0 0 6px #e600ff !important;
}
</style>
