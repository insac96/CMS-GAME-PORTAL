<template>
  <div>
    <DataHead :title="title" :sub="sub" />

    <div class="grid grid-cols-12 gap-4 md:mb-6" v-if="!!loading || !list">
      <LoadingNewsBox v-for="i in page.size" :key="i" class="md:col-span-4 col-span-6"/>
    </div>
    
    <div v-else>
      <DataEmpty v-if="list.length == 0" title="Hiện tại chưa có dữ liệu" />

      <div class="grid grid-cols-12 gap-4 md:mb-6 mb-4" v-else>
        <ServiceNewsBox
          v-for="news in list" :key="news._id" :news="news"
          class="md:col-span-4 col-span-6"
        />
      </div>

      <UiFlex justify="center" v-if="list.length < page.total">
        <UPagination v-model="page.current" :page-count="page.size" :total="page.total" :max="5" show-last show-first />
      </UiFlex>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  sub: String,
  category: String,
  size: Number
})

const page = ref({
  size: props.size || 6,
  current: 1,
  sort: {
    column: 'updatedAt',
    direction: 'desc'
  },
  total: 0
})

const list = ref(undefined)
const loading = ref(true)

const get = async () => {
  try {
    const send = JSON.parse(JSON.stringify(page.value))
    send.category = props.category
    loading.value = true
    
    const data = await useAPI('news/list', send)

    loading.value = false
    list.value = data.list
    page.value.total = data.total
  }
  catch(e){
    loading.value = false
  }
}

onMounted(async () => {
  await nextTick()
  get()
})
</script>