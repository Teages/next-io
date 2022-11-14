<template>
  <div class="fixed top-0 z-20 h-0 w-screen overflow-visible">
    <!-- Alert -->
    {{alerts}}
    <Alert :message="'Please login first.'"/>
    <Alert v-for="msg in alerts" :message="msg.message" :type="msg.type" :icon="msg.icon" :details="msg.details"/>
  </div>
</template>

<script setup>
const { alerts } = useAlert()
</script>