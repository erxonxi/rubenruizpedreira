<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div text-left container mx-auto max-w-2xl my-4>
    <h1 text-2xl font-bold mb-2 underline underline-offset-2>
      {{ t('services.title') }}
    </h1>

    <p w-full text-center my-4>
      {{ t('services.description') }}
    </p>

    <div text-center my-4 pt-6 grid gap-4>
      <a
        class="py-2 px-3 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-700 rounded-lg"
        href="mailto:rubenruizpedreira@email.com"
        target="_blank"
      >
        {{ t('button.contact') }}
      </a>
      <a
        class="py-2 px-3 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-700 rounded-lg"
        href="https://www.linkedin.com/in/rub%C3%A9n-ruiz-pedreira/"
        target="_blank"
      >
        Linkedin
      </a>
    </div>
  </div>
</template>
