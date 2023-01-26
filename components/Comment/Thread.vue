<template>
  <ClientOnly>
    <div class="space-y-4 mt-8 p-1">
        <CommentCreate :category="category" :thread="thread" :getToken="getToken" :afterPost="afterPost"/>
        <CommentContent v-for="post in data" :post="post" :category="category" :thread="thread" :getToken="getToken" />
    </div>
  </ClientOnly>
</template>

<script setup>
const services = useService()
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
  thread: {
    type: String,
    required: true,
  },
  getToken: {
    type: Function,
    required: true
  }
})
const loading = ref(true)
const data = ref([])
onMounted(async () => {
  data.value.push(...await services(`threads/${props.category}/${props.thread}`))
  loading.value = false
})
const afterPost = (newPost) => {
  data.value.push(newPost)
}
</script>