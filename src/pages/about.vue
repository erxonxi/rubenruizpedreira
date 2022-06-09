<script setup lang="ts">
import { marked } from 'marked'
const { t } = useI18n()
</script>

<template>
  <div text-left container mx-auto max-w-xl my-4>
    <p text-2xl font-bold mb-2 underline underline-offset-2>
      {{ t('about.title') }}
    </p>

    <div my-4 />

    <div v-html="marked(t('about.desc1'))" />
    <div my-4 />
    <div v-html="marked(t('about.desc2'))" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
