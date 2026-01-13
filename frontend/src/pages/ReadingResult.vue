<template>
  <div class="min-h-screen px-4 py-4 pb-24">
    <!-- Состояние загрузки -->
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="text-loona-text-secondary text-center">
        <p class="text-lg mb-2">Перетасовываем колоду...</p>
        <div class="animate-pulse text-loona-neon">✨</div>
      </div>
    </div>

    <!-- Состояние ошибки -->
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="text-center max-w-md">
        <p class="text-red-400 text-lg mb-4">{{ error }}</p>
        <button
          @click="initializeReading"
          class="px-6 py-3 bg-loona-neon text-white rounded-lg hover:opacity-80 transition-opacity"
        >
          Попробовать снова
        </button>
      </div>
    </div>

    <!-- Результаты расклада -->
    <div v-else>
      <!-- Заголовок -->
      <div
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
        class="mb-4 text-center"
      >
        <h1 class="text-xl font-press-start mb-1 bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple neon-text">
          {{ readingTitle }}
        </h1>
      </div>

      <!-- Расклад: одна карта (daily/question) -->
      <div v-if="readingType === 'daily' || readingType === 'question'" class="space-y-6">
        <div
          v-motion
          :initial="{ scale: 0.9, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          class="flex justify-center"
        >
          <TarotCard :card="cards[0]" :delay="0" />
        </div>

        <!-- Толкование для daily -->
        <div
          v-if="readingType === 'daily' && cards[0]?.dailyInterpretation"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.4 }"
          class="bg-loona-card-gradient border border-loona-purple rounded-2xl p-4 text-center"
        >
          <p class="text-loona-text-secondary text-sm mb-2">{{ cards[0].date }}</p>
          <p class="text-loona-text-primary">{{ cards[0].dailyInterpretation }}</p>
          <p class="text-loona-text-primary mt-3">{{ cards[0].description }}</p>
        </div>

        <!-- Описание для question -->
        <div
          v-if="readingType === 'question'"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.4 }"
          class="bg-loona-card-gradient border border-loona-purple rounded-2xl p-4"
        >
          <p class="text-loona-text-primary">{{ cards[0]?.description }}</p>
        </div>
      </div>

      <!-- Расклад: три карты (monthly) -->
      <div v-if="readingType === 'monthly'" class="space-y-4">
        <div
          v-for="(card, index) in cards"
          :key="card.id"
          v-motion
          :initial="{ scale: 0.9, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.2 + index * 0.1 }"
          class="w-full"
        >
          <TarotCard :card="card" :delay="index * 0.1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { tarotService } from '../services/tarotService.js'
import TarotCard from '../components/cards/TarotCard.vue'

const route = useRoute()
const cards = ref([])
const loading = ref(true)
const error = ref(null)

const readingType = computed(() => route.query.type || 'daily')

const readingTitle = computed(() => {
  const titles = {
    daily: 'Карта дня',
    question: 'Ответ на ваш вопрос',
    monthly: 'Расклад на месяц'
  }
  return titles[readingType.value] || titles.daily
})

const initializeReading = async () => {
  loading.value = true
  error.value = null

  try {
    await new Promise(resolve => setTimeout(resolve, 300))

    switch (readingType.value) {
      case 'daily':
        cards.value = [tarotService.getDailyCard()]
        break
      case 'question':
        cards.value = [tarotService.getSingleCard()]
        break
      case 'monthly':
        cards.value = tarotService.getMultipleCards(3)
        break
      default:
        cards.value = [tarotService.getSingleCard()]
    }

    triggerHapticFeedback()
  } catch (err) {
    error.value = err.message || 'Произошла ошибка при создании расклада'
    console.error('Ошибка при инициализации расклада:', err)
  } finally {
    loading.value = false
  }
}

const triggerHapticFeedback = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback) {
    try {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium')
    } catch (err) {
      console.warn('Не удалось вызвать haptic feedback:', err)
    }
  }
}

onMounted(() => {
  initializeReading()
})
</script>

<style scoped>
.neon-text {
  text-shadow: 0 0 10px rgba(230, 0, 255, 0.5);
}
</style>