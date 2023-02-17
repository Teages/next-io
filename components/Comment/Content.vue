<template>
  <div class="flex gap-x-4">
    <div v-if="!small">
      <UserAvatar :avatar="post.owner.avatar.small" :uid="post.owner.uid" class="h-12 clickable bg-transparent" />
    </div>
    <div :class="addClassIf('flex-1 overflow-hidden card bg-base-200 min-h-16', 'shadow-xl', !small)">
      <div class="card-body p-6">
        <div class="flex justify-start text-sm font-bold">
          <UserAvatar v-if="small" :avatar="post.owner.avatar.small" :uid="post.owner.uid" class="h-5 mr-2 bg-transparent" style="display: inline-block;"/>
          <NuxtLink :to="`/profile/${post.owner.uid}}`">
            {{ post.owner.name || post.owner.uid }}
          </NuxtLink>
          <span class="pl-3 font-normal opacity-60">
            <span v-if="!small" class="hidden sm:inline">
              {{ dateFormatCalendar(post.date) }}, 
            </span>
              {{ dateFromNow(post.date) }}
          </span>
        </div>
        <p class="pl-4 break-words prose" v-html="useMarked(post.content)" />
        <div class="flex card-actions">
          <template v-if="post.count">
            <button v-if="!showMore" @click="showMore = true" class="btn btn-ghost btn-sm">
              <Icon name="material-symbols:keyboard-arrow-down" class="mr-4" size="24" />
              {{ $t('general.comment_see_replies', post.count) }}
            </button>
            <button v-else @click="showMore = false" class="btn btn-ghost btn-sm">
              <Icon name="material-symbols:keyboard-arrow-up" class="mr-4" size="24" />
              {{ $t('general.comment_hide_replies', post.count) }}
            </button>
          </template>
          <div class="flex-1" />
          <button class="btn btn-primary btn-sm" @click="showReply = !showReply">{{ $t('general.comment_reply') }}</button>
        </div>
        <template v-if="showReply">
            <CommentCreate small="true" :category="category" :thread="thread" :parent="post.id" :getToken="getToken" :afterPost="afterPost"/>
        </template>
        <template v-if="showMore">
          <div class="border-solid border-l-2 border-gray-600"/>
          <CommentContent v-for="_post in data" :post="_post" :getToken="getToken" :small="true" class="border-solid border-l-2 border-gray-600"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = useService()
const props = defineProps({
  post: {
    type: Object,
    required: true
  },
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
  },
  small: Boolean
})
const showReply = ref(false)
const showMore = ref(false)
const loading = ref(true)
const data = ref([])
const replyCount = ref(props.post.count ?? 0)
watch(showMore, async (val) => {
  if (data.value.length === 0 && val) {
    data.value.push(...await services(`comments/${props.post.id}`))
    loading.value = false
  }
})
const afterPost = (newPost) => {
  data.value.push(newPost)
  replyCount.value += 1
}
</script>