<template>
  <div class="min-h-screen px-4 py-6">
    <div
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
      class="mb-6"
    >
      <h1 class="text-center text-2xl font-press-start mb-2 bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple neon-text">
        Энциклопедия Таро
      </h1>
      <p class="text-center text-loona-text-secondary text-sm">
        Изучите значение каждой карты
      </p>
    </div>

    <div class="flex justify-center mb-6 gap-2">
      <button 
        class="px-4 py-2 rounded-lg font-bold transition-all duration-300"
        :class="activeTab === 'major' ? 'bg-loona-neon-gradient text-white' : 'bg-loona-purple text-loona-text-secondary'"
        @click="handleTabChange('major')"
      >
        Старшие арканы
      </button>
      <button 
        class="px-4 py-2 rounded-lg font-bold transition-all duration-300"
        :class="activeTab === 'minor' ? 'bg-loona-neon-gradient text-white' : 'bg-loona-purple text-loona-text-secondary'"
        @click="handleTabChange('minor')"
      >
        Младшие арканы
      </button>
    </div>

    <!-- Кнопка Назад для Младших арканов -->
    <button 
      v-if="activeTab === 'minor' && activeMinorType"
      class="flex items-center text-loona-neon mb-4 transition-all duration-200 hover:opacity-80"
      @click="activeMinorType = null"
    >
      <svg
        class="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Назад к типам
    </button>

    <!-- Блок описания категории -->
    <div 
      v-if="description" 
      v-motion
      :initial="{ opacity: 0, y: -10 }"
      :enter="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.3 }"
      class="mb-4 p-3 bg-loona-card-gradient rounded-xl border border-loona-purple"
    >
      <h2 class="text-center text-lg font-bold bg-clip-text text-transparent bg-loona-neon-gradient neon-text">
        {{ description.title }}
      </h2>
      <p class="text-sm text-loona-text-secondary mt-1">
        {{ description.description }}
      </p>
    </div>

    <!-- Сетка мастей (для Младших арканов) -->
    <div
      v-if="activeTab === 'minor' && !activeMinorType"
      class="grid grid-cols-2 gap-4 pb-24"
    >
      <div
        v-for="(suit, index) in minorSuits"
        :key="suit.id"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: index * 0.1 }"
        class="bg-loona-card-gradient border border-loona-purple shadow-neon rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
        @click="activeMinorType = suit.id"
      >
        <div class="aspect-[3/4] flex items-center justify-center p-2 bg-loona-card-bg">
          <img
            :src="suit.icon"
            :alt="suit.name"
            class="max-h-full max-w-full object-contain"
          >
        </div>
        <div class="p-3">
          <h3
            class="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple text-center"
          >
            {{ suit.name }}
          </h3>
        </div>
      </div>
    </div>

    <!-- Сетка карт (Старшие арканы или выбранная масть Младших) -->
    <div
      v-else
      class="grid grid-cols-2 gap-4 pb-24"
    >
      <GridCard
        v-for="(card, index) in filteredCards"
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
import { ref, computed } from 'vue'
import GridCard from '../components/cards/GridCard.vue'
import { getImagePath } from '@/utils/imagePath.js'

const activeTab = ref('major')
const activeMinorType = ref(null)

const categoryDescriptions = {
  major: {
    title: 'Старшие Арканы',
    description: 'Старшие Арканы — это фундаментальные архетипы и ключевые жизненные уроки. Их 22 карты символизируют основные этапы духовного пути, от начала (Шут) до завершения (Мир).'
  },
  cups: {
    title: 'Кубки',
    description: 'Кубки символизируют эмоции, чувства и внутренние переживания. Эта масть связана с интуицией, любовью и духовным ростом. Карты Кубков часто указывают на отношения и эмоциональные состояния.'
  },
  wands: {
    title: 'Жезлы',
    description: 'Жезлы представляют энергию, творчество и волю. Эта масть связана с действиями, начинаниями и личной силой. Карты Жезлов часто говорят о новых проектах и внутренней мотивации.'
  },
  pentacles: {
    title: 'Пентакли',
    description: 'Пентакли отвечают за материальный мир, финансы и физическое здоровье. Эта масть связана с практичностью, стабильностью и земными делами. Карты Пентаклей часто касаются работы и ресурсов.'
  },
  swords: {
    title: 'Мечи',
    description: 'Мечи символизируют разум, мышление и интеллект. Эта масть связана с конфликтами, решениями и ясностью ума. Карты Мечей часто указывают на ментальные вызовы и необходимость принятия решений.'
  }
}

const description = computed(() => {
  if (activeTab.value === 'major') {
    return categoryDescriptions.major
  } else if (activeTab.value === 'minor' && activeMinorType.value) {
    return categoryDescriptions[activeMinorType.value]
  }
  return null
})

const viewCard = (card) => {
  console.log('View card:', card)
}

const handleTabChange = (tab) => {
  activeTab.value = tab
  if (tab === 'major') {
    activeMinorType.value = null
  }
}

const majorArcana = [
  { id: 0, name: 'The Fool', image: getImagePath('images/cards/major/00-TheFool.webp'), shortDescription: 'Начало пути' },
  { id: 1, name: 'The Magician', image: getImagePath('images/cards/major/01-TheMagician.webp'), shortDescription: 'Мастерство' },
  { id: 2, name: 'The High Priestess', image: getImagePath('images/cards/major/02-TheHighPriestess.webp'), shortDescription: 'Интуиция' },
  { id: 3, name: 'The Empress', image: getImagePath('images/cards/major/03-TheEmpress.webp'), shortDescription: 'Изобилие' },
  { id: 4, name: 'The Emperor', image: getImagePath('images/cards/major/04-TheEmperor.webp'), shortDescription: 'Власть' },
  { id: 5, name: 'The Hierophant', image: getImagePath('images/cards/major/05-TheHierophant.webp'), shortDescription: 'Традиция' },
  { id: 6, name: 'The Lovers', image: getImagePath('images/cards/major/06-TheLovers.webp'), shortDescription: 'Любовь' },
  { id: 7, name: 'The Chariot', image: getImagePath('images/cards/major/07-TheChariot.webp'), shortDescription: 'Победа' },
  { id: 8, name: 'Strength', image: getImagePath('images/cards/major/08-Strength.webp'), shortDescription: 'Сила' },
  { id: 9, name: 'The Hermit', image: getImagePath('images/cards/major/09-TheHermit.webp'), shortDescription: 'Поиск истины' },
  { id: 10, name: 'Wheel of Fortune', image: getImagePath('images/cards/major/10-WheelOfFortune.webp'), shortDescription: 'Судьба' },
  { id: 11, name: 'Justice', image: getImagePath('images/cards/major/11-Justice.webp'), shortDescription: 'Справедливость' },
  { id: 12, name: 'The Hanged Man', image: getImagePath('images/cards/major/12-TheHangedMan.webp'), shortDescription: 'Жертва' },
  { id: 13, name: 'Death', image: getImagePath('images/cards/major/13-Death.webp'), shortDescription: 'Трансформация' },
  { id: 14, name: 'Temperance', image: getImagePath('images/cards/major/14-Temperance.webp'), shortDescription: 'Баланс' },
  { id: 15, name: 'The Devil', image: getImagePath('images/cards/major/15-TheDevil.webp'), shortDescription: 'Искушение' },
  { id: 16, name: 'The Tower', image: getImagePath('images/cards/major/16-TheTower.webp'), shortDescription: 'Разрушение' },
  { id: 17, name: 'The Star', image: getImagePath('images/cards/major/17-TheStar.webp'), shortDescription: 'Надежда' },
  { id: 18, name: 'The Moon', image: getImagePath('images/cards/major/18-TheMoon.webp'), shortDescription: 'Иллюзии' },
  { id: 19, name: 'The Sun', image: getImagePath('images/cards/major/19-TheSun.webp'), shortDescription: 'Радость' },
  { id: 20, name: 'Judgement', image: getImagePath('images/cards/major/20-Judgement.webp'), shortDescription: 'Возрождение' },
  { id: 21, name: 'The World', image: getImagePath('images/cards/major/21-TheWorld.webp'), shortDescription: 'Завершение' }
]

const getMinorCardName = (suit, number) => {
  const suitNames = {
    cups: 'Кубков',
    pentacles: 'Пентаклей',
    swords: 'Мечей',
    wands: 'Жезлов'
  }
  const cardNames = {
    1: 'Туз',
    2: 'Двойка',
    3: 'Тройка',
    4: 'Четверка',
    5: 'Пятерка',
    6: 'Шестерка',
    7: 'Семерка',
    8: 'Восьмерка',
    9: 'Девятка',
    10: 'Десятка',
    11: 'Паж',
    12: 'Рыцарь',
    13: 'Королева',
    14: 'Король'
  }
  return `${cardNames[number]} ${suitNames[suit]}`
}

const getMinorCardDescription = (suit, number) => {
  const descriptions = {
    cups: { 1: 'Эмоции', 2: 'Связь', 3: 'Радость', 4: 'Апатия', 5: 'Потеря', 6: 'Ностальгия', 7: 'Выбор', 8: 'Отказ', 9: 'Удовлетворение', 10: 'Счастье', 11: 'Чувствительность', 12: 'Романтика', 13: 'Эмпатия', 14: 'Мудрость' },
    pentacles: { 1: 'Материя', 2: 'Баланс', 3: 'Работа', 4: 'Жадность', 5: 'Бедность', 6: 'Щедрость', 7: 'Труд', 8: 'Навыки', 9: 'Богатство', 10: 'Процветание', 11: 'Обучение', 12: 'Дисциплина', 13: 'Безопасность', 14: 'Изобилие' },
    swords: { 1: 'Истина', 2: 'Неопределенность', 3: 'Сердце', 4: 'Отдых', 5: 'Поражение', 6: 'Бегство', 7: 'Обман', 8: 'Ограничение', 9: 'Тревога', 10: 'Конец', 11: 'Любопытство', 12: 'Действие', 13: 'Честность', 14: 'Разум' },
    wands: { 1: 'Идея', 2: 'Планирование', 3: 'Рост', 4: 'Празднование', 5: 'Конфликт', 6: 'Победа', 7: 'Вызов', 8: 'Скорость', 9: 'Стойкость', 10: 'Бремя', 11: 'Энтузиазм', 12: 'Путешествие', 13: 'Свобода', 14: 'Вдохновение' }
  }
  return descriptions[suit]?.[number] || 'Карта Таро'
}

const generateMinorArcanaBySuit = (suit) => {
  const cards = []
  
  for (let number = 1; number <= 14; number++) {
    const suitCapitalized = suit.charAt(0).toUpperCase() + suit.slice(1)
    const imagePath = getImagePath(`images/cards/minor/${suit}/${suitCapitalized}${String(number).padStart(2, '0')}.webp`)
    
    cards.push({
      id: `${suit}-${number}`,
      name: getMinorCardName(suit, number),
      image: imagePath,
      shortDescription: getMinorCardDescription(suit, number)
    })
  }
  
  return cards
}

const minorArcana = {
  cups: generateMinorArcanaBySuit('cups'),
  pentacles: generateMinorArcanaBySuit('pentacles'),
  swords: generateMinorArcanaBySuit('swords'),
  wands: generateMinorArcanaBySuit('wands')
}

const minorSuits = [
  { 
    id: 'cups', 
    name: 'Кубки', 
    icon: getImagePath('images/cards/minor/cups/Cups01.webp'),
    description: 'Эмоции и чувства'
  },
  { 
    id: 'wands', 
    name: 'Жезлы', 
    icon: getImagePath('images/cards/minor/wands/Wands01.webp'),
    description: 'Энергия и действия'
  },
  { 
    id: 'pentacles', 
    name: 'Пентакли', 
    icon: getImagePath('images/cards/minor/pentacles/Pentacles01.webp'),
    description: 'Материя и финансы'
  },
  { 
    id: 'swords', 
    name: 'Мечи', 
    icon: getImagePath('images/cards/minor/swords/Swords01.webp'),
    description: 'Разум и конфликты'
  }
]

const filteredCards = computed(() => {
  if (activeTab.value === 'major') {
    return majorArcana
  }
  
  if (activeTab.value === 'minor' && activeMinorType.value) {
    return minorArcana[activeMinorType.value] || []
  }
  
  return []
})
</script>
