<template>
  <div :class="`w-min max-w-xs diff-badge rounded-full diff-badge-${_type} tooltip tooltip-primary`" :data-tip="notesCount ? `${notesCount} notes` : ``">
    <div class="diff-badge-body py-2 px-5 flex justify-center	items-center">
      <div>
        <span class="diff-badge-lv">Lv.</span>{{ difficulty }}
      </div>
      <span class="diff-badge-name truncate ml-2">{{ _name }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: null
  },
  notesCount: {
    type: Number,
    default: null
  }
})

const _type = computed(() => props.type.toLowerCase())
const _name = computed(() => {
  if (props.name) {
    return props.name
  }
  return _type.value.charAt(0).toUpperCase() + _type.value.slice(1)
})
</script>

<style scoped>
.hide-lv .diff-badge-lv {
  display: none;
}
.hide-name .diff-badge-name {
  display: none;
}
.diff-badge-easy {
  background: linear-gradient(to bottom right, #4ca2cd, #67B26F);
  order: 1;
}

.diff-badge-hard {
  background: linear-gradient(to top left, #B06AB3, #4568DC);
  order: 2;
}

.diff-badge-extreme {
  background: linear-gradient(to top left, #6f0000, #200122);
  order: 3;
}

</style>