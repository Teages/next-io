<template>
  <div class="flex justify-center content-center">
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
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
          <div class="form-control mt-2">
            <label class="label cursor-pointer">
              <span class="label-text">Remember me</span> 
              <input type="checkbox" :checked="loginForm.remember" class="checkbox checkbox-primary" />
            </label>
          </div>
        </div>
        <div class="form-control mt-2">
          <button class="btn btn-primary" @click="login">Login</button>
        </div>
      </div>
    </div>
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Cookie</span>
          </label>
          <input v-model="loginCookie" type="password" placeholder="Cookie" class="input input-bordered" />
        </div>
        <div class="form-control mt-2">
          <button class="btn btn-primary" @click="loginWithCookie">Login with Cookie</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  const cookie = useCookie("cyt:mess")
  cookie = loginCookie
}
</script>