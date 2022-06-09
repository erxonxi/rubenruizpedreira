<script setup lang="ts">
const { t } = useI18n()
const works = ref([1, 2, 3])
</script>

<template>
  <div>
    <div text-4xl>
      <div i-healthicons-r-negative inline-block />
    </div>

    <p>
      <a rel="noreferrer" href="https://github.com/erxonxi" target="_blank">
        Rubén Ruiz Pedreira
        <em text-sm opacity-75 block>{{ t('intro.desc') }}</em>
      </a>
    </p>

    <div text-left container mx-auto max-w-xl my-4>
      <h3 text-2xl font-bold mb-2 underline underline-offset-2>
        {{ t('intro.title_work') }}
      </h3>

      <p ml-4>
        {{ t('intro.desc_work') }}
      </p>
    </div>

    <div text-left container mx-auto max-w-xl my-4>
      <h3 text-2xl font-bold mb-2 underline underline-offset-2>
        {{ t('intro.title_bio') }}
      </h3>

      <p v-for="(i) in works" :key="i" class="mb-2 ml-4">
        <span text-lg font-bold mb-2 inline>
          {{ t(`intro.work${i}.dates`) }}
        </span>
        {{ t(`intro.work${i}.job`) }}
      </p>
    </div>

    <div text-left container mx-auto max-w-xl my-4>
      <h3 text-2xl font-bold mb-2 underline underline-offset-2>
        {{ t('intro.title_passions') }}
      </h3>

      <p ml-4>
        {{ t('intro.desc_passions') }}
      </p>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
