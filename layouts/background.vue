<template>
  <div class="fixed select-none top-0 w-screen h-screen flex">
    <div class="bg-cover bg-center flex-1"
      style="background-image: url('https://static.cytoid.io/img/session.jpg');filter: brightness(0.5);">
    </div>
    <div class="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-base-100">

    </div>
  </div>
  <Layout>
    <slot />
  </Layout>
</template>

<script setup>
import Layout from './default.vue'
</script>