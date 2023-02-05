<template>
  <!-- <BackToOld :url="route.path" /> -->
  <div>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
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
            <button class="btn btn-primary btn-square" @click="updateSearch" :disabled="search === route.query.search">
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
                <button :class="addClassIf('btn', 'btn-active', !(featured || qualified))" @click="selectAll">
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
    <progress v-if="loading" class="progress progress-info w-full"></progress>
    <template v-if="levels">
      <div :class="addClassIf('grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8 md:gap-6 xl:gap-8', 'opacity-60', loading)">
        <LevelCard v-for="level in levels" :level="level" />
      </div>
      <progress v-if="loading" class="progress progress-info w-full"></progress>
      <Pagination class="w-full justify-center sm:justify-end"
        :page="page"
        :total-page="totalPagesCount"
        :to-first-page="() => {page = 1}"
        :to-prev-page="() => {page -= 1}"
        :to-next-page="() => {page += 1}"
        :to-final-page="() => {page = totalPagesCount}"
      />
    </template>
    <template v-else>
      No level found.
    </template>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const services = useService()

const levels = ref([])
const totalPagesCount = ref(0)
const totalLevelsCount = ref(0)
const loading = ref(true)

// router
const search = ref(route.query.search || '')
const order = computed({
  get() {
    return route.query.order || 'desc'
  },
  set(newVal) {
    updateRouter({ order: newVal })
  }
})
const sort = computed({
  get() {
    if (search.value !== '') {
      return route.query.sort || 'relevance'
    }
    if (route.query.sort === 'relevance') {
      return 'creation_date'
    }
    return route.query.sort || 'creation_date'
  },
  set(newVal) {
    updateRouter({ sort: newVal })
  }
})
const featured = computed({
  get() {
    return route.query.featured === 'true' || false
  },
  set(newVal) {
    updateRouter({ featured: newVal })
  }
})
const qualified = computed({
  get() {
    return route.query.qualified === 'true' || false
  },
  set(newVal) {
    updateRouter({ qualified: newVal })
  }
})
const selectAll = () => {
  updateRouter({
    qualified: false,
    featured: false
  })
};
const owner = computed({
  get() {
    return route.query.owner || ''
  },
  set(newVal) {
    updateRouter({ owner: newVal })
  }
})
const page = computed({
  get() {
    let count = parseInt(route.query.page) || 1
    if (isNaN(count)) {
      return 1
    }
    return count > 0 ? count : 1
  },
  set(newVal) {
    updateRouter({ page: newVal })
  }
})

const updateSearch = () => {
  updateRouter({ search: search.value })
}

async function updateRouter(val) {
  await router.replace({
    query: {
      ...route.query,
      ...val
    }
  })
  await syncData()
  if (window) {
    window.scroll(0,0)
  }
}

// data fetch
const pageSize = 18
async function syncData() {
  loading.value = true
  const url = baseURL(route.query)
  const res = await services.raw(url, {
    query: {
      ...route.query,
      sort: sort.value === 'relevance' ? undefined : sort.value,
      order: order.value,
      page: page.value - 1,
      limit: pageSize
    }
  })
  totalPagesCount.value = parseInt(res.headers.get('x-total-page')) || 0
  totalLevelsCount.value = parseInt(res.headers.get('x-total-entries')) || 0

  levels.value = [...res._data]
  loading.value = false
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
syncData()


useHead({
  title: 'Levels - Cytoid'
})
</script>