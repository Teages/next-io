<template>
  <div class="alert alert-success shadow-lg w-fit h-16 mx-auto my-4">
      <Icon :name="icon" size="24"/>
      <span> {{ message }} </span>
      <div v-if="details" class="flex-none">
        <button class="btn btn-sm btn-circle btn-success" @click="dialog = true">
          <Icon name="mdi:chevron-right" size="24" />
        </button>
      </div>
  </div>
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
defineProps({
  icon: {
    type: String,
    default: 'mdi:check-circle-outline',
  },
  message: {
    type: String,
    required: true
  },
  details: {
    type: String,
    default: null
  }
})

const dialog = ref(false)
</script>