import { defineStore } from 'pinia';

import type { Item } from '../views/api.ts';

export const useSearchStore = defineStore('search', {
  state: () => ({
    total: 0,
    term: 'Sunflowers',
    items: [] as Item[],
  }),
});
