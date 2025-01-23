<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getItem, getSearch } from './api.ts';

const loading = ref(false);
const results = ref(null);
const error = ref(null);
const total = ref(0);

const route = useRoute();

// watch the params of the route to fetch the data again
watch(() => route.params.id, fetchData, { immediate: true });

async function fetchData(id) {
  error.value = results.value = null;
  loading.value = true;

  try {
    // replace `getresults` with your data fetching util / API wrapper
    const searchResult = await getSearch('sunflower');
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
    <div>
      <div v-if="loading">Loading</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="results">{{ results }}</div>
    </div>
  </main>
</template>
