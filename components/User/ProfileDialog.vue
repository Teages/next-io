<template>
  <div class="fixed right-4 top-12 p-2 sm:absolute sm:top-8 sm:-right-4">
    <div class="card bg-base-100 shadow-xl w-72">
      <div class="card w-full bg-base-100 max-h-30 shadow-xl image-full">
        <figure><img :src="data.profile.header.thumbnail" /></figure>
        <div class="card-body px-6 py-2 select-none">
          <div class="flex w-full mt-4">
            <div class="avatar">
              <div class="w-16 h-16 mt-4 rounded-full">
                <img :src="data.profile.user.avatar.original" />
              </div>
            </div>
            <div class="flex flex-col justify-center gap-1 flex-1 pt-4 px-4 w-0">
              <div>
                <p class="card-title break-all">{{ auth.user.value.name || auth.user.value.uid }}</p>
              </div>
              <div v-if="data.profile.rating" class="flex gap-2">
                <div v-if="data.profile.rating >= 16" class="tooltip tooltip-right" :data-tip="`rt ${data.profile.rating.toFixed(2)}`">
                  <div class="badge badge-warning"><Icon name="mdi:crown" /></div>
                </div>
                <div v-else-if="data.profile.rating > 15" class="badge badge-warning">rt {{ data.profile.rating.toFixed(2) }}</div>
                <div v-else-if="data.profile.rating > 12" class="badge badge-info">rt {{ data.profile.rating.toFixed(2) }}</div>
                <div v-else class="badge">rt {{ data.profile.rating.toFixed(2) }}</div>
              </div>
            </div>

          </div>
          <div class="flex-1" />
          <div class="flex h-12 items-center gap-2">
            <div class="tooltip flex-1 flex items-center" :data-tip="`${data.profile.exp.totalExp - data.profile.exp.currentLevelExp} / ${data.profile.exp.nextLevelExp - data.profile.exp.currentLevelExp}`">
              <progress class="progress progress-primary bg-base-100/60 h-3"
              :value="data.profile.exp.totalExp - data.profile.exp.currentLevelExp"
              :max="data.profile.exp.nextLevelExp - data.profile.exp.currentLevelExp"></progress>
            </div>
            <div class="badge badge-primary">Lv. {{ data.profile.exp.currentLevel }}</div>
          </div>
        </div>
      </div>

      <div class="card-body p-4">
        <ul class="menu bg-base-100 w-full p-0">
          <li class="hover-bordered">
            <NuxtLink :to="{ name: 'profile-id', params: { id: auth.user.value.uid || auth.user.value.id } }">
              <Icon name="mdi:account" size="24" /> {{ $t('general.profile') }}
            </NuxtLink>
          </li>
          <li class="hover-bordered">
            <NuxtLink to="/studio">
              <Icon name="carbon:media-library-filled" size="24" /> {{ $t('general.studio') }}
            </NuxtLink>
          </li>
          <li class="hover-bordered">
            <NuxtLink to="/library">
              <Icon name="mdi:puzzle" size="24" /> {{ $t('general.library') }}
            </NuxtLink>
          </li>
          <li class="hover-bordered">
            <NuxtLink to="/settings">
              <Icon name="ic:baseline-settings" size="24" /> {{ $t('general.settings') }}
            </NuxtLink>
          </li>
        </ul>
        <div class="card-actions justify-end pt-2">
          <button class="btn btn-primary btn-block" @click="logout">{{ $t('general.signout_btn') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const auth = useAuth()
const router = useRouter()

const query = gql`query FetchNavCard($id: ID!) {
  profile(id: $id) {
    id
    exp {
      totalExp
      currentLevelExp
      nextLevelExp
      currentLevel
    }
    rating
    header {
      thumbnail
    }
    user {
      id
      avatar {
        original
      }
    }
  }
}`


const { data } = await useAsyncQuery(query, { id: auth.user.value.id })

const logout = async () => {
  console.log('user logout')
  await auth.logout()
  router.push({ path: '/' })
}
</script>