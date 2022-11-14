<template>
  <div class="my-2">
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <h2 class="card-title">{{ $t('login.title') }}</h2>
        <p>{{ $t('login.subtitle') }}</p>
        <div class="mt-2" />
        <div class="form-control">
          <label class="input-group w-full">
            <span class="bg-neutral">
              <Icon name="ph:user-bold" />
            </span>
            <input v-model="loginForm.username" type="text" :placeholder="$t('login.username_field_placeholder')"
              class="input input-bordered flex-1" />
          </label>
        </div>
        <div class="form-control">
          <label class="input-group w-full">
            <span class="bg-neutral">
              <Icon name="material-symbols:key" />
            </span>
            <input v-model="loginForm.password" type="password" :placeholder="$t('login.password_field_placeholder')"
              class="input input-bordered flex-1" />
          </label>
          <label class="label">
            <a href="#" class="label-text-alt link link-hover ml-auto">{{ $t('general.forgot_password_link_title')
            }}</a>
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{{ $t('login.remember_me_checkbox_title') }}</span>
            <input type="checkbox" :checked="loginForm.remember" class="checkbox checkbox-primary" />
          </label>
        </div>
        <div class="form-control mt-2">
          <button class="btn btn-primary" @click="loginWithPayload">{{ $t('general.login_btn') }}</button>
        </div>
        <div class="flex w-full justify-around">
          <button class="btn btn-link" @click="loginWithProvider('google')">
            <Icon name="bi:google" size="20" />
          </button>
          <button class="btn btn-link">
            <Icon name="bi:facebook" size="20" @click="loginWithProvider('facebook')"/>
          </button>
          <button class="btn btn-link">
            <Icon name="bi:discord" size="20" @click="loginWithProvider('discord')"/>
          </button>
        </div>
        <div class="divider">OR</div>
        <h2 class="card-title">{{ $t('login.new_user_welcome_title') }}</h2>
        <p>{{ $t('login.new_user_welcome_content') }}</p>
        <div class="form-control mt-2">
          <NuxtLink class="btn btn-primary" to="/session/signup">{{ $t('general.signup_btn') }}</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FetchError } from 'ohmyfetch';
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const auth = useAuth()
const loginForm = {
  username: "",
  password: "",
  remember: false
}

const loginWithPayload = async () => {
  if (loginForm.username === '') {
    return
  }
  if (loginForm.password === '') {
    return
  }

  const captchaToken = await useCaptcha()
  console.log(captchaToken)
  const userData = await auth.loginWithPayload({
    ...loginForm,
    captcha: captchaToken
  }).catch((error:FetchError) => {
    const code = error.response?.status ?? 0
    if (code == 401) {
      console.log(t('general.login_password_error'))
      return
    } else if (code == 403) {
      console.log(t('general.login_inactive_error'))
      return
    } else if (code == 404) {
      console.log(t('general.login_username_error'))
      return
    } else {
      console.log(`Unknown error(${code}): `, error)
    }
  })
  console.log(userData)
  if (userData) {
    console.log(t('general.login_snack_bar', {name: userData.name || userData.uid}))
    loginNext()
  }
}

const loginWithProvider = (provider:string) => {
  if (process.client) {
    window.addEventListener('message', providerResponded)
    window.open(useServiceUrl('/session/external/' + provider))
  }

  function providerResponded(event:MessageEvent) {
    console.log(event.data)
    console.log(event.origin)
    if (event.origin !== 'https://services.cytoid.io') {
      return
    }
    window.removeEventListener('message', providerResponded)
    if (event.data.user) {
      auth.user.value = event.data.user
      console.log(t('general.login_snack_bar', {name: event.data.user.name || event.data.user.uid}))
      loginNext()
    } else if (event.data.token && event.data.provider) {
      router.replace({
        name: 'session-link',
        query: {
          token: event.data.token,
          provider: event.data.provider,
          origin: route.query.origin || null,
        }
      })
    }
  }
}

function loginNext() {
  if (route.query.origin) {
    router.replace({path: route.query.origin.toString()})
  } else {
    router.replace({name: 'settings-account'})
  }
}

definePageMeta({
  layout: "session"
})
</script>