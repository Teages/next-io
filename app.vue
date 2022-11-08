<template>
  <div class="w-full h-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
(async () => {
  console.log('cat3')
  const auth = useAuth()
  if (!auth.user.value) {
    const cookie = useCookie("cyt:sess")
    if (cookie.value && process.client) {
      console.log('cat2')
      await auth.loginWithCookie()
      console.log('cat4')
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
</style>