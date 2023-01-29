<template>
  <div class="card min-w-84 max-h-60 h-60 bg-base-100 overflow-auto shadow-xl flex flex-col">
    <div class="bg-green-100 w-full flex-1">
      <div class="h-full w-full bg-base-100/40">
        <div class="h-full w-full bg-base-100/60 hover:bg-base-100/0 transition-colors p-3 flex flex-col">
          <div class="w-full flex flex-row">
            <UserAvatar :avatar="undefined" :name="'charter_name_is_long'" :uid="'teages'"
              class="h-8 clickable bg-transparent" />
            <div class="flex-1" />
            <div class="grid grid-flow-row gap-2">
              <div class="badge badge-lg h-8 category-badge-featured">Featured</div>
              <div class="badge badge-lg h-8 category-badge-qualified">Qualified</div>
            </div>
          </div>
          <div class="flex-1" />
          <div class="w-full flex flex-row">
            <div class="w-[95%]">
              <h2 class="card-title block truncate">Titleeeeeeeeeeeeeeeeeeeeeeeeeeee</h2>
              <h2 class="block truncate opacity-80">Romanization is loooooooooooooooooooooong</h2>
              <h2 class="text-neutral-content opacity-80 truncate">Artist x Artist x Artist x Artist x Artist x Artist x
              </h2>
            </div>
            <div class="flex-1" />
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 px-2 card-body flex-none">
      <div class="w-full flex flex-row">
        <div class="flex items-center space-x-2">
          <LevelDiffBadgeSmall :type="'easy'" :difficulty="5" :notes-count="1" />
          <LevelDiffBadgeSmall :type="'hard'" :difficulty="9" :notes-count="1" />
          <LevelDiffBadgeSmall :type="'extreme'" :difficulty="16" :notes-count="1" />
        </div>
        <div class="flex-1" />
        <button class="btn btn-circle btn-sm btn-ghost">
          <Icon name="material-symbols:play-arrow" size="24" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// const props = defineProps({
//   level: {
//     type: Object,
//     required: true
//   }
// })


</script>