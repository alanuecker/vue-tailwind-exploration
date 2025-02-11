<script setup lang="ts">
defineProps<{
  objectNumber: string;
  title: string;
  artist: string;
  image: string;
}>();
</script>

<template>
  <RouterLink class="p-12" :to="'items/' + objectNumber">
    <li class="flex h-full flex-col justify-end">
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
