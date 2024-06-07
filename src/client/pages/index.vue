<template>
  <div>
    <!-- Banner -->
    <DataBanner class="mb-4" />

    <!--Games-->
    <div class="max-w-4xl mx-auto sm:mb-32 mb-16">
      <ServiceGameList title="Trò Chơi" sub="Các trò chơi trên hệ thống" menu="latest" class="mb-4" />

      <UiFlex justify="center">
        <UButton variant="link" to="/game" label="Xem tất cả">
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4" />
          </template>
        </UButton>
      </UiFlex>
    </div>

    <!--News-->
    <div class="max-w-4xl mx-auto sm:mb-32 mb-16">
      <ServiceNewsList title="Tin Tức" sub="Cập nhật thông tin mới nhất" />
      
      <UiFlex justify="center">
        <UButton variant="link" to="/news" label="Xem tất cả">
          <template #trailing>
            <UIcon name="i-heroicons-arrow-right-20-solid" class="w-4 h-4" />
          </template>
        </UButton>
      </UiFlex>
    </div>
  </div>
</template>