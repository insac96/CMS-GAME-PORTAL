
<template>
  <UiFlex type="col" justify="center" class="sm:py-24 py-10">
    <UiText align="center" class="font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl text-3xl">{{ configStore.config.name }}</UiText>
    <UiText align="center" size="lg" color="gray" class="sm:mt-2 mt-1 tracking-tight">{{ configStore.config.description }}</UiText>

    <UiFlex justify="center" class="gap-2 mt-6 mb-4" wrap>
      <UButton label="Về chúng tôi" variant="soft" size="lg" @click="navigateTo('/about')" v-if="about">
        <template #trailing>
          <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
        </template>
      </UButton>

      <UButton size="lg" color="gray" @click="modal = true">Liên hệ</UButton>
    </UiFlex>

    <UiFlex justify="center">
      <UButton label="Quyền Riêng Tư" variant="link" @click="navigateTo('/privacy')" v-if="privacy" />
      <UButton label="Điều Khoản" variant="link" @click="navigateTo('/terms')" v-if="terms" />
    </UiFlex>

    <UModal v-model="modal">
      <UCard>
        <template #header>
          <UiFlex justify="between">
            <DataLogo />
            <UButton color="gray" icon="i-bx-x" square variant="ghost" :padded="false" @click="modal = false"></UButton>
          </UiFlex>
        </template>

        <UiFlex class="mb-6">
          <UiIcon name="i-bxs-business" color="primary" class="mr-2" />
          <UiText size="sm" weight="semibold" class="mr-auto" mini>Company</UiText>
          <UiText size="sm" weight="semibold" align="right" color="gray" class="ml-6">{{ contact.name || 'Chưa cập nhật' }}</UiText>
        </UiFlex>
        <UiFlex class="mb-6">
          <UiIcon name="i-bxs-map" color="primary" class="mr-2" />
          <UiText size="sm" weight="semibold" class="mr-auto" mini>Address</UiText>
          <UiText size="sm" weight="semibold" align="right" color="gray" class="ml-6">{{ contact.address || 'Chưa cập nhật' }}</UiText>
        </UiFlex>
        <UiFlex class="mb-6">
          <UiIcon name="i-bxs-phone" color="primary" class="mr-2" />
          <UiText size="sm" weight="semibold" class="mr-auto" mini>Phone</UiText>
          <UiText size="sm" weight="semibold" align="right" color="gray" class="ml-6">{{ contact.phone || 'Chưa cập nhật' }}</UiText>
        </UiFlex>
        <UiFlex>
          <UiIcon name="i-bxs-envelope" color="primary" class="mr-2" />
          <UiText size="sm" weight="semibold" class="mr-auto" mini>Email</UiText>
          <UiText size="sm" weight="semibold" align="right" color="gray" class="ml-6">{{ contact.email || 'Chưa cập nhật' }}</UiText>
        </UiFlex>

        <template #footer>
          <UiFlex justify="center" class="mt-4 gap-2" wrap>
            <div class="cursor-pointer" v-for="(value, key) in social" :key="key" @click="open(value)">
              <UiImg 
                class="max-w-[45px] max-h-[45px] rounded-full"
                :src="`/images/social/${key}.png`"
                w="1" h="1"
                imgW="90" imgH="90"
                :alt="key"
              ></UiImg>
            </div>
          </UiFlex>
        </template>
      </UCard>
    </UModal>
  </UiFlex>
</template>

<script setup>
const props = defineProps({
  about: { type: Boolean, default: true },
  privacy: { type: Boolean, default: false },
  terms: { type: Boolean, default: false },
})
const configStore = useConfigStore()
const contact = ref(configStore.config.contact)
const social = ref(configStore.config.social)
const modal = ref(false)

const open = (url) => {
  if(!url) return useNotify().error('Chúng tôi đang cập nhật thông tin, vui lòng quay lại sau')
  window.open(url, '_blank')
}
</script>