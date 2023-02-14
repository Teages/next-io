<template>
  <div class="min-h-screen flex flex-col items-center mx-auto overflow-auto">
    <div class="w-full z-10">
      <NavBar />
    </div>
    <div class="flex-1 w-full max-w-screen-2xl">
      <div class="py-4 px-4 lg:px-12">
        <slot />
      </div>
    </div>
    <div class="w-full">
      <Footer />
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

// Head
// useHead();

</script>