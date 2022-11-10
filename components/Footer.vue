<template>
  <footer class="footer footer-center my-10 text-base-content rounded">
    <div>
      <div class="grid grid-flow-col gap-1 sm:gap-3">
        <NuxtLink class="clickable select-none" to="/pages/dmca">{{ $t('general.dmca') }}</NuxtLink>|
        <NuxtLink class="clickable select-none" to="/pages/terms">{{ $t('general.tos') }}</NuxtLink>|
        <NuxtLink class="clickable select-none" to="https://github.com/Cytoid/">{{ $t('general.status') }}</NuxtLink>|
        <NuxtLink class="clickable select-none" to="https://github.com/Cytoid/https://github.com/Cytoid/">GitHub</NuxtLink>|
        <NuxtLink class="clickable select-none" to="/credits">{{ $t('general.credits') }}</NuxtLink>|
        <div class="dropdown dropdown-top dropdown-hover dropdown-end">
          <a class="clickable select-none">
            <Icon name="mdi:translate" size="16" /> {{ $t('general.language') }}
          </a>
          <ul tabindex="0" class="dropdown-content menu menu-compact p-2 shadow bg-base-200 rounded-box w-44">
            <li v-for="code in availableLocales">
              <a :key="code" :class="returnIf(code == locale, 'active', '')" @click="setLocale(code)">
                <span v-t="{ path: 'general.self', locale: code }" class="mx-auto" />
              </a>
            </li>
          </ul>
        </div>

      </div>
      <div>
        <p>Cytoid built by <a class="link link-hover">TigerHix</a> and <a class="link link-hover">Neo</a>. All rights
          reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { availableLocales, locale, setLocale } = useLocales()
</script>