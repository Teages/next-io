<template>
  <div class="w-full h-full">
    <NuxtLayout>
      <NuxtLoadingIndicator color="#9CAFEC" />
      <NuxtPage />
    </NuxtLayout>
  </div>
  <AlertBox />
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch';

// i18n
(() => {
  const headers = useRequestHeaders(['accept-language'])
  const { availableLocales, setLocale, localeCookie } = useLocales()
  if (localeCookie.value) {
    // Something debug
    return
  } else {
    // auto lang
    const acceptLang = headers['accept-language']
    if (acceptLang) {
      let acceptLangs = acceptLang.split(',')
      let acceptLangList = acceptLangs.map((lang) => {
        let [name, langQ] = lang.split(';')
        let q = langQ ? parseFloat(langQ.split('=')[1]) : 1
        let langM = { name, q }
        return langM
      }).sort((a, b) => b.q - a.q)
      for (let lang of acceptLangList) {
        for (let availableLang of availableLocales) {
          if (lang.name.toLowerCase() == availableLang.toLowerCase()) {
            setLocale(lang.name)
            return
          }
        }
      }
    }
  }
})();

// auth
(async () => {
  const auth = useAuth()
  if (process.client) {
    auth.loginTrying.value = true
    await wait() // Idk but the nex line will return null if I don't wait a millisecond
    const user = await auth.loginWithCookie().catch((error:FetchError) => {
      if (error.response?.status != 401) {
        console.log(`auto login err(code: ${error.response?.status}):`, error.data)
      }
    })
    auth.loginTrying.value = false
  }
})();

</script>

<style>
html,
body {
  min-height: 100vh;
  width: 100%;
}

body {
  @apply bg-black bg-opacity-30 break-words
}

/* Daisy Custom */

.badge {
  @apply select-none;
}

.card-subtitle {
  @apply text-neutral-content font-bold uppercase opacity-80;
}

.prose-sm a {
  @apply text-primary;
}

.btn-disabled, .btn-disabled:hover, .btn[disabled], .btn[disabled]:hover {
  --tw-bg-opacity: 0.8;
  --tw-text-opacity: 0.6;
}

.btn-sm {
  @apply font-medium;
}

.alert {
  @apply flex-row
}
.alert > span {
  margin-top: 0 !important;
}

.duration-fast {
  @apply duration-100
}
.duration {
  @apply duration-150
}
.duration-slow {
  @apply duration-300
}
/* Vue Transition */
.v-enter-active,
.v-leave-active {
  @apply transition-opacity duration ease-in-out
}
.v-enter-from,
.v-leave-to {
  @apply opacity-0
}


.clickable {
  @apply active:scale-95 duration cursor-pointer
}
.not-clickable {
  @apply cursor-default
}

.menu .menu-title > * {
  @apply text-neutral-content
}
</style>