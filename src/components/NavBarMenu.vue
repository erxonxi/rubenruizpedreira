<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
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
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton title="Menu" text-4xl inline-flex i-carbon-overflow-menu-horizontal />
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems absolute z-10 right-0 mt-1 w-64 origin-top-right divide-y divide-gray-100 rounded-xs bg-white dark:bg-neutral-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none>
        <div id="menu-nav-bar" class="px-1 py-1 text-xl">
          <MenuItem v-slot="{ active }">
            <RouterLink
              to="/blog" class="group flex w-full items-center rounded-sm p-4" :class="[
                active ? 'bg-gray-500 dark:bg-gray-500 text-white' : 'text-gray-800 dark:text-gray-200',
              ]" :title="t('button.blog')"
            >
              {{ t('button.blog') }}
            </RouterLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <RouterLink
              to="/projects" class="group flex w-full items-center rounded-sm p-4" :class="[
                active ? 'bg-gray-500 dark:bg-gray-500 text-white' : 'text-gray-800 dark:text-gray-200',
              ]" :title="t('button.projects')"
            >
              {{ t('button.projects') }}
            </RouterLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <RouterLink
              to="/services" class="group flex w-full items-center rounded-sm p-4" :class="[
                active ? 'bg-gray-500 dark:bg-gray-500 text-white' : 'text-gray-800 dark:text-gray-200',
              ]" :title="t('button.services')"
            >
              {{ t('button.services') }}
            </RouterLink>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <RouterLink
              to="/about" class="group flex w-full items-center rounded-sm p-4" :class="[
                active ? 'bg-gray-500 dark:bg-gray-500 text-white' : 'text-gray-800 dark:text-gray-200',
              ]" :title="t('button.about')"
            >
              {{ t('button.about') }}
            </RouterLink>
          </MenuItem>
          <MenuItem>
            <div my-4 grid grid-cols-3 text-2xl>
              <a class="icon-btn mx-auto cursor-default" :title="t('button.toggle_langs')" @click="toggleLocales()">
                <div i-carbon-language />
              </a>
              <a class="icon-btn mx-auto" rel="noreferrer" href="https://github.com/erxonxi" target="_blank" title="GitHub">
                <div i-carbon-logo-github />
              </a>
              <button class="icon-btn mx-auto cursor-default !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
                <div i="carbon-sun dark:carbon-moon" />
              </button>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
