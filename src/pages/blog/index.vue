<script setup lang="ts">
const { t } = useI18n()
const lastPosts = ref([
  {
    slug: 'server-deployment-automations-with-ansible',
    title: 'Automatizaciones de despliegue de servidores con Ansible',
  },
  {
    slug: 'your-first-kubernetes',
    title: 'Crear tu primer clúster de Kubernetes con k0s',
  },
  {
    slug: 'first-post',
    title: 'Mi Primer Post',
  },
])
</script>

<template>
  <div text-left container mx-auto max-w-2xl my-4>
    <h1 text-2xl font-bold mb-2 underline underline-offset-2>
      {{ t('blog.last_post') }}
    </h1>

    <div grid gap-4 my-6>
      <RouterLink text-xl md:text-4xl drop-shadow-xl border-4 border-gray-500 p-4 md:p-8 rounded-xl :to="`/blog/${lastPosts[0].slug}`">
        <h2>{{ lastPosts[0].title }}</h2>
      </RouterLink>
    </div>

    <h1 text-2xl font-bold mb-2 underline underline-offset-2>
      {{ t('blog.other_posts') }}
    </h1>

    <div grid gap-4 my-6>
      <RouterLink v-for="post in lastPosts" v-show="post.slug !== lastPosts[0].slug" :key="post.slug" drop-shadow-xl border-4 border-gray-500 p-4 rounded-xl :to="`/blog/${post.slug}`">
        <h2>{{ post.title }}</h2>
      </RouterLink>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

