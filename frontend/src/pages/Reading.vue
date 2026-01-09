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
        Гадание на Таро
      </h1>
      <p class="text-loona-text-secondary text-sm mb-4">
        Выберите расклад
      </p>
    </div>

    <div v-if="!isReadingActive" class="space-y-4 pb-24">
      <div
        v-for="(spread, index) in spreads"
        :key="spread.id"
        v-motion
        :initial="{ opacity: 0, x: -20 }"
        :enter="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.4, delay: index * 0.1 }"
      >
        <GridCard
          :title="spread.name"
          :description="spread.description"
          :delay="index * 0.1"
          @click="startSpread(spread)"
        />
      </div>
    </div>

    <div v-else class="pb-24">
      <div class="text-center mb-6">
        <h2 class="text-xl font-bold text-loona-neon mb-2">
          {{ currentSpread?.name }}
        </h2>
        <p class="text-loona-text-secondary text-sm">
          {{ spreadInstructions }}
        </p>
      </div>

      <div class="flex flex-col items-center space-y-4">
        <TarotCard
          v-for="(card, index) in drawnCards"
          :key="index"
          :card="card"
          :delay="index * 0.2"
        />
      </div>

      <div class="mt-8 flex justify-center">
        <GradientButton
          variant="outline"
          @click="resetReading"
        >
          Новое гадание
        </GradientButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TarotCard from '../components/cards/TarotCard.vue'
import GridCard from '../components/cards/GridCard.vue'
import GradientButton from '../components/ui/GradientButton.vue'

const isReadingActive = ref(false)
const currentSpread = ref(null)
const drawnCards = ref([])
const spreadInstructions = ref('')

const spreads = [
  {
    id: 1,
    name: 'Прошлое, Настоящее, Будущее',
    description: 'Три карты покажут путь вашей судьбы',
    cardCount: 3
  },
  {
    id: 2,
    name: 'Кельтский Крест',
    description: 'Глубокий анализ ситуации',
    cardCount: 10
  },
  {
    id: 3,
    name: 'Одна Карта',
    description: 'Быстрый ответ на вопрос',
    cardCount: 1
  }
]

const startSpread = (spread) => {
  currentSpread.value = spread
  isReadingActive.value = true
  spreadInstructions.value = 'Сосредоточьтесь на своем вопросе...'
  
  setTimeout(() => {
    drawCards(spread.cardCount)
  }, 1000)
}

const drawCards = (count) => {
  const sampleCards = [
    { name: 'The Fool', description: 'Начало нового пути', image: '/images/cards/major/00-TheFool.webp' },
    { name: 'The Magician', description: 'Мастерство и действие', image: '/images/cards/major/01-TheMagician.webp' },
    { name: 'The High Priestess', description: 'Интуиция и тайна', image: '/images/cards/major/02-TheHighPriestess.webp' },
  ]
  
  drawnCards.value = Array.from({ length: count }, (_, i) => ({
    ...sampleCards[i % sampleCards.length],
    id: i
  }))
  
  spreadInstructions.value = 'Ваши карты готовы'
}

const resetReading = () => {
  isReadingActive.value = false
  currentSpread.value = null
  drawnCards.value = []
  spreadInstructions.value = ''
}
</script>
