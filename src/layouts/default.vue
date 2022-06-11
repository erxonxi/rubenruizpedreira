<script setup lang="ts">
const { t, locale } = useI18n()

const localeSaved = window.localStorage.getItem('lenguage')
if (localeSaved)
  locale.value = localeSaved

const toggleLocales = () => {
  switch (locale.value) {
    case 'es':
      locale.value = 'en'
      window.localStorage.setItem('lenguage', 'en')
      break
    case 'en':
      locale.value = 'es'
      window.localStorage.setItem('lenguage', 'es')
      break
  }
}
</script>

<template>
  <nav flex flex-row text-gray-700 dark:text-gray-200 max-w-7xl mx-auto px-4 sm:px-6 py-4>
    <RouterLink class="basis-1/4 text-4xl icon-btn mx-2" to="/" :title="t('button.home')">
      <div i-healthicons-r-negative inline-block text-black dark:text-white />
    </RouterLink>

    <div class="hidden md:inline basis-2/4 text-lg mt-2">
      <div flex flex-row gap-4>
        <a href="/blog" :title="t('button.blog')">{{ t('button.blog') }}</a>
        <a href="/projects" :title="t('button.projects')">{{ t('button.projects') }}</a>
        <a href="/services" :title="t('button.services')">{{ t('button.services') }}</a>
        <a href="/about" :title="t('button.about')">{{ t('button.about') }}</a>
      </div>
    </div>
    <div class="hidden md:inline basis-2/4 text-right text-lg mt-2">
      <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <div i-carbon-language />
      </a>
      <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/erxonxi" target="_blank" title="GitHub">
        <div i-carbon-logo-github />
      </a>
      <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>
    </div>
    <div class="inline md:hidden basis-3/4 text-right">
      <NavBarMenu />
    </div>
  </nav>

  <main class="text-lg px-4 text-center text-gray-700 dark:text-gray-200">
    <RouterView />
    <Footer />
  </main>
</template>
