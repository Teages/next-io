<template>
  <div>
    <div v-if="cookie" class="w-full flex justify-center content-center my-2">
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <h2 class="card-title">Profile</h2>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Cookie</span>
            </label>
            <input v-model="cookie" disabled type="password" placeholder="Cookie" class="input input-bordered" />
          </div>
          <div v-if="auth.user.value">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input v-model="auth.user.value.email" disabled type="text" class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">ID</span>
              </label>
              <input v-model="auth.user.value.id" disabled type="text" class="input input-bordered" />
            </div>
            <div class="form-control" v-if="auth.user.value.name">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input v-model="auth.user.value.name" disabled type="text" class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">UID</span>
              </label>
              <input v-model="auth.user.value.uid" disabled type="text" class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Role</span>
              </label>
              <input v-model="auth.user.value.role" disabled type="text" class="input input-bordered" />
            </div>
          </div>
          <div class="form-control mt-2">
            <button class="btn btn-primary" @click="auth.loginWithCookie">Reload</button>
          </div>
          <div class="form-control mt-2">
            <button class="btn btn-primary" @click="auth.logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="w-full flex justify-center content-center my-2">
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <h2 class="card-title">Login</h2>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Cytoid ID</span>
              </label>
              <input v-model="loginForm.username" type="text" placeholder="Cytoid ID" class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input v-model="loginForm.password" type="password" placeholder="Password" class="input input-bordered" />
              <label class="label">
                <a href="#" class="label-text-alt link link-hover">Need help?</a>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Remember me</span>
                <input type="checkbox" :checked="loginForm.remember" class="checkbox checkbox-primary" />
              </label>
            </div>
            <div class="form-control mt-2">
              <button class="btn btn-primary" @click="login">Login</button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center content-center my-2">
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
  </div>
</template>

<script setup>
const auth = useAuth()
const cookie = useCookie("cyt:sess")
const loginForm = {
  username: "",
  password: "",
  remember: false
}

const loginCookie = ref("")

const login = async () => {
  const captchaToken = await useVueReCaptcha()
  const userData = await useService('/session', {
    method: "POST",
    body: {
      ...loginForm,
      captcha: captchaToken
    }
  })
  console.log(userData)
}

const loginWithCookie = () => {
  cookie.value = decodeURIComponent(loginCookie.value)
  auth.loginWithCookie()
}
</script>