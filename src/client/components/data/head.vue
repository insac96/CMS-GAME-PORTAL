<template>
  <UiFlex type="col" justify="center" class="mb-6">
    <UiText align="center" class="font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl text-lg">{{ title }}</UiText>
    <UiText align="center" color="gray" class="tracking-tight sm:text-lg text-sm">{{ sub }}</UiText>
  </UiFlex>
</template>

<script setup>
const props = defineProps(['title', 'sub'])
</script>