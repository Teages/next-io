<template>
  <div v-if="background.source != ''" class="absolute select-none top-0 w-full h-fit flex" style="z-index: -1;">
    <div class="relative bg-cover bg-center flex-1">
      <img :src="background.source" class="w-full h-fit brightness-50" />
    <div class="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-base-100/0 to-base-100" />
    </div>
  </div>
  <Layout class="z-10">
    <slot />
  </Layout>
</template>

<script setup>
import Layout from './default.vue'
const { background } = useBackground()
</script>