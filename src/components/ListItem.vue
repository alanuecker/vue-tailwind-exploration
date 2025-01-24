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
    <img class="aspect-square" :src="primaryImageSmall" />
    <div>
      <span>{{ title }}</span>
      <span>{{ artistDisplayName }}</span>
      <div>
        <span>{{ objectBeginDate }}</span> - <span>{{ objectEndDate }}</span>
      </div>
    </div>
  </li>
</template>
