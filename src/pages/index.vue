<script setup lang="ts">
import { TransitionRoot } from '@headlessui/vue'
const isShowing = ref(false)

watchEffect(() => {
  setTimeout(() => {
    isShowing.value = true
  }, 50)
})

const { t } = useI18n()
const works = ref([1, 2, 3])
</script>

<template>
  <div>
    <TransitionRoot
      :show="isShowing"
      enter="transition-all duration-1000"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-150"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <p text-4xl my-8>
        <a rel="noreferrer" href="https://github.com/erxonxi" target="_blank">
          Rubén Ruiz Pedreira
          <em text-sm opacity-75 block>{{ t('intro.desc') }}</em>
        </a>
      </p>
    </TransitionRoot>

    <TransitionRoot
      :show="isShowing"
      enter="transition-all duration-1400"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-150"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div text-left container mx-auto max-w-xl my-4>
        <h3 text-2xl font-bold mb-2 underline underline-offset-2>
          {{ t('intro.title_work') }}
        </h3>

        <p ml-4>
          {{ t('intro.desc_work') }}
        </p>
      </div>
    </TransitionRoot>

    <TransitionRoot
      :show="isShowing"
      enter="transition-all duration-1600"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-150"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
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
    </TransitionRoot>

    <TransitionRoot
      :show="isShowing"
      enter="transition-all duration-1800"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-150"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div text-left container mx-auto max-w-xl my-4>
        <h3 text-2xl font-bold mb-2 underline underline-offset-2>
          {{ t('intro.title_passions') }}
        </h3>

        <p ml-4>
          {{ t('intro.desc_passions') }}
        </p>
      </div>
    </TransitionRoot>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
