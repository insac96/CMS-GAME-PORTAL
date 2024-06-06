<template>
  <div v-if="loading || !news">Loading...</div>

  <UiFlex v-else type="col" justify="center" class="max-w-3xl mx-auto">
    <UiSlide :images="slideList" class="w-full mb-4" />

    <div class="w-full mb-4">
      <UiText weight="bold" class="text-xl lg:text-2xl">{{ news.title }}</UiText>
      <UiText color="gray" class="text-md lg:text-md">{{ news.description }}</UiText>
    </div>

    <div class="w-full mb-4">
      <DataEditor :content="news.content" empty="Chưa có nội dung"></DataEditor>
    </div>

    <UiFlex justify="between" class="mb-4 w-full">
      <UiText size="sm" color="gray">Cập nhật lần cuối</UiText>
      <UiText size="sm" weight="semibold">{{ useDayJs().displayDate(news.updatedAt) }}</UiText>
    </UiFlex>
  </UiFlex>
</template>

<script setup>
const { img } = useMakeLink()
const configStore = useConfigStore()
const route = useRoute()
const loading = ref(false)
const news = ref(undefined)

// Meta Seo
useSeoMeta({
  title: () => news.value ? `${news.value.title} - ${configStore.config.name}` : 'Loading...',
  ogTitle: () => news.value ? `${news.value.title} - ${configStore.config.name}` : 'Loading...',
  description: () => news.value ? news.value.description : 'Loading...',
  ogDescription: () => news.value ? news.value.description : 'Loading...',
  ogImage: () => news.value ? img(news.value.og_image) : 'Loading...',
  ogImageAlt: () => news.value ? news.value.title : 'Loading...'
})

const slideList = computed(() => {
  if(!news.value) return []
  if(news.value.images.length == 0) {
    const l = []
    l.push(news.value.og_image)
    return l
  }
  return news.value.images
})

const getNews = async () => {
  try {
    loading.value = true
    const data = await useAPI('news/get', {
      key: route.params.key
    })

    loading.value = false
    news.value = data
  }
  catch (e){
    loading.value = false
  }
}

getNews()
</script>