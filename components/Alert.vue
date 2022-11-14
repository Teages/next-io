<template>
  <Transition>
    <div v-if="show" :class="`alert shadow-lg w-fit h-16 mx-auto my-4 alert-${type}`">
        <Icon :name="icon" size="24"/>
        <span> {{ message }} </span>
        <div v-if="details" class="flex-none">
          <button class="btn btn-sm btn-circle btn-ghost" @click="dialog = true">
            <Icon name="mdi:chevron-right" size="24" />
          </button>
        </div>
    </div>
  </Transition>
  <Teleport to="body">
    <div v-if="details">
      <div :class="'modal' + returnIf(dialog, ' modal-open', '')">
        <div class="modal-box">
          <h3 class="font-bold text-lg"> {{ message }} </h3>
          <p class="py-4"> {{ details }} </p>
          <div class="modal-action flex">
            <button @click="" class="btn btn-ghost"> Copy </button>
            <div class="flex-1" />
            <button @click="dialog = false" class="btn"> Close </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  icon: {
    type: String,
    default: 'material-symbols:error-circle-rounded-outline',
  },
  message: {
    type: String,
    required: true
  },
  details: {
    type: String,
    default: null
  },
  delay: {
    type: Number,
    default: 3
  }
})

const dialog = ref(false)
const show = ref(true)

onMounted(async () => {
  await wait(props.delay)
  show.value = false
})

</script>

<style scoped>
.not-use {
  @apply alert-info alert-success alert-warning alert-error
}
</style>