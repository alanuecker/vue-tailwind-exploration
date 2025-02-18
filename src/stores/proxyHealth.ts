import { defineStore } from 'pinia';
import { checkProxyHealth } from '../views/api';

export const useProxyHealthStore = defineStore('proxyHealth', {
  state: () => ({
    healthy: false,
  }),
  actions: {
    async checkHealth() {
      const response = await checkProxyHealth();
      this.healthy = response;
    },
  },
});
