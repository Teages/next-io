<template>
  <ClientOnly>
    <Teleport to="body">
      <VueRecaptcha id="google-captcha" ref="captcha" :sitekey="sitekey" recaptcha-host="www.recaptcha.net"
        size="invisible" badge="bottomleft" @verify="onVerify" @expired="onExpired" class="" />
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { VueRecaptcha } from "vue-recaptcha";

const config = useRuntimeConfig()
const sitekey = config.public.captchaKey
const captcha = ref()

const method = {
  resolve: null,
  reject: null
}

const onSubmit = () => {
  captcha.value.execute()
}
const onVerify = (response) => {
  method.resolve(response)
  method.resolve = null
  method.reject = null
  captcha.value.reset()
}
const onExpired = () => {
  method.reject(new Error('token expired'))
  method.resolve = null
  method.reject = null
  captcha.value.reset()
}

const execute = () => {
  return new Promise((resolve, reject) => {
    onSubmit()
    method.resolve = resolve
    method.reject = reject
  })
}

defineExpose({
  execute,
})
</script>