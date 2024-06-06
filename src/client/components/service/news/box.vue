<template>
  <UCard v-if="news" class="BoxNews shadow-lg" :ui="{
    body: { padding: 'p-0 sm:p-0' },
    footer: { padding: 'pb-2 sm:pb-2 pt-0 sm:pt-0', base: 'border-none' }
  }">
    <div @click="open(news.key)" class="cursor-pointer w-full">
      <UiImg 
        :src="news.og_image" 
        ratio="16 / 9"
        w="100%"
      />
    </div>

    <div class="pt-2 pb-3 px-4">
      <NuxtLink :to="`/news/${news.key}`" class="lg:text-lg md:text-md text-sm line-clamp-1 text-gray hover:text-primary font-semibold">
        {{ news.title }}
      </NuxtLink>
      <UiText class="line-clamp-1 lg:text-md md:text-sm text-xs" color="gray">{{ news.description }}</UiText>
    </div>

    <template #footer>
      <UiFlex justify="between" class="gap-2">
        <UiFlex class="gap-1">
          <UiIcon size="3" color="gray" name="i-ion-eye"></UiIcon>
          <UiText size="xs">{{ news.view || 0 }}</UiText>
        </UiFlex>

        <UBadge color="gray" class="cursor-pointer">{{ news.category.name }}</UBadge>
      </UiFlex>
    </template>
  </UCard>
</template>

<script setup>
const props = defineProps(['news'])

const open = async (key) => {
  await navigateTo(`/news/${key}`)
}
</script>

<style lang="sass">
.BoxNews
  transition: all 0.25s ease
  &:hover
    transform: translateY(-5px)
</style>
