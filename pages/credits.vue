<template>
  <!-- {{ data }} -->
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
  <div>
    <NuxtLink v-for="patron in data.patrons" :to="`/profile/${patron.owner.uid}`" :key="patron.id"
      class="ml-1 my-4 flex items-center">
      <UserAvatar :avatar="patron.owner.avatar.small" :name="patron.owner.name || patron.owner.uid"
        class="h-8 w-fit bg-opacity-0" />
      <p class="px-2 opacity-75">{{ patron.quote }}</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute()
const { data } = await useService('/creditmeta')
</script>