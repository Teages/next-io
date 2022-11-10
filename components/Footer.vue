<template>
  <footer class="footer footer-center my-10 text-base-content rounded">
    <div>
      <div class="grid grid-flow-col gap-1 sm:gap-3">
        <a class="link link-hover">{{ $t('general.dmca') }}</a>|
        <a class="link link-hover">{{ $t('general.tos') }}</a>|
        <a class="link link-hover">{{ $t('general.status') }}</a>|
        <a class="link link-hover">GitHub</a>|
        <a class="link link-hover">{{ $t('general.credits') }}</a>|
        <div class="dropdown dropdown-top dropdown-hover dropdown-end">
          <a class="link link-hover">
            <Icon name="mdi:translate" size="16" /> {{ $t('general.language') }}
          </a>
          <ul tabindex="0" class="dropdown-content menu menu-compact p-2 shadow bg-base-200 rounded-box w-44">
            <li v-for="code in availableLocales">
              <a :key="code" :class="returnIf(code == locale, 'active', '')" @click="setLocale(code)">
                <span v-t="{path: 'general.self', locale: code}" class="mx-auto"/>
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