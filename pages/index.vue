<template>
  <div>
    Hello World
     {{ $t('homepage.news_title') }}
    <button class="btn" @click="test">Show a msg</button>
    <Recaptcha ref="captcha" />
  </div>
</template>

<script lang="ts" setup>
const { alerts, addAlert } = useAlert()
const captcha = ref()
const test = async () => {
  console.log(await captcha.value.execute())
}
</script>