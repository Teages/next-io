<template>
  <div class="rating rating-half items-center">
    <input type="radio" name="rating-10" v-model="proxy" value="0" class="rating-hidden" />
    <input type="radio" name="rating-10" v-model="proxy" value="1" class="bg-yellow-600 mask mask-star-2 mask-half-1" />
    <input type="radio" name="rating-10" v-model="proxy" value="2" class="bg-yellow-600 mask mask-star-2 mask-half-2" />
    <input type="radio" name="rating-10" v-model="proxy" value="3" class="bg-yellow-600 mask mask-star-2 mask-half-1" />
    <input type="radio" name="rating-10" v-model="proxy" value="4" class="bg-yellow-600 mask mask-star-2 mask-half-2" />
    <input type="radio" name="rating-10" v-model="proxy" value="5" class="bg-yellow-600 mask mask-star-2 mask-half-1" />
    <input type="radio" name="rating-10" v-model="proxy" value="6" class="bg-yellow-600 mask mask-star-2 mask-half-2" />
    <input type="radio" name="rating-10" v-model="proxy" value="7" class="bg-yellow-600 mask mask-star-2 mask-half-1" />
    <input type="radio" name="rating-10" v-model="proxy" value="8" class="bg-yellow-600 mask mask-star-2 mask-half-2" />
    <input type="radio" name="rating-10" v-model="proxy" value="9" class="bg-yellow-600 mask mask-star-2 mask-half-1" />
    <input type="radio" name="rating-10" v-model="proxy" value="10" class="bg-yellow-600 mask mask-star-2 mask-half-2" />
  </div>
  <div>
  {{ proxy }}
  </div>
</template>

<script setup>
const emit = defineEmits();
const props = defineProps({
  rating: Number,
  required: true
});

console.log(props.rating)

const proxy = computed({
  get() {
    return props.rating
  },
  set(v) {
    emit("update:rating", v)
  }
})


</script>