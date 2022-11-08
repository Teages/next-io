<template>
  <div class="absolute select-none top-0 w-full h-full flex" style="z-index: -1;">
    <div class="bg-cover bg-center flex-1"
      style="background-image: url('https://static.cytoid.io/img/session.jpg');filter: brightness(0.5);">
    </div>
    <div class="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-base-100" />
  </div>
  <Layout class="z-10">
    <slot />
  </Layout>
</template>

<script setup>
import Layout from './default.vue'
</script>