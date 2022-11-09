<template>
  <a class="flex items-center bg-base-100 bg-opacity-50 rounded-full select-none">
    <p v-if="name" class="pl-4 pr-2">
      {{ name }}
    </p>
    <div class="avatar h-full">
      <div class="aspect-square rounded-full">
        <img :src="avatar" />
      </div>
    </div>
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