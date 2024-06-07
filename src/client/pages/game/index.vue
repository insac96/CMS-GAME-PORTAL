<template>
  <div class="max-w-4xl mx-auto">
    <DataHead title="Trò Chơi" sub="Tổng hợp tất cả trò chơi"  />

    <div class="mb-8">
      <UiFlex wrap justify="center" class="gap-1.5 mb-1.5">
        <UButton 
          :color="(state.menu == 'platform' && state.key == item.key) ? 'primary' : 'gray'" 
          v-for="item in platforms" 
          :key="item._id" 
          @click="select('platform', item.key)"
        >{{ item.name }}</UButton>
      </UiFlex>

      <UiFlex wrap justify="center" class="gap-1.5 mb-1.5">
        <UButton 
          :color="(state.menu == 'category' && state.key == item.key) ? 'primary' : 'gray'" 
          v-for="item in categories" 
          :key="item._id" 
          @click="select('category', item.key)"
        >{{ item.name }}</UButton>
      </UiFlex>
    </div>

    <ServiceGameList :size="40" :menu="state.menu" :type="state.key" :key="update" />
  </div>
</template>

<script setup>
const configStore = useConfigStore()

const platforms = ref([])
const categories = ref([])
const update = ref(0)

const state = ref({
  menu: 'latest',
  key: null
})

// Meta Seo
useSeoMeta({
  title: () => `Trò Chơi - ${configStore.config.name}`,
  ogTitle: () => `Trò Chơi - ${configStore.config.name}`,
})

const select = (menu, key) => {
  if(state.value.menu == menu && state.value.key == key){
    state.value.menu = 'latest'
    state.value.key = null
  }
  else {
    state.value.menu = menu
    state.value.key = key
  }
  
  update.value++
}

const get = async () => {
  try {
    const platformsData = await useAPI('game/platform/list')
    const categoriesData = await useAPI('game/category/list')

    platforms.value = platformsData
    categories.value = categoriesData
  }
  catch(e){
    platforms.value = []
    categories.value = []
  }
}

get()
</script>