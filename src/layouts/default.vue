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
  <nav flex flex-row text-gray-700 dark:text-gray-200 max-w-7xl mx-auto px-4 sm:px-6 py-4>
    <RouterLink class="basis-1/4 text-4xl icon-btn mx-2" to="/" :title="t('button.home')">
      <div i-healthicons-r-negative inline-block text-black dark:text-white />
    </RouterLink>

    <div class="basis-2/4 text-lg mt-2">
      <div flex flex-row gap-4>
        <a href="/blog">{{ t('button.blog') }}</a>
        <a href="/about">{{ t('button.about') }}</a>
        <a rel="noreferrer" href="https://github.com/erxonxi" target="_blank">
          GitHub
        </a>
      </div>
    </div>
    <div class="basis-2/4 text-right text-lg mt-2">
      <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <div i-carbon-language />
      </a>
      <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>
    </div>
  </nav>

  <main class="text-lg px-4 text-center text-gray-700 dark:text-gray-200">
    <RouterView />
    <Footer />
  </main>
</template>
