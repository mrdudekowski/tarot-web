<template>
  <div
    v-motion
    :initial="{ scale: 0.9, opacity: 0 }"
    :enter="{ scale: 1, opacity: 1 }"
    :transition="{ duration: 0.5, delay }"
    class="w-full max-w-[320px] rounded-[20px] overflow-hidden border border-loona-purple shadow-neon bg-loona-card-gradient relative mx-auto"
  >
    <div class="aspect-[3/4] flex items-center justify-center p-2 bg-loona-card-bg">
      <img
        v-if="card?.image"
        :src="card.image"
        :alt="card?.name || 'Tarot Card'"
        class="w-full h-full object-contain"
        @error="handleImageError"
      />
      <div v-else class="text-loona-text-secondary text-center p-4">
        <p>Изображение не найдено</p>
      </div>
    </div>
    <div class="p-3">
      <h3
        v-if="card?.name"
        class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple neon-text"
      >
        {{ card.name }}
      </h3>
      <p
        v-if="card?.description"
        class="text-loona-text-primary text-sm mt-1"
      >
        {{ card.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  card: {
    type: Object,
    default: () => ({})
  },
  delay: {
    type: Number,
    default: 0
  }
})

const handleImageError = (event) => {
  console.warn('Ошибка загрузки изображения:', props.card?.image)
  event.target.style.display = 'none'
}
</script>

<style scoped>
.neon-text {
  text-shadow: 0 0 10px rgba(230, 0, 255, 0.5);
}
</style>
