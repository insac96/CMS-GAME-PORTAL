<template>
  <UModal v-model="open">
    <UCard>
      <template #header>
        <UiFlex justify="between">
          <UiLogo />
          <UButton color="gray" icon="i-bx-x" square variant="ghost" :padded="false" @click="open = false"></UButton>
        </UiFlex>
      </template>

        <!-- Tab Sign In -->
        <AuthSignIn v-if="tab == 0" @done="open = false" @signup="tab = 1" />

        <!-- Tab Sign Up -->
        <AuthSignUp v-if="tab == 1" @done="open = false" @signin="tab = 0" />
    </UCard>
  </UModal>
</template>

<script setup>
const authStore = useAuthStore()

const open = ref(false)
watch(() => authStore.modal, (val) => (open.value = val))
watch(() => open.value, (val) => (!val && authStore.setModal(false)))

const tab = ref(0) 
</script>