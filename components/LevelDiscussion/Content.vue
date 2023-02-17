<template>
  <div class="flex gap-x-4">
    <div :class="addClassIf('flex-1 flex-row overflow-hidden card bg-base-200 min-h-16', 'shadow-xl', !small)">
      <LevelDiscussionColorLine :mode="post.metadata.type" :class="addClassIf('', 'opacity-10', isClosed)"/>
      <div class="card-body p-6 pl-4">
        <div class="flex justify-start text-sm font-bold">
          <UserAvatar :avatar="post.owner.avatar.small" :uid="post.owner.uid" class="h-8 mr-2 bg-transparent" style="display: inline-block;"/>
          <div class="flex items-center	">
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
        </div>
        <p class="pl-4 break-words prose" v-html="useMarked(post.content)" />
        <div class="flex card-actions">
          <template v-if="replyCount">
            <button v-if="!showMore" @click="showMore = true" class="btn btn-ghost btn-sm">
              <Icon name="material-symbols:keyboard-arrow-down" class="mr-4" size="24" />
              {{ $t('general.comment_see_replies', replyCount) }}
            </button>
            <button v-else @click="showMore = false" class="btn btn-ghost btn-sm">
              <Icon name="material-symbols:keyboard-arrow-up" class="mr-4" size="24" />
              {{ $t('general.comment_hide_replies', replyCount) }}
            </button>
          </template>
          <div class="flex-1" />
          <button class="btn btn-primary btn-sm" @click="showReply = !showReply">{{ $t('general.comment_reply') }}</button>
        </div>
        <div v-if="showReply || (showMore && replyCount > 0)" class="card card-compact mt-4 bg-base-100">
          <div class="card-body">
            <template v-if="showReply">
              <LevelDiscussionReply :canQua="canQua" :category="category" :levelId="levelId" :parent="post.id" :getToken="getToken" :isClosed="isClosed" :afterPost="afterPost"/>
            </template>
            <template v-if="showMore">
              <LevelDiscussionSubContent v-for="_post in data" :isClosed="isClosed"
                :afterPost="afterPost"
                :post="_post" :getToken="getToken" :levelId="levelId" :small="true"/>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { da } from 'date-fns/locale';

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
  levelId: {
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

const isClosed = computed(() => {
  if (!['suggestion', 'problem'].includes(props.post.metadata.type)) {
    return null
  }
  let ans = false
  for (const post of data.value) {
    if (post.metadata?.resolved === false) {
      ans = false
    } else if (post.metadata?.resolved === true) {
      ans = true
    }
  }
  return ans
})

const canQua = computed(() => {
  return props.post.metadata.type === 'recommendation'
})

onMounted(() => {
  showMore.value = true
})
</script>