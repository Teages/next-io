<template>
  <div class="navbar max-w-7xl m-auto sm:px-12">
    <div class="flex flex-1 gap-0">
      <div class="hidden sm:block">
        <a class="btn btn-sm btn-ghost text-base-content font-medium hover:bg-transparent hover:text-primary">主页</a>
        <a class="btn btn-sm btn-ghost text-base-content font-medium hover:bg-transparent hover:text-primary">谱面</a>
        <a class="btn btn-sm btn-ghost text-base-content font-medium hover:bg-transparent hover:text-primary">Wiki</a>
        <a
          class="btn btn-sm btn-ghost text-base-content font-medium hover:bg-transparent hover:text-primary">Qualified</a>
      </div>

      <div class="flex flex-1 sm:hidden">
        <div class="flex-none">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="inline-block w-5 h-5 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                </path>
              </svg>
            </label>
            <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>主页</a></li>
              <li><a>谱面</a></li>
              <li><a>Wiki</a></li>
              <li><a>Qualified</a></li>
            </ul>
          </div>
        </div>

        <div class="flex-1" />
      </div>
    </div>
    <div v-if="!auth.isLogin()" class="flex-none px-2 sm:px-0">
      <a class="btn btn-sm">登录</a>
    </div>
  </div>
  <div class="navbar hidden sm:block">

  </div>
</template>

<script setup>
const auth = useAuth()
</script>