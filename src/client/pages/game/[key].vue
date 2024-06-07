<template>
  <div class="max-w-4xl mx-auto">
    <LoadingGameId v-if="loading || !game" />

    <div v-else>
      <!-- Info -->
      <div class="grid grid-cols-12 gap-4 mb-4">
        <!-- Left -->
        <div class="lg:col-span-7 col-span-12">
          <UiSlide :images="slideList" />
        </div>
        
        <!-- Right -->
        <div class="lg:col-span-5 col-span-12">
          <!-- Name - Info -->
          <div class="mb-2">
            <UiText weight="bold" class="sm:text-2xl text-xl">{{ game.name }}</UiText>
            <UiText weight="semibold" color="primary">{{ game.description }}</UiText>
          </div>

          <!-- Tag -->
          <UiFlex justify="between" class="mb-4">
            <UiFlex class="gap-0.5" wrap>
              <UBadge color="gray" class="cursor-pointer" @click="navigateTo(`/game/platform/${game.platform.key}`)">{{ game.platform.name }}</UBadge>
              <UBadge color="gray" class="cursor-pointer" @click="navigateTo(`/game/category/${game.category.key}`)">{{ game.category.name }}</UBadge>
            </UiFlex>

            <UiFlex class="gap-2">
              <UiFlex class="gap-1">
                <UiIcon size="3" color="gray" name="i-ion-eye"></UiIcon>
                <UiText size="xs">{{ game.view || 0 }}</UiText>
              </UiFlex>

              <UiFlex class="gap-1">
                <UiIcon size="3" color="gray" name="i-bxs-download"></UiIcon>
                <UiText size="xs">{{ game.play || 0 }}</UiText>
              </UiFlex>
            </UiFlex>
          </UiFlex>

          <!-- Download -->
          <UiFlex wrap justify="center" class="gap-1 mb-4">
            <UButton v-if="game.download.web" :loading="downloading.web" @click="downloadAction('web')" icon="i-bxl-internet-explorer" color="gray">Chơi ngay</UButton>
            <UButton v-if="game.download.windows" :loading="downloading.windows" @click="downloadAction('windows')" icon="i-bxl-windows" color="blue">PC</UButton>
            <UButton v-if="game.download.android" :loading="downloading.android" @click="downloadAction('android')" icon="i-bxl-android" color="green">Android</UButton>
            <UButton v-if="game.download.ios" :loading="downloading.ios" @click="downloadAction('ios')" icon="i-bxl-apple" color="black">IOS</UButton>
            <UButton v-if="
                !game.download.web
                && !game.download.windows
                && !game.download.android
                && !game.download.ios
              "
              icon="i-bx-block"
              color="gray" 
              disabled
            >Chưa có link tải</UButton>
          </UiFlex>

          <!--Payment-->
          <UiFlex type="col" justify="center">
            <ServicePaymentBtn class="w-full mb-2" :game="game" />
            <UiText align="center" color="red" size="xs">Vui lòng không nạp trong trò chơi</UiText>
          </UiFlex>
        </div>
      </div>

      <!-- Content -->
      <div class="mb-4 ">
        <UDivider label="Mô Tả Chi Tiết" class="mb-4" />
        <div class="w-full">
          <DataEditor v-if="game.content" :content="game.content" empty="Chưa có nội dung"></DataEditor>
          <DataEmpty v-else icon="i-bx-book-content" title="Chưa có nội dung"></DataEmpty>
        </div>
      </div>

      <!-- Update -->
      <UiFlex justify="between" class="mb-4">
        <UiText size="sm" color="gray">Cập nhật lần cuối</UiText>
        <UiText size="sm" weight="semibold">{{ useDayJs().displayDate(game.updatedAt) }}</UiText>
      </UiFlex>
    </div>
  </div>
</template>

<script setup>
const { img } = useMakeLink()
const configStore = useConfigStore()
const authStore = useAuthStore()
const route = useRoute()
const loading = ref(false)
const game = ref(undefined)
const downloading = ref({
  web: false,
  windows: false,
  android: false,
  ios: false
})

// Meta Seo
useSeoMeta({
  title: () => game.value ? `${game.value.name} - ${configStore.config.name}` : 'Loading...',
  ogTitle: () => game.value ? `${game.value.name} - ${configStore.config.name}` : 'Loading...',
  description: () => game.value ? game.value.description : 'Loading...',
  ogDescription: () => game.value ? game.value.description : 'Loading...',
  ogImage: () => game.value ? img(game.value.og_image) : 'Loading...',
  ogImageAlt: () => game.value ? game.value.name : 'Loading...'
})


const slideList = computed(() => {
  if(!game.value) return []
  if(game.value.images.length == 0) {
    const l = []
    l.push(game.value.og_image)
    return l
  }
  return game.value.images
})

const downloadAction = async (type) => {
  try {
    if(!authStore.isLogin) return authStore.setModal(true)
    if(!game.value) return 

    downloading.value[type] = true
    const data = await useAPI('game/download', {
      game: game.value._id,
      type: type
    })

    downloading.value[type] = false

    setTimeout(() => {
      window.open(data, '_blank')
    }, 100)
  }
  catch (e){
    downloading.value[type] = false
  }
}

const getGame = async () => {
  try {
    loading.value = true
    const data = await useAPI('game/get', {
      key: route.params.key
    })

    loading.value = false
    game.value = data
  }
  catch (e){
    loading.value = false
  }
}

getGame()
</script>