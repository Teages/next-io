<template>
  <div class="px-4 sm:px-16">
    <div class="mt-4 md:grid md:grid-cols-12 md:grid-flow-col md:gap-4">
      <div class="col-span-3" id="StudioMenu">
        <slot name="StudioMenu" />
      </div>

      <div class="col-span-9 mt-4 md:mt-0">
        <slot />
      </div>
    </div>
  </div>
</template>