<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
const { t } = useI18n()

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
  // eslint-disable-next-line no-alert
  alert('¿🇪🇸 is this a flag?')
}
function openModal() {
  isOpen.value = true
}
</script>

<template>
  <div class="inset-0 flex items-center justify-center">
    <button
      type="button"
      class="rounded-md bg-neutral-400 bg-opacity-20 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      @click="openModal"
    >
      {{ t('newslatter.title') }}
    </button>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center text-gray-900 dark:text-gray-300"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6"
              >
                {{ t('newslatter.title') }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm">
                  {{ t('newslatter.desc') }}
                </p>
              </div>

              <div class="mt-4 flex flex-row gap-4">
                <input id="email" type="email" placeholder="thor@gmail.com" bg-gray-100 dark:bg-neutral-600 w-full rounded-md text-sm md:text-lg border-gray-300 px-2 py-1>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-gray-200 dark:bg-neutral-700 px-4 py-2 text-sm font-medium text-gray-900 dark:text-neutral-200 hover:bg-gray-200 dark:hover:bg-neutral-600  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  {{ t('button.subscribe') }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
