<template>
  <div
    v-motion
    :initial="{ scale: 0.9, opacity: 0 }"
    :enter="{ scale: 1, opacity: 1 }"
    :transition="{ duration: 0.5, delay }"
    class="w-full max-w-[320px] h-[200px] rounded-[20px] overflow-hidden border border-loona-border shadow-card bg-loona-gradient relative mx-auto"
  >
    <img
      v-if="card?.image"
      :src="card.image"
      :alt="card?.name || 'Tarot Card'"
      class="w-full h-32 object-cover"
    />
    <div class="p-3">
      <h3
        v-if="card?.name"
        class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple neon-text"
      >
        {{ card.name }}
      </h3>
      <p
        v-if="card?.description"
        class="text-loona-text-primary text-sm mt-1 line-clamp-2"
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
</script>
