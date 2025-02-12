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
      const fromTop = entry.intersectionRect.top;
      const fromBottom = entry.rootBounds?.height || 0 - entry.intersectionRect.bottom;

      if (
        // animate during scrolling
        ((fromTop > fromBottom && entry.isIntersecting) ||
          // animate for all elements in view during mount
          (fromTop && entry.isIntersecting)) &&
        // check to prevent value reset after element leaves view
        !inView.value
      ) {
        inView.value = entry.isIntersecting;
      }
    });
  },
  {
    threshold: 1,
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

<template>
  <RouterLink
    :class="{ 'after:w-full': inView }"
    class="after:transition-width after:block after:h-0.25 after:w-0 after:bg-black after:duration-400
      after:content-[''] sm:nth-[-n+2]:border-t sm:nth-[2n+1]:border-r lg:nth-[-n+4]:border-t
      lg:[&:not(:nth-child(4n+4))]:border-r"
    :to="'items/' + objectNumber"
  >
    <li ref="item-link" class="flex h-full flex-col justify-end p-12">
      <div class="flex h-full flex-col justify-center">
        <img class="aspect-square object-contain" :src="image" />
      </div>
      <div class="mt-6">
        <span class="text-lg font-medium text-gray-900">{{ title }}</span>
        <div class="text-base text-gray-900">{{ artist }}</div>
      </div>
    </li>
  </RouterLink>
</template>
