<template>
  <div class="max-w-4xl mx-auto">
    <ServiceNewsList title="Tin Tức" sub="Tổng hợp tất cả tin tức" :size="9" />
  </div>
</template>

<script setup>
const configStore = useConfigStore()

// Meta Seo
useSeoMeta({
  title: () => `Tin Tức - ${configStore.config.name}`,
  ogTitle: () => `Tin Tức - ${configStore.config.name}`,
})
</script>