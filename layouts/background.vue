<template>
  <div v-if="background.source != ''" class="absolute select-none w-full h-full top-0" style="z-index: -1;">
    <div class="w-full h-screen sm:max-h-[100vw] bg-center bg-cover brightness-75" :style="`background-image: url('${background.source}')`">  
      <div class="absolute top-0 h-32 w-full bg-gradient-to-b from-base-100/60 to-base-100/0" />
      <div class="absolute bottom-0 h-2/3 w-full bg-gradient-to-b from-base-100/0 to-base-100" />
    </div>
  </div>
  <Layout>
    <slot />
  </Layout>
</template>

<script setup>
import Layout from './default.vue'
const { background, resetBackground } = useBackground()
resetBackground()
</script>