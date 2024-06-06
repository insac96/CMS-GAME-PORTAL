<template>
  <div v-if="!!list">
    <UiFlex type="col" justify="center" class="mb-6">
      <UiText align="center" class="font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl text-lg">{{ title }}</UiText>
      <UiText align="center" color="gray" class="tracking-tight sm:text-lg text-sm">{{ sub }}</UiText>
    </UiFlex>
    
    <UiEmpty v-if="list.length == 0" title="Hiện tại chưa có dữ liệu" />
    
    <div v-else>
      <UiFlex justify="center" class="md:gap-4 gap-2" wrap>
        <ServiceGameBox v-for="game in list" :key="game._id" :game="game" />
      </UiFlex>
    </div>

    <UiFlex justify="center" v-if="list.length < page.total">
      <UPagination v-model="page.current" :page-count="page.size" :total="page.total" :max="5" show-last show-first />
    </UiFlex>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  sub: String,
  menu: String,
  type: String
})

const page = ref({
  size: 24,
  current: 1,
  sort: {
    column: 'updatedAt',
    direction: 'desc'
  },
  total: 0
})

const list = ref([])

const get = async () => {
  try {
    const data = await useAPI('game/list', {
      type: props.menu,
      key: props.type,
      page: JSON.parse(JSON.stringify(page.value))
    })

    list.value = data.list
    page.value.total = data.total
  }
  catch(e){
  }
}

onMounted(async () => {
  await nextTick()
  get()
})

</script>