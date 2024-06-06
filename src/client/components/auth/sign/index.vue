<template>
  <UiFlex>
    <UDropdown 
      :items="menu" 
      :ui="{ 
        item: {
          disabled: 'cursor-text select-text' } 
      }" 
      :popper="{ 
        placement: 'bottom-end' 
      }"
    >
      <UAvatar :src="authStore.profile.avatar" />

      <template #item="{ item }">
        <UiText class="truncate">{{ item.label }}</UiText>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
      </template>
    </UDropdown>

    <UModal v-model="modal.historyPayment" :ui="{ width: 'lg:max-w-4xl md:max-w-2xl sm:max-w-xl' }">
      <ServicePaymentHistory @close="modal.historyPayment = false" />
    </UModal>
  </UiFlex>
</template>

<script setup>
const authStore = useAuthStore()

const modal = ref({
  historyPayment: false
})

const menu = computed(() => {
  const list = []
  
  if(authStore.profile.type > 0){
    list.push([{
      label: 'Quản trị viên',
      icon: 'i-eos-icons-admin',
      disabled: authStore.profile?.type < 1 ? true : false,
      click: () => navigateTo('/admin')
    }])
  }

  list.push([{
    label: 'Tài khoản',
    icon: 'i-bx-user',
    click: () => navigateTo('/user')
  },{
    label: 'Lịch sử nạp',
    icon: 'i-bx-credit-card',
    click: () => modal.value.historyPayment = true
  }])

  list.push([{
    label: 'Đăng xuất',
    icon: 'i-bx-log-in',
    click: () => authStore.delAuth()
  }])

  return list
})
</script>