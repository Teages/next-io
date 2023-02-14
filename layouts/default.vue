<template>
  <Layout>
    <slot />
  </Layout>
</template>

<script setup>
import Layout from './basic.vue'
const config = useRuntimeConfig()

const { resetBackground } = useBackground()
resetBackground()
</script>