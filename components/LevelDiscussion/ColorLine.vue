<template>
  <div :class="addClassIf('flex flex-col', 'opacity-60', isClosed)">
    <div v-if="mode === 'recommendation'" class="badge badge-xs badge-success ml-3 my-3 flex-1">
    </div>
    <div v-else-if="mode === 'praise'" class="badge badge-xs badge-error ml-3 my-3 flex-1">
    </div>
    <div v-else-if="mode === 'problem'" class="badge badge-xs badge-warning ml-3 my-3 flex-1">
    </div>
    <div v-else-if="mode === 'suggestion'" class="badge badge-xs badge-info ml-3 my-3 flex-1">
    </div>
    <div v-else-if="mode === ''" class="badge badge-xs badge-primary ml-3 my-3 flex-1">
    </div>
    <div v-else class="badge badge-xs badge-neutral ml-3 my-3 flex-1">
    </div>
  </div>
</template>

<script setup>
defineProps({
  mode: String,
  isClosed: Boolean
})
</script>