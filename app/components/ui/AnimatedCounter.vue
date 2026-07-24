<template>
  <div class="inline-block" ref="elementRef">
    <span class="text-3xl font-display font-bold text-text-primary tabular-nums">
      {{ isReducedMotion ? target : value }}<span v-if="suffix">{{ suffix }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useCountUp } from '~/composables/useCountUp'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = defineProps({
  target: { type: Number, required: true },
  suffix: { type: String, default: '' },
  duration: { type: Number, default: 2 },
  delay: { type: Number, default: 0 }
})

const { isReducedMotion } = useReducedMotion()
const { value, elementRef } = useCountUp(props.target, props.duration, props.delay)
</script>
