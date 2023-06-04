<template>
  <div class="flex">
    <div v-if="!open" class="flex pt-4">
      <div class="flex-1" />
      <div class="join shadow-xl">
        <button v-if="toFirstPage" class="join-item btn btn-sm" :disabled="_isFirstPage || disabled" @click="toFirstPage">
          <Icon name="ic:round-keyboard-double-arrow-left" />
        </button>
        <button v-if="toPrevPage" class="join-item btn btn-sm" :disabled="_isFirstPage || disabled" @click="toPrevPage">
          <Icon name="ic:round-keyboard-arrow-left" />
        </button>
        <button v-if="page" class="join-item btn font-bold btn-sm btn-primary" @click="open = (jumpToPage != null)" :disabled="disabled">
          {{ page }}
          <template v-if="totalPage">
            / {{ totalPage }}
          </template>
        </button>
        <button v-if="toNextPage" class="join-item btn btn-sm" :disabled="_isFinalPage || disabled" @click="toNextPage">
          <Icon name="ic:round-keyboard-arrow-right" />
        </button>
        <button v-if="toFinalPage" class="join-item btn btn-sm" :disabled="_isFinalPage || disabled" @click="toFinalPage">
          <Icon name="ic:round-keyboard-double-arrow-right" />
        </button>
      </div>
    </div>
    
    <div v-else class="flex pt-4">
      <div class="join text-base-content w-full flex">
        <button class="join-item btn btn-sm btn-square" @click="open=false" :disabled="disabled">
          <Icon name="material-symbols:close" size="24" />
        </button>
        <input v-model="customPage" type="number" :placeholder="page" :min="1" :max="totalPage" class="join-item input input-sm text-center w-20 input-bordered appearance-none"
          @keyup.enter.native="null">
        <button v-if="totalPage" class="join-item btn w-20 font-bold btn-sm" @click="customPage = totalPage" :disabled="disabled">
          / {{ totalPage }}
        </button>
        <button class="join-item btn btn-sm btn-primary btn-square" @click="_jumpToPage" :disabled="disabled || customPage == ''">
          <Icon name="ic:twotone-keyboard-arrow-right" size="24" />
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
  
  jumpToPage: Function,
  
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

const customPage = ref('')
const _jumpToPage = () => {
  const _customPage = parseInt(customPage.value) || 1
  props.jumpToPage(_customPage)
  open.value = false
  customPage.value = ''
}
const open = ref(false)
</script>