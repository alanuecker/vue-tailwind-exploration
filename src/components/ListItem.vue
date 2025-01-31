<script setup lang="ts">
defineProps<{
  title: string;
  artistDisplayName: string;
  objectBeginDate: number;
  objectEndDate: number;
  primaryImageSmall: string;
}>();
</script>

<template>
  <li>
    <img :src="primaryImageSmall" />
    <div class="mt-1">
      <span class="text-lg font-medium text-gray-900">{{ title }}</span>
      <div class="text-base text-gray-900">{{ artistDisplayName }}</div>
      <div>
        <span class="text-base text-gray-700">{{ objectBeginDate }}</span>
        <span class="text-base text-gray-700"> - </span>
        <span class="text-base text-gray-700">{{ objectEndDate }}</span>
      </div>
    </div>
  </li>
</template>
