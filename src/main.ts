import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useProxyHealthStore } from './stores/proxyHealth';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');

const proxyHealthStore = useProxyHealthStore();
proxyHealthStore.checkHealth();
