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
        Энциклопедия Таро
      </h1>
      <p class="text-loona-text-secondary text-sm">
        Изучите значение каждой карты
      </p>
    </div>

    <div class="grid grid-cols-2 gap-4 pb-24">
      <GridCard
        v-for="(card, index) in tarotCards"
        :key="card.id"
        :image="card.image"
        :title="card.name"
        :description="card.shortDescription"
        :delay="index * 0.1"
        @click="viewCard(card)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GridCard from '../components/cards/GridCard.vue'

const router = useRouter()
const tarotCards = ref([])

const viewCard = (card) => {
  console.log('View card:', card)
}

const loadTarotCards = () => {
  const majorArcana = [
    { id: 0, name: 'The Fool', image: '/images/cards/major/00-TheFool.webp', shortDescription: 'Начало пути' },
    { id: 1, name: 'The Magician', image: '/images/cards/major/01-TheMagician.webp', shortDescription: 'Мастерство' },
    { id: 2, name: 'The High Priestess', image: '/images/cards/major/02-TheHighPriestess.webp', shortDescription: 'Интуиция' },
    { id: 3, name: 'The Empress', image: '/images/cards/major/03-TheEmpress.webp', shortDescription: 'Изобилие' },
    { id: 4, name: 'The Emperor', image: '/images/cards/major/04-TheEmperor.webp', shortDescription: 'Власть' },
    { id: 5, name: 'The Hierophant', image: '/images/cards/major/05-TheHierophant.webp', shortDescription: 'Традиция' },
    { id: 6, name: 'The Lovers', image: '/images/cards/major/06-TheLovers.webp', shortDescription: 'Любовь' },
    { id: 7, name: 'The Chariot', image: '/images/cards/major/07-TheChariot.webp', shortDescription: 'Победа' },
  ]
  
  tarotCards.value = majorArcana
}

onMounted(() => {
  loadTarotCards()
})
</script>
