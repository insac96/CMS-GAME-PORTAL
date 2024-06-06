<template>
  <div v-if="user">
    <UCard class="mb-2">
      <UiFlex justify="center" class="mb-4">
        <UAvatar size="3xl" :src="user.avatar" />
      </UiFlex>

      <UiText align="center" size="lg" weight="semibold" class="capitalize mb-1">{{ user.username }}</UiText>

      <UiFlex justify="center" class="gap-1 mb-4" wrap>
        <UBadge :color="typeFormat[user.type].color" variant="soft">
          {{ typeFormat[user.type].label }}
        </UBadge>
      </UiFlex>

      <UiFlex justify="between" class="text-gray-500 dark:text-gray-400 py-2">
        <UiIcon name="i-bx-envelope" size="5" class="mr-6" />

        <UiText size="sm">{{ user.email || '...' }}</UiText>
      </UiFlex>

      <UiFlex justify="between" class="text-gray-500 dark:text-gray-400 py-2">
        <UiIcon name="i-bx-phone" size="5" class="mr-6" />

        <UiText size="sm">{{ user.phone || '...' }}</UiText>
      </UiFlex>
    </UCard>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const user = computed(() => authStore.profile)

const typeFormat = {
  0: { label: 'MEMBER', color: 'gray' },
  1: { label: 'SMOD', color: 'green' },
  2: { label: 'ADMIN', color: 'red' },
  99: { label: 'ROBOT', color: 'orange' }
}
</script>