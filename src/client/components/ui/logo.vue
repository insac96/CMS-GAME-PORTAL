<template>
  <UiFlex>
    <UiText weight="bold" size="2xl" color="primary" class="italic">ENI</UiText>
    <UiText v-if="!!header" class="ml-1 pt-1.5 italic hidden md:inline-block" size="sm" weight="semibold">Games</UiText>
    <UiText v-else class="ml-1 pt-1.5 italic" size="sm" weight="semibold">Games</UiText>
  </UiFlex>
</template>

<script setup>
const props = defineProps({
  header: Boolean
})
</script>