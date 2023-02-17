<template>
  <StudioMenu
    :active="active"
    :back="`/levels/${levelId}`"
    :context="[]"
  />
</template>


<script setup>
const props = defineProps({
  active: String,
  levelId: {
    type: String,
    required: true
  },
})

const context = ([
  'Level Discussion',
  {title: 'Discussion', id: `discussion`, to: `/levels/${props.levelId}/discussion`},
  {title: 'Qualified', id: `qualified`, to: `/levels/${props.levelId}/discussion/qualified`},
])
</script>