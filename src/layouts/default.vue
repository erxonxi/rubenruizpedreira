<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <main class="text-lg px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <div text-4xl>
      <div i-healthicons-r-negative inline-block />
    </div>

    <p>
      <a rel="noreferrer" href="https://github.com/erxonxi" target="_blank">
        Rubén Ruiz Pedreira
      </a>
    </p>

    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>
    <RouterView />
    <Footer />
  </main>
</template>
