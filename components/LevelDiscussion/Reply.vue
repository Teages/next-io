<template>
  <div class="flex gap-x-4">
    <div class="flex-1 overflow-hidden card min-h-16">
      <div class="card-body p-6">
        <div v-if="auth.isLogin()" class="flex justify-start text-sm font-bold">
          <UserAvatar :avatar="avatarURL(auth.user.value.id)" :uid="auth.user.value.uid" class="h-5 mr-2 bg-transparent" style="display: inline-block;"/>
          <span>
            {{ auth.user.value.name || auth.user.value.uid }}
          </span>
        </div>
        <textarea v-model="post" class="textarea textarea-primary h-16" :disabled="!auth.isLogin()" />
        <div class="card-actions justify-end pt-2">
          <div class="pr-4 flex gap-2">
            <button :class="addClassIf('btn btn-sm btn-success', 'btn-active', mode === 'recommendation', 'btn-ghost')"
              v-if="auth.isLogin() && canQua && ['admin', 'moderator', 'qualified_manager', 'qualified_adviser'].includes(auth.user.value.role)"
              @click="setMode('recommendation')">
              <Icon name="material-symbols:thumb-up-outline" size="24" />
              <p class="ml-4 btn-active-text">
                Qualified
              </p>
            </button>
            <button :class="addClassIf('btn btn-sm btn-info', 'btn-active', resolve === true, 'btn-ghost')"
              v-if="isClosed === false" @click="setResolve(true)">
              <Icon name="mdi:check-circle-outline" size="24" />
              <p class="ml-4 btn-active-text">
                Close
              </p>
            </button>
            <button :class="addClassIf('btn btn-sm btn-error', 'btn-active', resolve === false, 'btn-ghost')"
              v-if="isClosed === true" @click="setResolve(false)">
              <Icon name="mdi:alert-circle-outline" size="24" />
              <p class="ml-4 btn-active-text">
                Reopen
              </p>
            </button>
          </div>
          <div class="flex-1" />
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
  levelId: {
    type: String,
    required: true,
  },
  parent: {
    type: Number,
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
  isClosed: Boolean,
  canQua: Boolean
})
const category = 'level_discussion'
const url = `/comments/${props.parent}`
const post = ref('')
const mode = ref('')
const resolve = ref(null)

const setMode = (val) => {
  if (mode.value === val) {
    mode.value = ''
  } else {
    mode.value = val
  }
}
const setResolve = (val) => {
  if (resolve.value === val) {
    resolve.value = null
  } else {
    resolve.value = val
  }
}

const sendPost = async () => {
  console.log({
      content: post.value,
      category: category,
      key: props.levelId,
      type: mode.value,
      resolved: resolve.value
    })
  const res = await services(url, {
    method: 'POST',
    body: {
      captcha: await props.getToken(),
      content: post.value,
      category: category,
      key: props.levelId,
      type: mode.value,
      resolved: resolve.value
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