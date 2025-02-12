<script setup lang="ts">
import { ref, onMounted, onUnmounted, useTemplateRef } from 'vue';

defineProps<{
  objectNumber: string;
  title: string;
  artist: string;
  image: string;
}>();

const itemLink = useTemplateRef('item-link');
const inView = ref(false);

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      inView.value = entry.isIntersecting;
    });
  },
  {
    // root: document.querySelector('#scrollable-list'),
    threshold: 1.0,
  },
);

onMounted(() => {
  if (itemLink.value) {
    observer.observe(itemLink.value);
  }
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<!-- todo: trigger animation if element is scrolled into view -->
<template>
  <RouterLink
    :class="{ 'border-b-red-900': inView }"
    class="border-b p-12 sm:nth-[-n+2]:border-t sm:nth-[2n+1]:border-r lg:nth-[-n+4]:border-t
      lg:[&:not(:nth-child(4n+4))]:border-r"
    :to="'items/' + objectNumber"
  >
    <li ref="item-link" class="flex h-full flex-col justify-end">
      <div class="flex h-full flex-col justify-center">
        <img :src="image" />
      </div>
      <div class="mt-6">
        <span class="text-lg font-medium text-gray-900">{{ title }}</span>
        <div class="text-base text-gray-900">{{ artist }}</div>
      </div>
    </li>
  </RouterLink>
</template>
