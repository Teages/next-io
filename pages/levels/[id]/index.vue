<template>
  <LayoutContents>
    <Recaptcha ref="captcha" />
    <template #contentTitle>
      <h1 class="text-5xl font-bold">{{ data.level.title }}</h1>
      <p class="text-xl pt-6" v-if="data.level.metadata.artist">{{ data.level.metadata.artist.name }}</p>
      <div class="py-6 flex gap-2 flex-wrap max-w-xl">
        <template v-for="chart in data.level.charts">
          <LevelDiffBadge :type="chart.type" :difficulty="chart.difficulty" :name="chart.name" :notesCount="chart.notesCount" />
        </template>
      </div>
      <div class="flex gap-3 flex-wrap max-w-xl">
        <button class="btn btn-primary" @click="downloadLevel">
          <Icon name="material-symbols:download-sharp" size="24" class="mr-2" />
          {{ $t('level_details.download_btn', { size: formatSize(data.level.size)}) }}
        </button>
        <template v-if="auth.isLogin()">
          <button :class="addClassIf('btn', 'loading', addToLibLoading)" v-if="data.level.owned === null"
            @click="addToLib">
            <Icon name="material-symbols:favorite-outline" size="24" class="mr-2" />
            {{ $t('general.favorite_verb') }}
          </button>
          <button :class="addClassIf('btn btn-error', 'loading', removeFromLoading)"
            v-else-if="data.level.owned === false" @click="removeFromLib">
            <Icon name="material-symbols:favorite" size="24" class="mr-2" />
            {{ $t('general.favorite_pass_tense') }}
          </button>
          <button class="btn btn-success" disabled v-else-if="data.level.owned === true">
            <Icon name="material-symbols:check-circle" size="24" class="mr-2" />
            OWNED
          </button>

          <NuxtLink :to="{ name: 'levels-id-manage', params: { uid: data.level.uid } }"
            v-if="data.level.owner.id === auth.user.value.id || auth.user.value.role === 'admin' || auth.user.value.role === 'moderator'">
            <button class="btn">
              <Icon name="mdi:briefcase" size="24" class="mr-2" />
              {{ $t('general.manage_btn') }}
            </button>
          </NuxtLink>
        </template>
      </div>
      <div v-if="data.level.state === 'UNLISTED'" class="alert alert-info shadow-lg mt-6">
        <div>
          <Icon name="mdi:eye-off-outline" size="24" />
          <span>{{ $t('level_details.message_unlisted') }}</span>
        </div>
      </div>
      <div v-if="data.level.state === 'PRIVATE'" class="alert alert-warning shadow-lg mt-6">
        <div>
          <Icon name="mdi:lock-outline" size="24" />
          <span>{{ $t('level_details.message_private') }}</span>
        </div>
      </div>
      <div v-if="data.level.censored" class="alert alert-error shadow-lg mt-6">
        <div>
          <Icon name="mdi:exclamation-thick" size="24" />
          <span>{{ $t('level_details.message_censored', { reason: data.level.censored }) }}</span>
        </div>
      </div>

    </template>

    <template #subContent>
      <div class="card w-full bg-base-100 shadow-xl">
        <div class="card-body">
          <UserAvatar :avatar="data.level.owner.avatar.large" :name="data.level.owner.name || data.level.owner.uid"
            :uid="data.level.owner.uid" class="h-16 clickable bg-transparent" />
          <div class="prose-sm max-w-none mt-4" v-html="useMarked(data.level.description)" />
          <p class="card-subtitle pt-6"> {{ $t('level_details.details_card_tags_title') }} </p>
          <div v-if="data.level.tags.length > 0">
            <NuxtLink class="badge select-none mr-2 my-1" v-for="tag in data.level.tags"
              :href="'/levels?tags=' + tag.toLowerCase()">{{ tag }}</NuxtLink>
          </div>
          <div v-else class="opacity-60 select-none">
            The level have no tags.
          </div>
        </div>
      </div>
      <div class="card w-full bg-base-100 shadow-xl mt-5">
        <div class="card-body">
          <p class="card-subtitle">
            {{ $t('level_details.details_card_rating_title') }}
            <span class="badge">
              {{ data.level.rating.total }}
            </span>
          </p>
          <div class="stats stats-horizontal flex select-none">

            <div
              :class="addClassIf('stat w-2/5 flex justify-center items-end', 'flex-1', !(ratingUpCount > ratingDownCount))">
              <div class="stat-value text-center text-2xl">
                <p v-if="ratingDownCount > 0"
                  :class="addClassIf('text-orange-300', 'text-4xl', ratingDownCount > ratingUpCount)">
                  <Icon name="material-symbols:keyboard-arrow-down-rounded" />{{ ratingDownCount }}
                </p>
                <p v-else>-</p>
              </div>
            </div>

            <div
              :class="addClassIf('stat w-2/5 flex justify-center items-end', 'flex-1', !(ratingDownCount > ratingUpCount))">
              <div class="stat-value text-center text-2xl">
                <p v-if="ratingUpCount > 0"
                  :class="addClassIf('text-blue-300', 'text-4xl', ratingUpCount > ratingDownCount)">
                  <Icon name="material-symbols:keyboard-arrow-up-rounded" />{{ ratingUpCount }}
                </p>
                <p v-else>-</p>
              </div>
            </div>

          </div>

          <template v-if="auth.isLogin()">
            <div class="flex py-3 px-4 mt-2 bg-gray-500/20 rounded-full select-none">
              <span class="aspect-square rounded-full overflow-hidden h-8">
                <img :src="avatarURL(auth.user.value.id)" />
              </span>
              <div class="flex-1" />
              <div class="rating rating-half items-center">
                <input type="radio" name="rating-10" v-model="userRating" :value="0" class="rating-hidden" />
                <input type="radio" name="rating-10" v-model="userRating" :value="1"
                  class="bg-yellow-600 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" v-model="userRating" :value="2"
                  class="bg-yellow-600 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" v-model="userRating" :value="3"
                  class="bg-yellow-600 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" v-model="userRating" :value="4"
                  class="bg-yellow-600 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" v-model="userRating" :value="5"
                  class="bg-yellow-600 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" v-model="userRating" :value="6"
                  class="bg-yellow-600 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" v-model="userRating" :value="7"
                  class="bg-yellow-600 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" v-model="userRating" :value="8"
                  class="bg-yellow-600 mask mask-star-2 mask-half-2" />
                <input type="radio" name="rating-10" v-model="userRating" :value="9"
                  class="bg-yellow-600 mask mask-star-2 mask-half-1" />
                <input type="radio" name="rating-10" v-model="userRating" :value="10"
                  class="bg-yellow-600 mask mask-star-2 mask-half-2" />
              </div>
              <div class="flex-1" />
              <button v-if="updateRateLoading" class="btn btn-circle btn-ghost btn-sm loading" />
              <button v-else :disabled="!userRating" class="btn btn-circle btn-ghost btn-sm" @click="updateRate(0)">
                <Icon name="mdi:delete-outline" size="23" />
              </button>
            </div>
          </template>
        </div>
      </div>
      <div class="card w-full bg-base-100 shadow-xl mt-5">
        <div class="card-body">
          <MetaBox :metadata="data.level.metadata" />
          <p class="card-subtitle"> {{ $t('level_details.details_card_last_updated_title') }} </p>
          <p>{{ dateFormatCalendar(data.level.modificationDate) }}, {{ dateFromNow(data.level.modificationDate) }}</p>
        </div>
      </div>
    </template>

    <div class="card w-full bg-base-100 shadow-xl mb-5">
      <div v-if="rankData" class="card-body px-4 py-8 sm:px-8">
        <p class="card-subtitle">{{ $t('level_details.difficulty_card_title') }}</p>
        <div class="tabs tabs-boxed w-fit">
          <a v-if="data.level.charts.filter(c => c.type === 'easy').length > 0"
            :class="addClassIf('tab', 'tab-active', selectedDiffRank === 'easy')"
            @click="selectedDiffRank = 'easy'">Easy</a>
          <a v-if="data.level.charts.filter(c => c.type === 'hard').length > 0"
            :class="addClassIf('tab', 'tab-active', selectedDiffRank === 'hard')"
            @click="selectedDiffRank = 'hard'">Hard</a>
          <a v-if="data.level.charts.filter(c => c.type === 'extreme').length > 0"
            :class="addClassIf('tab', 'tab-active', selectedDiffRank === 'extreme')"
            @click="selectedDiffRank = 'extreme'">Extreme</a>
        </div>
        <progress :class="addClassIf('progress progress-primary', 'opacity-0', !loadingRank)"></progress>
        <div :class="addClassIf('overflow-x-auto select-none', 'opacity-50', loadingRank)">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Player</th>
                <th>Score</th>
                <th>Acc</th>
                <th>Combo</th>
                <th>Details</th>
                <th>Mods</th>
                <th>Achieved</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rank, index) in rankData.chart.leaderboard">
                <th>#{{ index + realDiffRankPage * 10 - 9 }}</th>
                <td class="text-sm">
                  <UserAvatar :avatar="rank.owner.avatar.small" :name="rank.owner.name || rank.owner.uid"
                    :uid="rank.owner.uid"
                    class="h-8 w-fit clickable bg-transparent" />
                </td>
                <td class="font-semibold">
                  <div class="flex gap-x-1">
                    <ScoreBadge :score="rank.score" />
                    {{ rank.score }}
                  </div>
                </td>
                <td class="font-semibold">
                  {{ (rank.accuracy * 100).toFixed(2) }}%
                </td>
                <td class="font-semibold">{{ rank.details.maxCombo }}x</td>
                <td>
                  <div class="flex gap-x-2">
                    <span class="text-blue-400">{{ rank.details.perfect }} </span> /
                    <span class="text-yellow-400">{{ rank.details.great }} </span> /
                    <span class="text-green-400">{{ rank.details.good }} </span> /
                    <span class="text-red-400">{{ rank.details.bad }} </span> /
                    <span>{{ rank.details.miss }}</span>
                  </div>
                </td>
                <td>
                  <div class="flex">
                    <span v-for="mod in rank.mods" >
                      <Mod :mod="mod" />
                    </span> 
                  </div> 
                </td>
                <td>
                  <div class="whitespace-nowrap	">
                    {{ dateFromNow(rank.date) }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination class="w-full justify-center sm:justify-end"
          :page="diffRankPage"
          :total-page="Math.ceil(rankData.chart.numPlayers / 10)"
          :to-first-page="() => {diffRankPage = 1}"
          :to-prev-page="() => {diffRankPage -= 1}"
          :to-next-page="() => {diffRankPage += 1}"
          :to-final-page="() => {diffRankPage = Math.ceil(rankData.chart.numPlayers / 10)}"
          :jump-to-page="setRankPage"
        />
      </div>
    </div>

    <div class="alert px-8 flex">
      <div class="flex-1">
        <p v-if="data.level?.category.includes('qualified')">
          这个谱已经被标记为 Qualified, 讨论区已归档. <!-- **REPLACE_TEXT** -->
        </p>
        <p v-else>
          这个谱还没有被标记为 Qualified, 加入讨论让它更快被认定. <!-- **REPLACE_TEXT** -->
        </p>
      </div>
      <div class="flex-none">
        <NuxtLink :to="`/levels/${levelId}/discussion`" class="btn btn-sm btn-primary">
          <Icon name="material-symbols:chat-outline-rounded" size="16" class="mr-2" />
          讨论 <!-- **REPLACE_TEXT** -->
        </NuxtLink>
      </div>
    </div>

    <CommentThread category="level" :thread="levelId" :getToken="getToken" />
  </LayoutContents>
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

const query = gql`
  query FetchLevel($uid: String!){
    level(uid: $uid) {
      id
      uid
      title
      description
      state
      censored
      size
      tags
      category
      creationDate
      modificationDate
      owned
      owner {
        id
        uid
        name
        avatar { large }
      }
      charts {
        difficulty
        type
        name
        notesCount
      }
      metadata {
        artist {
          name
          localized_name
          url
        }
        illustrator {
          name
          localized_name
          url
        }
        charter {
          name
          localized_name
          url
        }
        storyboarder {
          name
          localized_name
          url
        }
      }
      rating {
        average
        total
        distribution
        rating
      }
      bundle {
        musicPreview
        backgroundImage {
          original
        }
      }
    }
  }
`
const rankingQuery = gql`
  query FetchLevelRanking($levelUid: String!, $type: String!, $start: Int!) {
    chart(levelUid: $levelUid, chartType: $type) {
      id
      numPlayers
      leaderboard(limit: 10, start: $start) {
        id
        date
        owner {
          id
          uid
          name
          avatar {
            small
          }
        }
        score
        accuracy
        mods
        details {
          perfect
          great
          good
          bad
          miss
          maxCombo
        }
      }
    }
  }
`

const { data } = await useAsyncQuery(query, { uid: levelId })
data.value.level.charts.sort((a, b) => {
  return getOrder(a.type) > getOrder(b.type)
  function getOrder(t) {
    switch (t) {
      case 'extreme': return 3
      case 'hard': return 2
      case 'easy': return 1
    }
  }
})

// download
const downloadLink = ref('')
const downloadLevel = async () => {
  if (!auth.isLogin()) {
    auth.toLogin()
    return
  }
  if (downloadLink.value === '') {
    const downloadToken = await captcha.value.execute()
    try {
      const res = await services(`/levels/${levelId}/resources`, {
        method: 'POST',
        body: {
          captcha: downloadToken
        }
      })
      downloadLink.value = res.package 
    } catch (e) {
      errorAlert(e.name)
    }
  }
  window.open(downloadLink.value)
};
// ranking
const selectedDiffRank = ref((() => {
  return data.value.level.charts[0].type
})());
const diffRankPage = ref(1)
const realDiffRankPage = ref(1)
const loadingRank = ref(true)

const { data: rankData } = await syncRanking()

watch(selectedDiffRank, async () => {
  const { data: newRanking } = await syncRanking()
  rankData.value = newRanking.value
})
watch(diffRankPage, async (val, oldVal) => {
  const { data: newRanking } = await syncRanking()
  rankData.value = newRanking.value
  realDiffRankPage.value = val
})
const setRankPage = (val) => {
  diffRankPage.value = val
}

async function syncRanking() {
  loadingRank.value = true
  const ans = await useAsyncQuery(rankingQuery, { levelUid: levelId, type: selectedDiffRank.value, start: (diffRankPage.value - 1) * 10 })
  loadingRank.value = false
  return ans
}

// rating
const { mutate: _updateRate, onDone: afterUpdateRate, loading: updateRateLoading } = useMutation(gql`
  mutation LevelRate($uid: String!, $rating: Int) {
    rateLevel(id: $uid, rating: $rating) {
      average
      total
      distribution
      rating
    }
  }`, {
  variables: {
    uid: data.value.level.uid
  }
})

afterUpdateRate((res) => {
  data.value.level.rating = res.data.rateLevel
})

const _removeRate = async () => {
  userRating.value = 0
  const res = await services(`/levels/${levelId}/ratings`, {
    method: 'POST'
  })
  res.rating = 0
  data.value.level.rating = res
}

const updateRate = async (v) => {
  if (v <= 0) {
    updateRateLoading.value = true
    await _removeRate()
    updateRateLoading.value = false
    return
  } else if (v > 10) {
    return
  }
  await _updateRate({
    rating: v
  })
}

const ratingDownCount = computed(() => {
  return eval(data.value.level.rating.distribution.slice(0, 5).join('+'))
})

const ratingUpCount = computed(() => {
  return eval(data.value.level.rating.distribution.slice(5, 10).join('+'))
})

const userRating = ref(data.value.level.rating.rating + 0)
watch(userRating, (val, oldVal) => {
  updateRate(val)
})

// update library functions
const { mutate: addToLib, loading: addToLibLoading, onDone: afterAddToLib, onError: errAddToLib } = useMutation(gql`
  mutation AddToLibrary($levelId: Int!) {
    addToLibrary(levelId: $levelId)
  }`, {
  variables: {
    levelId: data.value.level.id
  }
})
afterAddToLib(() => {
  data.value.level.owned = false
  successAlert('Level added to Library')
})

const { mutate: removeFromLib, loading: removeFromLoading, onDone: afterRemoveFromLib, onError: errRemoveFromLib } = useMutation(gql`
  mutation RemoveFromLibrary($levelId: Int!) {
    removeFromLibrary(levelId: $levelId)
  }`, {
  variables: {
    levelId: data.value.level.id
  }
})
afterRemoveFromLib(() => {
  data.value.level.owned = null
  successAlert('Level removed from favorites', {
    type: "error"
  })
})
errRemoveFromLib(err => handleErrorToast(err))

function formatSize(size) {
  return formatBytes(size)
}

definePageMeta({
  layout: "contents",
})
setBackground(data.value.level.bundle.backgroundImage.original)
useHead(() => {
  const meta = new Meta(data.value.level?.title || 'Level', data.value.level?.description || '')
  meta.extend('author', data.value.level?.owner?.name || data.value.level?.owner?.uid)
  meta.extend('og:image', data.value.level?.bundle?.background)
  return meta
})
</script>