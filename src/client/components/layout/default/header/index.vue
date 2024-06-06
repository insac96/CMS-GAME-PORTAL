<template>
  <UContainer class="px-2">
    <UiFlex justify="between" class="h-[var(--layout-default-header-size)] max-h-[var(--layout-default-header-size)]">
      <!-- Left -->
      <UiFlex class="mr-1">
        <!-- Logo -->
        <NuxtLink to="/" class="mr-3"><UiLogo header/></NuxtLink>
        <!-- Search -->
        <LayoutDefaultHeaderSearch />
      </UiFlex>

      <!-- Right -->
      <UiFlex>
        <!-- Auth -->
        <Auth />
      </UiFlex>
    </UiFlex>
  </UContainer>
</template>