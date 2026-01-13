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
        Коллекция Колод
      </h1>
      <p class="text-loona-text-secondary text-sm">
        Выберите дизайн колоды Таро
      </p>
    </div>

    <div class="grid grid-cols-2 gap-4 pb-24">
      <GridCard
        v-for="(deck, index) in decks"
        :key="deck.id"
        :image="deck.image"
        :title="deck.name"
        :description="deck.description"
        :active="selectedDeckId === deck.id"
        :delay="index * 0.1"
        @click="selectDeck(deck.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GridCard from '../components/cards/GridCard.vue'
import { getImagePath } from '@/utils/imagePath.js'

const selectedDeckId = ref(1)
const decks = ref([])

const selectDeck = (deckId) => {
  selectedDeckId.value = deckId
  console.log('Selected deck:', deckId)
}

const loadDecks = () => {
  decks.value = [
    {
      id: 1,
      name: 'Классическая',
      description: 'Традиционные карты Таро',
      image: getImagePath('images/cards/major/00-TheFool.webp')
    },
    {
      id: 2,
      name: 'Современная',
      description: 'Современный дизайн',
      image: getImagePath('images/cards/major/01-TheMagician.webp')
    },
    {
      id: 3,
      name: 'Мистическая',
      description: 'Темная мистика',
      image: getImagePath('images/cards/major/02-TheHighPriestess.webp')
    },
    {
      id: 4,
      name: 'Цветочная',
      description: 'Нежные цветочные мотивы',
      image: getImagePath('images/cards/major/03-TheEmpress.webp')
    },
    {
      id: 5,
      name: 'Абстрактная',
      description: 'Современное искусство',
      image: getImagePath('images/cards/major/04-TheEmperor.webp')
    },
    {
      id: 6,
      name: 'Винтажная',
      description: 'Ретро стиль',
      image: getImagePath('images/cards/major/05-TheHierophant.webp')
    },
    {
      id: 7,
      name: 'Минималистичная',
      description: 'Простота и элегантность',
      image: getImagePath('images/cards/major/06-TheLovers.webp')
    },
    {
      id: 8,
      name: 'Фэнтези',
      description: 'Миры фэнтези',
      image: getImagePath('images/cards/major/07-TheChariot.webp')
    }
  ]
}

onMounted(() => {
  loadDecks()
})
</script>
