<template>
  <div class="navbar max-w-7xl m-auto sm:px-12">
    <div class="flex flex-1 gap-0">
      <div class="hidden sm:block">
        <NuxtLink class="btn btn-sm btn-ghost text-base-content font-medium tracking-wider hover:bg-transparent hover:text-primary" to="/">{{ $t('general.nav_home') }}</NuxtLink>
        <NuxtLink class="btn btn-sm btn-ghost text-base-content font-medium tracking-wider hover:bg-transparent hover:text-primary" to="/levels">{{ $t('general.nav_levels') }}</NuxtLink>
        <NuxtLink class="btn btn-sm btn-ghost text-base-content font-medium tracking-wider hover:bg-transparent hover:text-primary" to="https://cytoid.wiki">{{ $t('general.nav_wiki') }}</NuxtLink>
        <NuxtLink
          class="btn btn-sm btn-ghost text-base-content font-medium tracking-wider hover:bg-transparent hover:text-primary">Qualified</NuxtLink>
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
              <li><NuxtLink to="/">{{ $t('general.nav_home') }}</NuxtLink></li>
              <li><NuxtLink to="/levels">{{ $t('general.nav_levels') }}</NuxtLink></li>
              <li><NuxtLink to="https://cytoid.wiki">{{ $t('general.nav_wiki') }}</NuxtLink></li>
              <li><NuxtLink>Qualified</NuxtLink></li>
            </ul>
          </div>
        </div>

        <div class="flex-1" />
      </div>
    </div>
    <div v-if="auth.needLogin()" class="flex-none px-2 sm:px-0">
      <a class="btn btn-sm">登录</a>
    </div>
    <div v-else-if="auth.isLogin()" class="flex-none px-2 sm:px-0">
      <div v-if="auth.user.value.role === 'admin'" class="px-2 tooltip tooltip-bottom" data-tip="Cytoid Admin">
        <button class="btn btn-circle btn-sm not-clickable btn-primary">
          <Icon name="clarity:administrator-solid" size="18"/>
        </button>
      </div>
      <div v-else-if="auth.user.value.role === 'moderator'" class="px-2 tooltip tooltip-bottom" data-tip="Cytoid Moderator">
        <button class="btn btn-circle btn-sm not-clickable btn-primary">
          <Icon name="pajamas:admin" size="18"/>
        </button>
      </div>
      <UserAvatar
        :avatar="'https://assets.cytoid.io/avatar/5vw984LSlIpLW5DhD8N3RdfroM4y27vvZ88b7R6hRvp0Zk5gSa2PURTHvQ8Cu9gMw'"
        :name="auth.user.value.name || auth.user.value.uid" class="h-8 clickable flex-row-reverse"
        @click="profileDialog = !profileDialog" />
      <Transition>
        <div v-show="profileDialog" class="w-0 h-0 relative">
          <UserProfileDialog ref="profileDialogDom" />
        </div>
      </Transition>
    </div>
    <div v-else class="flex-none px-2 sm:px-0">
      <NuxtLink class="btn btn-sm" to="/session/login">Loading...</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const profileDialog = ref(false)

const profileDialogDom = ref()
onClickOutside(profileDialogDom, () => { profileDialog.value = false })
</script>