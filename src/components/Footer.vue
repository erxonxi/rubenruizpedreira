<script setup lang="ts">
const { t, locale } = useI18n()

const toggleLocales = () => {
  switch (locale.value) {
    case 'es':
      locale.value = 'en'
      break
    case 'en':
      locale.value = 'es'
      break
  }
}
</script>

<template>
  <nav text-xl mt-6>
    <RouterLink class="icon-btn mx-2" to="/" :title="t('button.home')">
      <div i-carbon-campsite />
    </RouterLink>

    <RouterLink class="icon-btn mx-2" to="/blog" :title="t('button.blog')">
      <div i-carbon-blog />
    </RouterLink>

    <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div i-carbon-language />
    </a>

    <RouterLink class="icon-btn mx-2" to="/about" :title="t('button.about')">
      <div i-carbon-dicom-overlay />
    </RouterLink>

    <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/erxonxi" target="_blank" title="GitHub">
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
