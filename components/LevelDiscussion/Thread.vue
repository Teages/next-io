<template>
  <ClientOnly>
    <div class="space-y-4 p-1">
        <LevelDiscussionCreate :thread="thread" :getToken="getToken" :afterPost="afterPost"/>
        <LevelDiscussionContent v-for="post in data" :post="post" :category="category" :levelId="levelId" :getToken="getToken" />
    </div>
  </ClientOnly>
</template>

<script setup>
const services = useService()
const props = defineProps({
  levelId: {
    type: String,
    required: true,
  },
  getToken: {
    type: Function,
    required: true
  }
})
const category = "level_discussion"
const thread = props.levelId

const loading = ref(true)
const data = ref([])
onMounted(async () => {
  data.value.push(...await services(`threads/${category}/${thread}`))
  loading.value = false
})
const afterPost = (newPost) => {
  data.value.push(newPost)
}
</script>