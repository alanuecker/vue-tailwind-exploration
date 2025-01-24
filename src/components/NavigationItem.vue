<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{ label: string; href: string }>();
</script>

<template>
  <li>
    <RouterLink
      to="href"
      class="text-dark disabled:text-dark-500 inline-flex items-center justify-center rounded-md px-6 py-2
        text-center text-base font-medium hover:bg-gray-300 disabled:bg-gray-200 md:w-full md:justify-start"
    >
      {{ label }}
    </RouterLink>
  </li>
</template>
