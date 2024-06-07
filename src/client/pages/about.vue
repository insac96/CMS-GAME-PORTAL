<template>
  <div class="max-w-3xl mx-auto">
    <DataBanner :about="false" privacy terms />
    <DataHead title="Về Chúng Tôi" sub="Thông tin giới thiệu về tổ chức của chúng tôi" />

    <LoadingContent  v-if="loading"/>
    <div v-else>
      <DataEditor :content="about" empty="Chưa có thông tin" />
    </div>
  </div>
</template>

<script setup>
const configStore = useConfigStore()

useSeoMeta({
  title: () => `Về Chúng Tôi - ${configStore.config.name}`,
  robots: 'none'
})

const about = ref(undefined)
const loading = ref(false)

const get = async () => {
  try {
    loading.value = true
    const data = await useAPI('config/about')

    about.value = data
    loading.value = false
  }
  catch (e) {
    loading.value = false    
  }
}
get()
</script>