<script setup lang="ts">
defineProps<{
  objectNumber: string;
  longTitle: string;
  artist: string;
  image: string;
}>();
</script>

<template>
  <RouterLink :to="'items/' + objectNumber">
    <li>
      <img :src="image" />
      <div class="mt-1">
        <span class="text-lg font-medium text-gray-900">{{ longTitle }}</span>
        <div class="text-base text-gray-900">{{ artist }}</div>
      </div>
    </li>
  </RouterLink>
</template>
