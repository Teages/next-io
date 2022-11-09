<template>
  <div class="w-full h-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <AlertBox />
</template>

<script setup>
(async () => {
  const auth = useAuth()
  if (!auth.user.value) {
    const cookie = useCookie("cyt:sess")
    if (cookie.value && process.client) {
      await auth.loginWithCookie()
    }
  }
})();
</script>

<style>
html,
body {
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden
}

/* Daisy Custom */

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