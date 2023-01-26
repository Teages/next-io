<template>
  <a v-if="!uid" class="flex items-center bg-gray-700 bg-opacity-50 rounded-full select-none">
    <div class="avatar h-full aspect-square">
      <div class="aspect-square rounded-full">
        <img :src="avatar" />
      </div>
    </div>
    <p v-if="name" class="mx-2">
      {{ name }}
    </p>
    <div v-if="name" class="w-2" />
  </a>
  <NuxtLink v-else class="flex items-center bg-gray-700 bg-opacity-50 rounded-full select-none" :to="{name: 'profile-id', params: { id: uid }}">
    <div class="avatar h-full aspect-square">
      <div class="aspect-square rounded-full">
        <img :src="avatar" />
      </div>
    </div>
    <p v-if="name" class="mx-3 flex-none truncate">
      {{ name }}
    </p>
    <div v-if="name" class="w-2" />
  </NuxtLink>
</template>

<script setup>
defineProps({
  avatar: {
    type: String,
    default: 'https://artifacts.cytoid.io/avatar.jpg'
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