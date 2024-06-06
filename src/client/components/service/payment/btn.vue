<template>
  <div v-if="game">
    <UButton size="lg" block color="red" @click="action">Nạp Ngay</UButton>

    <UModal v-model="modal">
      <UCard>
        <template #header>
          <UiFlex justify="between">
            <UiLogo />
            <UButton color="gray" icon="i-bx-x" square variant="ghost" :padded="false" @click="modal = false"></UButton>
          </UiFlex>
        </template>

        <ServicePaymentCreate :game="game"/>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const authStore = useAuthStore()
const props = defineProps(['game'])
const modal = ref(false)

const action = async () => {
  if(!authStore.isLogin) return authStore.setModal(true)
  modal.value = true
}
</script>