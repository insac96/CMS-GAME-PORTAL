<template>
  <UiFlex>
    <!-- Not Login -->
    <UButton 
      size="sm" 
      label="Tài khoản"
      aria-label="Login" 
      color="gray"
      v-if="!authStore.isLogin" 
      @click="authStore.setModal(true)"
    >
      <template #trailing>
        <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
      </template>
    </UButton>
    
    <!--Is Login -->
    <AuthSign v-if="!!authStore.isLogin" />
  </UiFlex>
</template>

<script setup>
const authStore = useAuthStore()
</script>