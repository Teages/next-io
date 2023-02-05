<template>
  <div class="flex">
    <div class="flex pt-4">
      <div class="flex-1" />
      <div class="btn-group shadow-xl">
        <button v-if="toFirstPage" class="btn btn-sm" :disabled="_isFirstPage || disabled" @click="toFirstPage">
          <Icon name="ic:round-keyboard-double-arrow-left" />
        </button>
        <button v-if="toPrevPage" class="btn btn-sm" :disabled="_isFirstPage || disabled" @click="toPrevPage">
          <Icon name="ic:round-keyboard-arrow-left" />
        </button>
        <button v-if="page" class="btn font-bold btn-sm btn-primary" :disabled="disabled">
          {{ page }}
          <template v-if="totalPage">
            / {{ totalPage }}
          </template>
        </button>
        <button v-if="toNextPage" class="btn btn-sm" :disabled="_isFinalPage || disabled" @click="toNextPage">
          <Icon name="ic:round-keyboard-arrow-right" />
        </button>
        <button v-if="toFinalPage" class="btn btn-sm" :disabled="_isFinalPage || disabled" @click="page = toFinalPage">
          <Icon name="ic:round-keyboard-double-arrow-right" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  toFirstPage: Function,
  toPrevPage: Function,
  toNextPage: Function,
  toFinalPage: Function,
  page: Number,
  totalPage: Number,
  
  isFirstPage: Boolean,
  isFinalPage: Boolean,

  disabled: Boolean,
})

const _isFirstPage = computed(() => {
  if (props.isFirstPage) {
    return props.isFirstPage()
  }
  if (props.page !== undefined && props.totalPage !== undefined) {
    return props.page == 1
  }
  return false
})

const _isFinalPage = computed(() => {
  if (props.isFinalPage) {
    return props.isFinalPage()
  }
  if (props.page !== undefined && props.totalPage !== undefined) {
    return props.page == props.totalPage
  }
  return false
})

</script>