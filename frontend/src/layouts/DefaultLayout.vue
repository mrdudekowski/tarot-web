<template>
  <div class="min-h-screen bg-loona-dark relative overflow-hidden">
    <StarryBackground />
    <main class="relative z-10 pb-20">
      <slot />
    </main>
    <BottomNav />
  </div>
</template>

<script setup>
import StarryBackground from '../components/ui/StarryBackground.vue'
import BottomNav from '../components/navigation/BottomNav.vue'
</script>
