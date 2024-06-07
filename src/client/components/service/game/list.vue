<template>
  <div>
    <DataHead :title="title" :sub="sub" v-if="!!title || !!sub" />

    <UiFlex justify="center" class="md:gap-4 gap-2" wrap v-if="!!loading || !list">
      <LoadingGameBox v-for="i in page.size" :key="i" class="md:col-span-4 col-span-6"/>
    </UiFlex>
    
    <div v-else>
      <DataEmpty v-if="list.length == 0" title="Hiện tại chưa có dữ liệu" />
      
      <div v-else>
        <UiFlex justify="center" class="md:gap-4 gap-2" wrap>
          <ServiceGameBox v-for="game in list" :key="game._id" :game="game" />
        </UiFlex>
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
  menu: String,
  type: String,
  size: Number
})

const page = ref({
  size: props.size || 30,
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
    loading.value = true
    const data = await useAPI('game/list', {
      type: props.menu,
      key: props.type,
      page: JSON.parse(JSON.stringify(page.value))
    })

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