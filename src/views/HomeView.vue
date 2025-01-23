<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue';

import { getItem, getSearch } from './api.ts';
import type { ItemResult } from './api.ts';
import ListItem from '../components/ListItem.vue';

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

    const promises = searchResult.objectIDs.slice(0, 10).map((id) => getItem(id));

    const items = await Promise.all(promises);
    results.value = items;
  } catch (err) {
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main>
    <form>
      <input id="search" v-model="text" />
      <label for="search">Search</label>
      <button type="button" @click="fetchData">Search</button>
    </form>
    <div>
      <div v-if="loading">Loading</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="results && results.length > 0">
        <span>Found: {{ total }}</span>
        <ListItem
          v-for="result in results"
          :key="result.objectID"
          :title="result.title"
          :artist-display-name="result.artistDisplayName"
          :object-begin-date="result.objectBeginDate"
          :object-end-date="result.objectEndDate"
          :primary-image-small="result.primaryImageSmall"
        />
      </div>
    </div>
  </main>
</template>
