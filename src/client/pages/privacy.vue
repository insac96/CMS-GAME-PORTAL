<template>
  <div class="max-w-3xl mx-auto">
    <DataBanner terms/>
    <DataHead title="Chính Sách Quyền Riêng Tư" sub="Cách thông tin liên quan đến bạn được chúng tôi thu thập, sử dụng và tiết lộ" />

    <LoadingContent  v-if="loading"/>
    <div v-else>
      <DataEditor :content="privacy" empty="Chưa có thông tin" />
    </div>
  </div>
</template>

<script setup>
const configStore = useConfigStore()

useSeoMeta({
  title: () => `Chính Sách Quyền Riêng Tư - ${configStore.config.name}`,
  robots: 'none'
})

const privacy = ref(undefined)
const loading = ref(false)

const get = async () => {
  try {
    loading.value = true
    const data = await useAPI('config/privacy')

    privacy.value = data
    loading.value = false
  }
  catch (e) {
    loading.value = false    
  }
}
get()
</script>