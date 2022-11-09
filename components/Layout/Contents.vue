<!-- TODO: Move to Layout -->
<template>
  <div class="h-[800px] max-h-[50vh] relative">
    <div class="absolute bottom-0 left-0" id="contentTitle">
      <slot name="contentTitle" />
    </div>
  </div>
  <div class="mt-4 md:grid md:grid-cols-12 md:grid-flow-col md:gap-4">
    <div class="col-span-4" id="subContent">
      <slot name="subContent" />
    </div>

    <div class="col-span-8 mt-4 md:mt-0">
      <slot />
    </div>
  </div>
</template>