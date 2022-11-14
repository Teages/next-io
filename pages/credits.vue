<template>
  <div class="hero">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <img src="https://artifacts.cytoid.io/logo.png" />
        <p class="py-6">A community-driven music game</p>
      </div>
    </div>
  </div>
  <div v-for="section in data.content">
    <div v-if="!section.title" class="mb-4" />
    <div v-else class="mt-0 w-full flex justify-center">
      <div class="px-2 flex-1">
        <div class="ml-auto w-fit opacity-75 tracking-widest">
          {{ section.title }}
        </div>
      </div>
      <div class="px-2 flex-1">
        <div v-for="member in section.members"> {{ member }} </div>
      </div>
    </div>
  </div>
  <div>
    <p class="w-fit mx-auto my-8">
      We would like to thank our {{ data.patronsCount }} patrons who donated to keep our servers alive.
    </p>
  </div>
  <div class="px-4">
    <NuxtLink v-for="patron in data.patrons" :to="`/profile/${patron.owner.uid}`" :key="patron.id"
      class="ml-1 my-4 flex items-center">
      <div class="avatar h-8 px-4 w-fit bg-opacity-0">
        <div class="aspect-square rounded-full">
          <img :src="patron.owner.avatar.small" />
        </div>
      </div>

      <p> {{ patron.owner.name || patron.owner.uid }} </p>
      <p class="px-2 opacity-75">{{ patron.quote }}</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute()
const services = useService()
const { data } = await services('/creditmeta')
</script>