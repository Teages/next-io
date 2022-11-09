<template>
  <footer class="footer footer-center my-10 text-base-content rounded">
    <div>
    <div class="grid grid-flow-col gap-1 sm:gap-3">
      <a class="link link-hover">{{ $t('general.dmca') }}</a>|
      <a class="link link-hover">{{ $t('general.tos') }}</a>|
      <a class="link link-hover">{{ $t('general.status') }}</a>|
      <a class="link link-hover">GitHub</a>|
      <a class="link link-hover">{{ $t('general.credits') }}</a>|
      <a class="link link-hover"><Icon name="mdi:translate" size="16"/> {{ $t('general.language') }}</a>
    </div>
    <div>
      <p>Cytoid built by <a class="link link-hover">TigerHix</a> and <a class="link link-hover">Neo</a>. All rights reserved.</p>
    </div>
    </div>
  </footer>
</template>