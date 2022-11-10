<template>
  <BackToOld :url="route.path" />
  {{ data }}
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
const { data } = useQuery(query, {
  uid: route.params.id
})
console.log(data)
</script>