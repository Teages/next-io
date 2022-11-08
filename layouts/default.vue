<template>
  <div class="min-h-screen flex flex-col items-center mx-auto overflow-auto">
    <div class="w-full z-10">
      <NavBar />
    </div>
    <div class="flex-1 w-full max-w-screen-2xl">
      <slot />
    </div>
    <div class="w-full z-10">
      <Footer />
    </div>
  </div>
</template>