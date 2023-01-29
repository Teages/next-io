<template>
  <BackToOld :url="route.path" />
  <div>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        {{ { search, order, sort, category, owner, page, featured, qualified } }}
        <div v-if="owner" class="flex items-center flex-wrap mb-4 gap-4">
          <div class="hidden"></div>
          <div class="badge badge-lg h-8 flex">
            <span class="ellipsis">
              Owner: {{ owner }}
            </span>
            <button class="btn btn-circle btn-xs ml-2" @click="owner = undefined">
              <Icon name="material-symbols:close" size="16" />
            </button>
          </div>
        </div>
        <div class="form-control">
          <div class="input-group text-base-content">
            <input v-model="search" type="text" placeholder="Search levels..." class="input input-bordered w-full">
            <button class="btn btn-square">
              <Icon name="material-symbols:search" size="24" />
            </button>
          </div>
        </div>
        <div class="pt-4 w-full sm:flex">
          <div class="sm:flex gap-4">
            <div class="max-w-fit">
              <p class="card-subtitle"> {{ $t('levels.sort_select_title') }} </p>
              <div class="form-control w-full max-w-xs pt-2">
                <div class="input-group">
                  <button v-if="order === 'desc'" class="btn btn-square" @click="order = 'asc'">
                    <Icon name="fa-solid:sort-amount-down" size="20" />
                  </button>
                  <button v-else class="btn btn-square" @click="order = 'desc'">
                    <Icon name="fa-solid:sort-amount-up" size="20" />
                  </button>
                  <select v-model="sort" class="select select-bordered">
                    <option value="relevance" :disabled="search.length === 0"> {{ $t('levels.sort_select_relevance') }}
                    </option>
                    <option value="creation_date">{{ $t('levels.sort_select_upload_date') }}</option>
                    <option value="modification_date">{{ $t('levels.sort_select_modification_date') }}</option>
                    <option value="difficulty">{{ $t('levels.sort_select_difficulty') }}</option>
                    <option value="duration">{{ $t('levels.sort_select_duration') }}</option>
                    <option value="downloads">{{ $t('levels.sort_select_downloads') }}</option>
                    <option value="rating">{{ $t('levels.sort_select_rating') }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="pt-4 sm:pt-0">
              <p class="card-subtitle"> {{ $t('levels.sort_select_title') }} </p>
              <div class="btn-group pt-2">
                <button :class="addClassIf('btn', 'btn-active', !(featured || qualified))" @click="featured = false; qualified = false">
                  {{ $t('levels.category_select_item_all') }}
                </button>
                <button :class="addClassIf('btn btn-fea', 'btn-active', featured)" @click="featured = !featured">
                  {{ $t('levels.category_select_item_featured') }}
                </button>
                <button :class="addClassIf('btn btn-qua', 'btn-active', qualified)" @click="qualified = !qualified">
                  {{ $t('levels.category_select_item_qualified') }}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <template v-if="levels || true">
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8 md:gap-6 xl:gap-8">
        <LevelCard />
        <LevelCard />
        <LevelCard />
        <LevelCard />
        <LevelCard />
      </div>
      <div class="w-full flex justify-center sm:justify-end">
        <div class="flex pt-4">
          <div class="flex-1" />
          <div class="btn-group shadow-xl">
            <button class="btn" :disabled="page === 1" @click="page = 1">
              <Icon name="ic:round-keyboard-double-arrow-left" />
            </button>
            <button class="btn" :disabled="page === 1" @click="page -= 1">
              <Icon name="ic:round-keyboard-arrow-left" />
            </button>
            <button class="btn btn-active">{{ page }} / {{ totalPagesCount }}</button>
            <button class="btn" :disabled="totalPagesCount <= page" @click="page += 1">
              <Icon name="ic:round-keyboard-arrow-right" />
            </button>
            <button class="btn" :disabled="totalPagesCount <= page" @click="page = totalPagesCount">
              <Icon name="ic:round-keyboard-double-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      No level found.
    </template>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

// router: http://localhost:3000/levels?search=anime&sort=creation_date&order=desc&category=all&page=1&owner=teages_0v0

const levels = ref([])
const totalPagesCount = ref(0)

const search = ref(route.query.search || '')
const order = ref(route.query.order || 'desc')
const sort = ref(route.query.sort || 'relevance')
const category = ref(route.query.search || 'all')
const owner = ref(route.query.owner || '')
const page = ref(1)

if (!isNaN(parseInt(route.query.page))) {
  page.value = parseInt(route.query.page)
  if (page.value < 1) {
    page.value = 1
  }
}

if (search.value === '' && sort.value === 'relevance') {
  sort.value = 'creation_date'
}

const featured = ref(false)
const qualified = ref(false)

async function updateRouter() {
  router.push({
    query: {
      ...route.query
    }
  })
}

// data fetch

async function syncData() {
  console.log(baseURL(route.query))
  function baseURL(query) {
    if (query.search) {
      return '/search/levels'
    }
    if (query.sort && !['creation_date', 'modification_date', 'duration', 'difficulty'].includes(query.sort)) {
      return '/search/levels'
    }
    return '/levels'
  }
}



useHead({
  title: 'Levels - Cytoid'
})
</script>