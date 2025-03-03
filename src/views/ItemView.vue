<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';

import Button from '../components/Button.vue';
import { useProxyHealthStore } from '../stores/proxyHealth';

import { getItem } from './api.ts';
import type { Item } from './api.ts';

const route = useRoute();

const loading = ref(false);
const result: Ref<Item | null> = ref(null);
const error = ref(null);

const proxyHealthStore = useProxyHealthStore();

watch(() => route.params.id, fetchData, { immediate: true });

async function fetchData(id: string) {
  error.value = null;
  result.value = null;
  loading.value = true;

  try {
    const item = await getItem(id, proxyHealthStore.healthy);
    result.value = item;
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex w-full justify-center">
    <div class="sticky top-0 container flex max-h-screen w-full justify-center border-t p-12">
      <div v-if="loading">Loading</div>
      <div v-if="error">{{ error }}</div>
      <div
        class="grid h-full max-h-full grid-cols-1 grid-rows-[1fr_min-content] gap-4"
        v-if="result"
      >
        <img class="h-full min-h-px w-full min-w-px object-contain" :src="result.image" />
        <div class="flex flex-col gap-2">
          <h1 class="text-3xl font-bold text-gray-900">{{ result.longTitle }}</h1>
          <h2 class="text-lg text-gray-900">{{ result.artist }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
