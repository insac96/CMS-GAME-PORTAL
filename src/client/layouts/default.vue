<template>
  <div>
    <header class="sticky top-0 bg-white/75 dark:bg-transparent backdrop-blur-xl z-50">
      <LayoutDefaultHeader />
    </header>

    <main>
      <UContainer class="p-2">
        <slot></slot>

      </UContainer>
    </main>

    <!-- <footer>
      <LayoutDefaultFooter />
    </footer> -->
  </div>
</template>

<style lang="sass">
:root
  --layout-default-header-size: 3.5rem
</style>