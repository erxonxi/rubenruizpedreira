<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import { ref } from 'vue'
// const { t } = useI18n()

const categories = ref({
  Recent: [
    {
      id: 1,
      title: 'Does drinking coffee make you smarter?',
      date: '5h ago',
    },
    {
      id: 2,
      title: 'So you\'ve bought coffee... now what?',
      date: '2h ago',
    },
  ],
  Popular: [
    {
      id: 1,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
    },
    {
      id: 2,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
    },
  ],
  Trending: [
    {
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
    },
    {
      id: 2,
      title: 'The worst advice we\'ve ever heard about coffee',
      date: '4d ago',
    },
  ],
})
</script>

<template>
  <div w-full max-w-md px-2 py-16 sm:px-0>
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-neutral-500/20 p-1">
        <Tab
          v-for="category in Object.keys(categories)"
          :key="category"
          v-slot="{ selected }"
          as="template"
        >
          <button
            class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-neutral-300" :class="[
              selected
                ? 'bg-neutral-900 shadow'
                : 'hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ category }}
          </button>
        </Tab>
      </TabList>

      <TabPanels mt-2>
        <TabPanel
          v-for="(posts, idx) in Object.values(categories)"
          :key="idx"
          class="rounded-xl bg-dark p-3"
        >
          <ul text-left>
            <li
              v-for="post in posts"
              :key="post.id"
              class="relative rounded-md p-3 hover:bg-neutral-700"
            >
              <h3 text-sm font-medium leading-5>
                {{ post.title }}
              </h3>

              <ul mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500>
                <li>{{ post.date }}</li>
                <li>&middot;</li>
                <li>Rubén Ruiz Pedreira</li>
              </ul>

              <a
                href="#"
                absolute inset-0 rounded-md ring-blue-400 focus:z-10 focus:outline-none focus:ring-2
              />
            </li>
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
