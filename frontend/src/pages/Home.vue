<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 relative">
    <div class="text-center z-10">
      <h1 class="text-3xl md:text-4xl font-press-start mb-4 bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple neon-text">
        🔮 Tarot Web App
      </h1>
      <p class="text-loona-text-primary text-sm mb-8 max-w-xs">
        Откройте тайны Вселенной с помощью карт Таро
      </p>
      
      <div class="mb-8">
        <div class="w-48 h-48 mx-auto flex items-center justify-center text-8xl animate-neon-glow">
          🌙
        </div>
      </div>

      <GradientButton
        variant="primary"
        class="text-lg"
        @click="startReading"
      >
        Гадать
      </GradientButton>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import GradientButton from '../components/ui/GradientButton.vue'

const router = useRouter()

const startReading = () => {
  router.push('/reading')
}
</script>
