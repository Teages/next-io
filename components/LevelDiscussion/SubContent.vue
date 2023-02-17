<template>
  <div class="flex gap-x-4">
    <div class="flex-1 overflow-hidden min-h-16">
      <div class="p-4">
        <div class="flex justify-start text-sm font-bold">
          <UserAvatar :avatar="post.owner.avatar.small" :uid="post.owner.uid" class="h-5 mr-2 bg-transparent" style="display: inline-block;"/>
          <NuxtLink :to="`/profile/${post.owner.uid}}`">
            {{ post.owner.name || post.owner.uid }}
          </NuxtLink>
          <span class="pl-3 font-normal opacity-60">
            <span v-if="!true" class="hidden sm:inline">
              {{ dateFormatCalendar(post.date) }}, 
            </span>
              {{ dateFromNow(post.date) }}
          </span>
        </div>
        <p class="pl-4 break-words prose" v-html="useMarked(post.content)" />
        <div class="flex card-actions">
          <div class="flex-1" />
          <button class="btn btn-primary btn-sm" @click="showReply = !showReply">{{ $t('general.comment_reply') }}</button>
        </div>
        <template v-if="showReply">
            <LevelDiscussionReply :levelId="levelId" :parent="post.id" :getToken="getToken" :afterPost="_afterPost" :isClosed="null" class="mt-4"/>
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
  levelId: {
    type: String,
    required: true,
  },
  getToken: {
    type: Function,
    required: true
  },
  afterPost: {
    type: Function,
    required: true
  },
  isClosed: Boolean
})
const category = 'level_discussion'
const showReply = ref(false)
const showMore = ref(false)

const _afterPost = (newPost) => {
  props.afterPost(newPost)
}
</script>