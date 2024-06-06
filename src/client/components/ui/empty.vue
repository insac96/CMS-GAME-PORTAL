<template>
  <UiFlex justify="center">
    <UCard class="w-full w-[300px] max-w-full py-6">
      <UiFlex type="col">
        <UiIcon size="14" color="primary" :name="icon || 'i-bx-data'"></UiIcon>
        <UiText size="sm" color="gray">{{ title || 'Không có dữ liệu' }}</UiText>
      </UiFlex>
    </UCard>
  </UiFlex>
</template>

<script setup>
const props = defineProps(['title', 'icon'])
</script>