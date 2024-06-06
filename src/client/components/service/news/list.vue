<template>
  <div v-if="!!list">
    <UiFlex type="col" justify="center" class="mb-6">
      <UiText align="center" class="font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl text-lg">{{ title }}</UiText>
      <UiText align="center" color="gray" class="tracking-tight sm:text-lg text-sm">{{ sub }}</UiText>
    </UiFlex>
    
    <UiEmpty v-if="list.length == 0" title="Hiện tại chưa có dữ liệu" />
    
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
</template>

<script setup>
const props = defineProps({
  title: String,
  sub: String,
  category: String
})

const page = ref({
  size: 8,
  current: 1,
  sort: {
    column: 'updatedAt',
    direction: 'desc'
  },
  total: 0
})

const list = ref(undefined)

const get = async () => {
  try {
    const send = JSON.parse(JSON.stringify(page.value))
    send.category = props.category
    
    const data = await useAPI('news/list', send)

    list.value = data.list
    page.value.total = data.total
  }
  catch(e){

  }
}

get()
</script>