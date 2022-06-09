<script setup lang="ts">
const { t } = useI18n()
const lastPosts = ref([
  {
    slug: 'first-post',
    title: 'Mi Primer Post',
  },
])
</script>

<template>
  <div text-left container mx-auto max-w-2xl my-4>
    <h1 text-2xl font-bold mb-2 underline underline-offset-2>
      {{ t('blog.last_posts') }}
    </h1>

    <div grid gap-4 my-6>
      <a v-for="post in lastPosts" :key="post.slug" drop-shadow-xl border-4 border-gray-500 p-4 rounded-xl :href="`/blog/${post.slug}`">
        <h2>{{ post.title }}</h2>
      </a>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

