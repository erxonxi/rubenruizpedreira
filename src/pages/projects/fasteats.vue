<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div text-left container mx-auto max-w-2xl my-4>
    <h1 text-2xl font-bold mb-2 underline underline-offset-2>
      FastEats
    </h1>

    <p>
      {{ t('projects.list.fasteats.desc') }}
    </p>

    <ul list-disc pl-12 mt-4>
      <li>
        <a href="https://dp-public-dev.rubenruizpedreira.es/">
          <strong>FastEats Public</strong>
        </a>
      </li>
      <li>
        <a href="https://dp-dev.rubenruizpedreira.es/">
          <strong>FastEats Admin</strong>
        </a>
      </li>
    </ul>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

