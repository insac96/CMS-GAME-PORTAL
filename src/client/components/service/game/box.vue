<template>
  <NuxtLink :to="`/game/${game.key}`" v-if="game" class="max-w-[100px]">
    <UiFlex type="col" justify="center" class="BoxGame">
      <UiImg :src="game.og_image" ratio="1 / 1" class="rounded-3xl mb-2" w="70px" h="70px" />
      <UiText align="center" class="line-clamp-2 text-xs sm:text-sm px-2">{{ game.name }}</UiText>
    </UiFlex>
  </NuxtLink>
</template>

<script setup>
const props = defineProps(['game'])
</script>

<style lang="sass">
.BoxGame
  transition: all 0.25s ease
  cursor: pointer
  &:hover
    transform: translateY(-5px)
</style>
