<script setup lang="ts">
// https://github.com/vueuse/head
useHead({
  title: 'Rubén Ruiz Pedreira',
  meta: [
    { name: 'description', content: 'Web of Rubén Ruiz Pedreira' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
