<template>
  <div class="max-w-5xl mx-auto" v-if="!!authStore.isLogin">
    <div class="grid grid-cols-12 gap-2">
      <div class="lg:col-span-4 col-span-12">
        <ServiceUserBox />
      </div>

      <div class="lg:col-span-8 col-span-12">
        <ServiceUserEdit />
      </div>
    </div>
  </div>
</template>

<script setup>
const configStore = useConfigStore()
const authStore = useAuthStore()

definePageMeta({
  middleware: 'user'
})

// Meta Seo
useSeoMeta({
  title: () => `Tài Khoản - ${configStore.config.name}`,
  ogTitle: () => `Tài Khoản - ${configStore.config.name}`,
  robots: 'none'
})

watch(() => authStore.isLogin, (val) => !val && navigateTo('/'))
</script>