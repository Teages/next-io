<template>
  <div>
    <div class="h-24 relative">
      <div class="absolute bottom-0 left-0" id="contentTitle">
        <h1 class="text-4xl font-bold">{{ data.page.title }}</h1>
      </div>
    </div>
    <div class="mt-4 md:grid md:grid-cols-12 md:grid-flow-col md:gap-4">
      <div class="col-span-12 mt-4 md:mt-0">
        <div class="card w-full bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="prose lg:prose-lg max-w-none" v-html="useSafeMarked(data.page.content)" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
const route = useRoute()
const query = gql`
  query GetPost($uid: String!) {
    page: getPost(uid: $uid) {
      id
      uid
      title
      slogan
      content
      state
      creationDate
      modificationDate
      startDate
      endDate
      cover {
        original
      }
    }
  }
`
const { data } = await useAsyncQuery(query, {
  uid: route.params.id
})
</script>