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
  height: 100vh;
  width: 100vw;
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

.clickable {
  @apply active:scale-95 duration-150
}
</style>