<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

import ListItem from '../components/ListItem.vue';
import Button from '../components/Button.vue';

import { getItem, getSearch } from './api.ts';
import type { ItemResult } from './api.ts';

const loading = ref(false);
const results: Ref<ItemResult[]> = ref([]);
const error = ref(null);
const total = ref(0);
const text = ref('Sunflowers');

async function fetchData() {
  error.value = null;
  results.value = [];
  loading.value = true;

  try {
    // replace `getresults` with your data fetching util / API wrapper
    const searchResult = await getSearch(text.value);
    total.value = searchResult.total;

    const promises = searchResult.objectIDs.slice(0, 25).map((id) => getItem(id));

    const items = await Promise.all(promises);
    results.value = items.filter(({ primaryImageSmall }) => !!primaryImageSmall);
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
      <div class="container flex w-full items-end gap-4 px-4">
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
      <div class="container flex w-full items-end gap-4 px-4">
        <div v-if="loading">Loading</div>
        <div v-if="error">{{ error }}</div>
        <div v-if="results && results.length > 0">
          <span class="text-base text-gray-900">Found: {{ total }}</span>
          <ul class="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ListItem
              v-for="result in results"
              :key="result.objectID"
              :title="result.title"
              :artist-display-name="result.artistDisplayName"
              :object-begin-date="result.objectBeginDate"
              :object-end-date="result.objectEndDate"
              :primary-image-small="result.primaryImageSmall"
            />
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>
