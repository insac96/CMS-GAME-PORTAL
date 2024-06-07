<template>
  <div class="max-w-3xl mx-auto">
    <DataBanner privacy />
    <DataHead title="Điều Khoản Dịch Vụ" sub="Điều khoản mà theo đó bạn có thể sử dụng các dịch vụ của chúng tôi" />

    <LoadingContent v-if="loading"/>
    <div v-else>
      <DataEditor :content="terms" empty="Chưa có thông tin" />
    </div>
  </div>
</template>

<script setup>
const configStore = useConfigStore()

useSeoMeta({
  title: () => `Điều Khoản Dịch Vụ - ${configStore.config.name}`,
  robots: 'none'
})

const terms = ref(undefined)
const loading = ref(false)

const get = async () => {
  try {
    loading.value = true
    const data = await useAPI('config/terms')

    terms.value = data
    loading.value = false
  }
  catch (e) {
    loading.value = false    
  }
}
get()
</script>