<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <img src="https://artifacts.cytoid.io/logo.png"/>
        <p class="py-6">A community-driven music game</p>
      </div>
    </div>
  </div>
  <div v-for="section in data.content" class="w-full">
    <div v-if="!section.title" class="mb-4" />
    <div v-else class="mt-0 w-full flex justify-center">
      <div class="px-2"> {{ section.title }} </div>
      <div class="px-2">
        <div v-for="member in section.members"> {{ member }} </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data } = await useFetch(useService('/creditmeta'))
</script>