<script setup lang="ts">
const { t } = useI18n()
const projects = ref([
  {
    slug: 'fast-eats',
    title: 'FastEats',
    description: 'Software Gestión de pedidos para restaurantes y locales de comida.',
  },
])
</script>

<template>
  <div text-left container mx-auto max-w-2xl my-4>
    <h1 text-2xl font-bold mb-2 underline underline-offset-2>
      {{ t('projects.title') }}
    </h1>

    <div grid md:grid-cols-2 gap-4 my-6>
      <a v-for="project in projects" :key="project.slug" drop-shadow-xl border-4 border-gray-500 p-4 rounded-xl :href="`/projects/${project.slug}`">
        <h2 text-2xl font-bold>{{ project.title }}</h2>
        <p text-sm text-gray-600 dark:text-gray-300>
          {{ project.description }}
        </p>
      </a>
    </div>
  </div>
</template>
