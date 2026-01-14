<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5, delay }"
    class="bg-loona-card-gradient border border-loona-purple shadow-neon rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
    :class="{ 'ring-2 ring-loona-neon': active }"
    @click="$emit('click', $event)"
  >
    <div class="aspect-[3/4] flex items-center justify-center p-2 bg-loona-card-bg">
      <ImageSkeleton
        v-if="image"
        :src="image"
        :alt="title || 'Card'"
        class="w-full h-full"
      />
    </div>
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
import ImageSkeleton from './ImageSkeleton.vue'

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
