<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-6 py-3 min-h-[48px] min-w-[48px] rounded-[24px] font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    :class="buttonClass"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClass = computed(() => {
  const variants = {
    primary: 'bg-gradient-to-r from-loona-neon to-loona-glow-purple shadow-button neon-glow',
    secondary: 'bg-white text-loona-purple shadow-lg',
    outline: 'bg-transparent border-2 border-loona-neon text-loona-neon hover:bg-loona-neon hover:text-white'
  }
  return variants[props.variant] || variants.primary
})
</script>
