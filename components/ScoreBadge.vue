<template>
  <div v-if="scoreGrade === 'MAX'" class="badge badge-sm badge-warning">{{ scoreGrade }}</div>
  <div v-else-if="scoreGrade === 'SSS'" class="badge badge-sm badge-info">{{ scoreGrade }}</div>
  <div v-else class="badge badge-neutral badge-sm">{{ scoreGrade }}</div>
</template>

<script setup>
const props = defineProps({
  score: {
    type: Number,
    required: true
  }
})

const scoreGrade = computed(() => [
  [0, 'F'],
  [600000, 'D'],
  [700000, 'C'],
  [800000, 'B'],
  [900000, 'A'],
  [990000, 'S'],
  [995000, 'SS'],
  [999000, 'SSS'],
  [1000000, 'MAX'],
].reduce((prev, [cutoff, str]) => (props.score >= cutoff) ? str : prev, 'F'))
</script>