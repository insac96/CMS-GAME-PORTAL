<template>
  <div>
    <UButton block size="md" class="mb-2" @click="navigateTo('/')">Trang Chủ</UButton>

    <UAccordion 
      :items="navItems" 
      :ui="{
        'item': { padding: 'pt-0 pb-2 pl-6' },
      }"
      multiple
    >
      <template #default="{item, open}">
        <UiFlex items="center" class="py-2 mb-2 cursor-pointer overflow-hidden select-none">
          <UiIcon :name="item.icon" size="5" :color="open ? 'primary' : 'gray'"/>
          <UiText 
            class="mx-4" 
            size="sm" 
            weight="semibold" 
            :color="open ? 'primary' : 'gray'"
            :text="item.label"
          />
          <UiIcon
            name="i-bx-chevron-right"
            size="5"
            :color="open ? 'primary' : 'gray'"
            class="ms-auto transform transition-transform duration-200"
            :class="[open && 'rotate-90']"
          />
        </UiFlex>
      </template>
      <template #tab-0><UVerticalNavigation :links="navItems[0].children" @click="emit('to')"/></template>
      <template #tab-1><UVerticalNavigation :links="navItems[1].children" @click="emit('to')"/></template>
      <template #tab-2><UVerticalNavigation :links="navItems[2].children" @click="emit('to')"/></template>
      <template #tab-3><UVerticalNavigation :links="navItems[3].children" @click="emit('to')"/></template>
      <template #tab-4><UVerticalNavigation :links="navItems[4].children" @click="emit('to')"/></template>
    </UAccordion>
  </div>
</template>

<script setup>
const emit = defineEmits(['to'])
const navItems = [
  {
    label: 'Quản lý',
    icon: 'i-bxs-grid-alt',
    defaultOpen: true,
    slot: 'tab-0',
    children: [
      { label: 'Cài đặt', to: '/admin/config' },
    ]
  },
  {
    label: 'Tin tức',
    icon: 'i-bx-news',
    defaultOpen: true,
    slot: 'tab-1',
    children: [
    { label: 'Danh mục', to: '/admin/news/category' }, 
    { label: 'Danh sách', to: '/admin/news' }, 
    ]
  },
  {
    label: 'Nạp tiền',
    icon: 'i-bx-credit-card',
    defaultOpen: true,
    slot: 'tab-2',
    children: [
    { label: 'Kênh nạp', to: '/admin/payment/gate' }, 
    { label: 'Danh sách', to: '/admin/payment' }, 
    ]
  },
  {
    label: 'Tài khoản',
    icon: 'i-bx-user',
    defaultOpen: true,
    slot: 'tab-3',
    children: [
      { label: 'Danh sách', to: '/admin/user' }, 
    ]
  },
  {
    label: 'Trò chơi',
    icon: 'i-bx-cube-alt',
    defaultOpen: true,
    slot: 'tab-4',
    children: [
      { label: 'Nền tảng', to: '/admin/game/platform' },
      { label: 'Thể loại', to: '/admin/game/category' }, 
      { label: 'Danh sách', to: '/admin/game' },
    ]
  }
]
</script>