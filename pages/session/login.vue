<template>
  <div v-if="cookie">
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <h2 class="card-title">Profile</h2>
        <div v-if="auth.user.value">
          <div class="form-control" v-if="auth.user.value.uid">
            <label class="label">
              <span class="label-text">Cytoid ID</span>
            </label>
            <input v-model="auth.user.value.uid" disabled type="text" class="input input-bordered" />
          </div>
        </div>
        <div v-else>
          Loading...
        </div>
        <div class="form-control mt-2">
          <button class="btn btn-primary" @click="auth.loginWithCookie">Reload</button>
        </div>
        <div class="form-control mt-2">
          <button class="btn btn-error" @click="auth.logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="my-2">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <h2 class="card-title">{{ $t('login.title') }}</h2>
          <p>{{ $t('login.subtitle') }}</p>
          <div class="mt-2" />
          <div class="form-control">
            <label class="input-group w-full">
              <span class="bg-neutral"><Icon name="ph:user-bold" /></span>
              <input v-model="loginForm.username"  type="text" :placeholder="$t('login.username_field_placeholder')" class="input input-bordered flex-1" />
            </label>
          </div>
          <div class="form-control">
            <label class="input-group w-full">
              <span class="bg-neutral"><Icon name="material-symbols:key" /></span>
              <input v-model="loginForm.username"  type="password" :placeholder="$t('login.password_field_placeholder')" class="input input-bordered flex-1" />
            </label>
            <label class="label">
              <a href="#" class="label-text-alt link link-hover ml-auto">{{ $t('general.forgot_password_link_title') }}</a>
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">{{ $t('login.remember_me_checkbox_title') }}</span>
              <input type="checkbox" :checked="loginForm.remember" class="checkbox checkbox-primary" />
            </label>
          </div>
          <div class="form-control mt-2">
            <button class="btn btn-primary" @click="login">{{ $t('general.login_btn') }}</button>
          </div>
          <div class="flex w-full justify-around">
            <button class="btn btn-link"><Icon name="bi:google" size="20"/></button>
            <button class="btn btn-link"><Icon name="bi:facebook" size="20"/></button>
            <button class="btn btn-link"><Icon name="bi:discord" size="20"/></button>
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
    <div class="my-2">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <h2 class="card-title">Login with Cookie (Debug)</h2>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Cookie</span>
            </label>
            <input v-model="loginCookie" type="password" placeholder="Cookie" class="input input-bordered" />
          </div>
          <div class="form-control mt-2">
            <button class="btn btn-primary" @click="loginWithCookie">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const auth = useAuth()
const cookie = useSavedCookie("cyt:sess")
const loginForm = {
  username: "",
  password: "",
  remember: false
}

const loginCookie = ref("")


definePageMeta({
  layout: "session"
})
</script>