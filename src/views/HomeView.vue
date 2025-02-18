<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

import ListItem from '../components/ListItem.vue';
import Button from '../components/Button.vue';
import { useProxyHealthStore } from '../stores/proxyHealth.ts';

import { getSearch } from './api.ts';
import type { Item } from './api.ts';

const loading = ref(false);
const results: Ref<Item[]> = ref([]);
const error = ref(null);
const total = ref(0);
const text = ref('Sunflowers');

const proxyHealthStore = useProxyHealthStore();

async function fetchData() {
  error.value = null;
  results.value = [];
  loading.value = true;

  try {
    const searchResult = await getSearch(text.value, proxyHealthStore.healthy);
    total.value = searchResult.count;

    results.value = searchResult.items;
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
      <div class="flex w-full items-end gap-4 px-12">
        <div class="flex w-full flex-col">
          <label for="search" class="block text-sm/6 font-semibold text-gray-900">Search</label>
          <input
            id="search"
            name="search"
            v-model="text"
            class="w-full min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1
              -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
          />
        </div>
        <div>
          <Button type="button" :label="'Search'" @click="fetchData" />
        </div>
      </div>
    </div>
    <div class="mt-8 flex w-full items-center justify-center bg-white">
      <div class="flex w-full items-end gap-4">
        <div v-if="loading" class="pl-12 text-base text-gray-900">Loading</div>
        <div v-if="error" class="pl-12 text-base text-gray-900">{{ error }}</div>
        <div v-if="results && results.length > 0">
          <span class="pl-12 text-base text-gray-900">Found: {{ total }}</span>
          <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <ListItem
              v-for="result in results"
              :key="result.id"
              :objectNumber="result.objectNumber"
              :title="result.title"
              :artist="result.artist"
              :image="result.image"
            />
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>
