<template>
  <ul class="menu bg-base-100 w-full p-6 pt-4 rounded-box">
    <li v-if="back"><NuxtLink class="btn my-2" :to="back">
      <Icon name="material-symbols:arrow-back" size="24"/> Back
    </NuxtLink></li>
    <template v-if="context">
      <template v-for="item in context">
      <li v-if="item.to">
        <NuxtLink :to="item.to" :class="addClassIf('', 'active', active === item.id)">
          {{ item.title || item }}
        </NuxtLink>
      </li>
      <li v-else class="menu-title">
        <span>
          {{ item.title || item }}
        </span>
      </li>
    </template>
    </template>
  </ul>
</template>


<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';
defineProps({
  active: String,
  context: Array<String & MenuLink>,
  back: [Object, String] // RouteLocationRaw
})
interface MenuLink {
  title: String,
  id: String,
  to?: RouteLocationRaw
}
</script>