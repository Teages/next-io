<template>
  <div class="flex gap-x-4">
    <div class="flex-1 flex flex-row overflow-hidden card bg-base-200 min-h-16 shadow-xl">
      <LevelDiscussionColorLine :mode="post.length > 0 ? mode : null" />
      <div class="card-body p-6">
        <textarea v-model="post" class="textarea textarea-primary h-48" :disabled="!auth.isLogin()" />
        <div class="card-actions flex pt-2">
          <div class="pr-4 flex gap-2">
            <button :class="addClassIf('btn btn-sm btn-success', 'btn-active', mode === 'recommendation', 'btn-ghost')"
              v-if="auth.isLogin() && ['admin', 'moderator', 'qualified_manager', 'qualified_adviser'].includes(auth.user.value.role)"
              @click="setMode('recommendation')">
              <Icon name="material-symbols:thumb-up-outline" size="24" />
              <p class="ml-4 btn-active-text">
                Recommend
              </p>
            </button>
            <button :class="addClassIf('btn btn-sm btn-error', 'btn-active', mode === 'praise', 'btn-ghost')"
              @click="setMode('praise')">
              <Icon name="mdi:cards-heart-outline" size="24" />
              <p class="ml-4 btn-active-text">
                Like
              </p>
            </button>
            <button :class="addClassIf('btn btn-sm btn-warning', 'btn-active', mode === 'problem', 'btn-ghost')"
              @click="setMode('problem')">
              <Icon name="fluent:warning-24-regular" size="24" />
              <p class="ml-4 btn-active-text">
                Problem
              </p>
            </button>
            <button :class="addClassIf('btn btn-sm btn-info', 'btn-active', mode === 'suggestion', 'btn-ghost')"
              @click="setMode('suggestion')">
              <Icon name="fluent:chat-warning-24-regular" size="24" />
              <p class="ml-4 btn-active-text">
                Suggestion
              </p>
            </button>
          </div>
          <div class="flex-1" />
          <button v-if="auth.isLogin()" class="btn btn-sm btn-secondary" :disabled="post.length === 0"
            @click="sendPost">{{ $t('general.comment_post') }}</button>
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
  }
})

const mode = ref('')
const setMode = (newMode) => {
  if (newMode === mode.value) {
    mode.value = ''
  } else {
    mode.value = newMode
  }
}

const category = 'level_discussion'

const url = props.parent ? `/comments/${props.parent}` : `/comments`
const post = ref('')

const sendPost = async () => {
  try {
    const res = await services(url, {
      method: 'POST',
      body: {
        captcha: await props.getToken(),
        content: post.value,
        category: category,
        key: props.thread,
        type: mode.value,
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
  } catch (error) {
    errorAlert('Failed to add the comment')
  }
}
</script>