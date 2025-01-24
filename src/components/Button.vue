<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <button
    class="disabled:text-dark-500 inline-flex items-center justify-center rounded-md border border-gray-900
      bg-gray-900 px-6 py-2 text-center text-base font-medium text-white hover:cursor-pointer
      hover:border-gray-700 hover:bg-gray-700 disabled:border-gray-300 disabled:bg-gray-300"
  >
    {{ label }}
  </button>
</template>
