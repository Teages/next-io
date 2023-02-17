<template>
  <LayoutStudio>
    <Recaptcha ref="captcha" />
    <template #StudioMenu>
      <StudioMenuLevelDiscussion active="discussion" :levelId="levelId" />
    </template>
    <LevelDiscussionThread :levelId="levelId" :getToken="getToken" />
  </LayoutStudio>
</template>

<script setup>
const auth = useAuth()
const route = useRoute()
const services = useService()
const { setBackground } = useBackground()
const levelId = route.params.id
const captcha = ref(null)

const getToken = async () => {
  return await captcha.value.execute()
}

definePageMeta({
  layout: "studio"
})
</script>