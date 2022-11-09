<template>
  <a class="flex items-center bg-gray-700 bg-opacity-50 rounded-full select-none">
    <div class="avatar h-full">
      <div class="aspect-square rounded-full">
        <img :src="avatar" />
      </div>
    </div>
    <p v-if="name" class="mx-2">
      {{ name }}
    </p>
    <div v-if="name" class="w-2" />
  </a>
</template>

<script setup>
defineProps({
  avatar: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: null
  },
  uid: {
    type: String,
    default: null
  }
})
</script>