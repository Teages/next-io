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

html {
  font-family: Nunito,'Noto Sans', 'Noto Sans TC','M PLUS Rounded\ 1c',system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif
  /* use Traditional Chinese as default Chinese Character */
}
html[lang="zh-CN"] {
  font-family: Nunito,'Noto Sans', 'Noto Sans SC','M PLUS Rounded\ 1c',system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif
}
html[lang="zh-FJ"] {
  font-family: Nunito,'Noto Sans', 'Noto Sans SC','M PLUS Rounded\ 1c',system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif
}
html[lang="zh-TW"] {
  font-family: Nunito,'Noto Sans', 'Noto Sans TC','M PLUS Rounded\ 1c',system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif
}
html[lang="ja-JP"] {
  font-family: Nunito,'Noto Sans', 'Noto Sans JP','M PLUS Rounded\ 1c',system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif
}
html[lang="ko-KR"] {
  font-family: Nunito,'Noto Sans', 'Noto Sans KR','M PLUS Rounded\ 1c',system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif
}
body {
  @apply bg-black bg-opacity-30 break-words
}

/* Cytoid */

.bg-image-loading {
  @apply bg-cover bg-center;
  background-image: url('~/assets/loading.svg');
  background-size: 20%;
  background-repeat: no-repeat;
}

.category-badge-featured {
  @apply text-base-content font-bold border-none;
  background: linear-gradient(to right bottom, #b91d73, #f953c6);
  order: 1;
}
.category-badge-qualified {
  @apply text-base-content font-bold border-none;
  background: linear-gradient(to right bottom, #1D976C, #1cb068);
  order: 2;
}

.diff-badge-easy {
  @apply text-base-content border-none;
  background: linear-gradient(to bottom right, #4ca2cd, #67B26F);
  order: 1;
}

.diff-badge-hard {
  @apply text-base-content border-none;
  background: linear-gradient(to top left, #B06AB3, #4568DC);
  order: 2;
}

.diff-badge-extreme {
  @apply text-base-content border-none;
  background: linear-gradient(to top left, #6f0000, #200122);
  order: 3;
}

/* Daisy Custom */
input[type=number].appearance-none::-webkit-inner-spin-button, 
input[type=number].appearance-none::-webkit-outer-spin-button { 
  -webkit-appearance: none;
  margin: 0; 
}
input[type=number].appearance-none {
  -moz-appearance:textfield;
}

.badge {
  @apply select-none;
}

.card-subtitle {
  @apply text-neutral-content font-bold uppercase opacity-80;
}

.prose-sm a {
  @apply text-primary;
}

.btn-active-text {
  @apply hidden
}

.btn-active .btn-active-text {
  @apply block
}

.btn-disabled, .btn-disabled:hover, .btn[disabled], .btn[disabled]:hover {
  --tw-bg-opacity: 0.8;
  --tw-text-opacity: 0.6;
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