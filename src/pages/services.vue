<template>
  <div text-left container mx-auto max-w-2xl my-4>
    <h1 text-2xl font-bold mb-2 underline underline-offset-2>
      {{ t('services.title') }}
    </h1>

    <div>
      <RadioGroup v-model="selected">
        <RadioGroupLabel class="sr-only">
          Server size
        </RadioGroupLabel>
        <div class="space-y-2">
          <RadioGroupOption
            v-for="plan in plans"
            :key="plan.name"
            v-slot="{ active, checked }"
            as="template"
            :value="plan"
          >
            <div
              class="relative flex cursor-default rounded-lg px-5 py-4 shadow-md focus:outline-none"
              :class="[
                active
                  ? ''
                  : '',
                checked ? 'bg-gray-600 dark:bg-neutral-800 bg-opacity-75 text-neutral-700 dark:text-white' : 'bg-neutral-100 dark:bg-neutral-700',
              ]"
            >
              <div class="flex w-full items-center justify-between">
                <div class="basis-4/6 flex items-center">
                  <div class="text-sm">
                    <RadioGroupLabel
                      as="p"
                      :class="checked ? 'text-white' : 'text-neutral-700 dark:text-gray-200'"
                      class="font-medium"
                    >
                      {{ plan.name }}
                    </RadioGroupLabel>
                    <RadioGroupDescription
                      as="span"
                      :class="checked ? 'text-gray-200 dark:text-gray-300' : 'text-gray-400 dark:text-gray-400'"
                      class="inline"
                    >
                      <span>{{ plan.pages }}</span>
                      <span aria-hidden="true"> &middot; </span>
                      <span>{{ plan.more }}</span>
                    </RadioGroupDescription>
                  </div>
                </div>
                <div class="basis-2/6 text-right">
                  <span class="font-bold " :class="checked ? 'text-white' : ''">{{ plan.price }}</span>
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
      <div w-full text-center my-4 pt-6>
        <a
          class="py-4 px-6 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 hover:dark:bg-neutral-700 rounded-lg"
          :href="`mailto:rubenruizpedreira@email.com?subject=Contract%20${selected.name}%20${selected.price}`"
          target="_blank"
        >
          {{ t('button.contact') }}
        </a>
      </div>
    </div>
  </div>
</template>
