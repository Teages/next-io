<template>
  <div class="flex gap-x-4">
    <div v-if="!small">
      <UserAvatar v-if="auth.isLogin()" :avatar="avatarURL(auth.user.value.id)" :uid="auth.user.value.uid" class="h-12 clickable bg-transparent" />
      <UserAvatar v-else class="h-12 bg-transparent" />
    </div>
    <div :class="addClassIf('flex-1 overflow-hidden card bg-base-200 min-h-16', 'shadow-xl', !small)">
      <div class="card-body p-6">
        <div v-if="auth.isLogin() && small" class="flex justify-start text-sm font-bold">
          <UserAvatar :avatar="avatarURL(auth.user.value.id)" :uid="auth.user.value.uid" class="h-5 mr-2 bg-transparent" style="display: inline-block;"/>
          <span>
            {{ auth.user.value.name || auth.user.value.uid }}
          </span>
        </div>
        <textarea v-model="post" class="textarea textarea-primary h-48" :disabled="!auth.isLogin()" />
        <div class="card-actions justify-end pt-2">
          <button v-if="auth.isLogin()" class="btn btn-sm btn-secondary" :disabled="post.length === 0" @click="sendPost">{{ $t('general.comment_post') }}</button>
          <button v-else class="btn btn-sm btn-warning" @click="auth.toLogin()">{{ $t('general.login_btn') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
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
  parent: {
    type: Number,
    default: null,
  },
  getToken: {
    type: Function,
    required: true
  },
  afterPost: {
    type: Function,
    required: true
  },
  small: Boolean
})

const url = props.parent ? `/comments/${props.parent}` : `/comments`
const post = ref('')

const sendPost = async () => {
  const res = await services(url, {
    method: 'POST',
    body: {
      captcha: await props.getToken(),
      content: post.value,
      category: props.category,
      key: props.thread
    }
  })
  console.log(res)
  res.owner = {
    id: auth.user.value.id,
    uid: auth.user.value.uid,
    name: auth.user.value.name,
    avatar: {
      small: avatarURL(auth.user.value.id)
    }
  }
  props.afterPost(res)
  post.value = ''
  successAlert('Comment Added')
}
</script>