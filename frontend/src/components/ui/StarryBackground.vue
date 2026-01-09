<template>
  <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <div
      v-for="star in stars"
      :key="star.id"
      class="absolute rounded-full bg-white"
      :style="{
        left: star.x + '%',
        top: star.y + '%',
        width: star.size + 'px',
        height: star.size + 'px',
        opacity: star.opacity,
        animation: `star-twinkle ${star.duration}s ease-in-out infinite`,
        animationDelay: star.delay + 's'
      }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stars = ref([])

const generateStars = () => {
  const starCount = 50
  stars.value = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 3
  }))
}

onMounted(() => {
  generateStars()
})
</script>
