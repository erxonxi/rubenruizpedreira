<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div text-left container mx-auto max-w-2xl my-4>
    <p text-2xl font-bold mb-2 underline underline-offset-2>
      {{ t('blog.last_posts') }}
    </p>
    <p text-center font-bold>
      {{ t('not-found') }}
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

