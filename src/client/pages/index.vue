<template>
  <div>
    <!-- Banner -->
    <LayoutDefaultBanner class="mb-4" />

    <!--Games-->
    <div class="max-w-5xl mx-auto sm:mb-32 mb-16">
      <ServiceGameList title="Mới Nhất" sub="Tất cả những trò chơi mới cập bến" menu="latest" icon="i-mdi-latest" />
    </div>

    <!--News-->
    <div class="max-w-4xl mx-auto sm:mb-32 mb-16">
      <ServiceNewsList title="Tin Tức" sub="Cập nhật thông tin mới nhất" />
    </div>
  </div>
</template>