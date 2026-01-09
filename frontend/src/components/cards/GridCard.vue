<template>
  <div
    v-motion
    :initial="{ scale: 0.9, opacity: 0 }"
    :enter="{ scale: 1, opacity: 1 }"
    :transition="{ duration: 0.3, delay }"
    class="rounded-[20px] overflow-hidden border border-loona-border shadow-card bg-loona-gradient cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 aspect-[320/200]"
    :class="{ 'ring-2 ring-loona-neon': active }"
    @click="$emit('click', $event)"
  >
    <img
      v-if="image"
      :src="image"
      :alt="title || 'Card'"
      class="w-full h-32 object-cover"
    />
    <div class="p-3">
      <h3
        v-if="title"
        class="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-loona-neon to-loona-glow-purple"
      >
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="text-loona-text-secondary text-xs mt-1 line-clamp-2"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  },
  delay: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['click'])
</script>
