<script setup lang="ts">
import { ref } from 'vue';

import ListItem from '../components/ListItem.vue';
import Button from '../components/Button.vue';
import { useProxyHealthStore } from '../stores/proxyHealth.ts';
import { useSearchStore } from '../stores/search.ts';

import { getSearch } from './api.ts';

const loading = ref(false);

const proxyHealthStore = useProxyHealthStore();
const searchStore = useSearchStore();

async function fetchData() {
  loading.value = true;

  try {
    const searchResult = await getSearch(searchStore.term, proxyHealthStore.healthy);

    searchStore.total = searchResult.count;
    searchStore.items = searchResult.items;
  } catch (err) {
    console.error(error);
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
            v-model="searchStore.term"
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
        <div v-if="searchStore.items && searchStore.items.length > 0">
          <span class="pl-12 text-base text-gray-900">Found: {{ searchStore.total }}</span>
          <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <ListItem
              v-for="item in searchStore.items"
              :key="item.id"
              :objectNumber="item.objectNumber"
              :title="item.title"
              :artist="item.artist"
              :image="item.image"
            />
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>
