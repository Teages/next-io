<template>
  <Layout>
    <div class="max-w-sm m-auto sm:mr-0">
      <div class="w-full">
        <div class="py-2">
          <slot />
        </div>
      </div>
    </div>
  </Layout>
</template>


<script setup>
import Layout from './background.vue'
const { setBackground } = useBackground()
setBackground('https://static.cytoid.io/img/session.jpg')
</script>