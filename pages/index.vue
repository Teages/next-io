<template>
  <div>
    Hello World
     {{ $t('homepage.news_title') }}
    <button class="btn" @click="test">Show a msg</button>
  </div>
</template>

<script lang="ts" setup>
const { alerts, addAlert } = useAlert()
const test = () => {
  addAlert({
    message: 'hello'
  })
}
</script>