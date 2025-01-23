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
  <div>
    <img :src="primaryImageSmall" />
    <div>
      <span>{{ title }}</span>
      <span>{{ artistDisplayName }}</span>
      <div>
        <span>{{ objectBeginDate }}</span> - <span>{{ objectEndDate }}</span>
      </div>
    </div>
  </div>
</template>
