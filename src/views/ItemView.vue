<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';

import Button from '../components/Button.vue';

import { getItem } from './api.ts';
import type { Item } from './api.ts';

const route = useRoute();

const loading = ref(false);
const result: Ref<Item | null> = ref(null);
const error = ref(null);

watch(() => route.params.id, fetchData, { immediate: true });

async function fetchData(id: string) {
  error.value = null;
  result.value = null;
  loading.value = true;

  try {
    const item = await getItem(id);
    result.value = item;
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main>
    <div class="mt-8 flex w-full items-center justify-center bg-white">
      <div class="container flex w-full px-4">
        <div v-if="loading">Loading</div>
        <div v-if="error">{{ error }}</div>
        <div class="flex flex-col" v-if="result">
          <img :src="result.image" />
          <div class="mt-1">
            <h1 class="text-3xl font-bold text-gray-900">{{ result.longTitle }}</h1>
            <h2 class="text-lg text-gray-900">{{ result.artist }}</h2>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
