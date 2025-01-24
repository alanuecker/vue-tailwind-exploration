<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import NavigationItem from './NavigationItem.vue';

const open = ref(false);
const dropdownButtonRef = ref<HTMLButtonElement | null>(null);

const toggleNavbar = () => {
  open.value = !open.value;
};

const navLinkItems = ref([
  { text: 'Home', href: '/' },
  { text: 'About', href: '/about' },
]);

// Custom composition function to handle click outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownButtonRef.value && !dropdownButtonRef.value.contains(event.target as Node)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <header class="flex w-full items-center justify-center bg-white">
    <div class="container">
      <div class="relative flex w-full items-center justify-end px-4 lg:justify-start">
        <button
          @click="toggleNavbar"
          ref="dropdownButtonRef"
          id="navbarToggler"
          class="ring-primary rounded-lg px-3 py-[6px] hover:cursor-pointer hover:bg-gray-300 focus:ring-2 lg:hidden"
        >
          <span class="relative my-[6px] block h-[2px] w-[30px] bg-gray-900"></span>
          <span class="relative my-[6px] block h-[2px] w-[30px] bg-gray-900"></span>
          <span class="relative my-[6px] block h-[2px] w-[30px] bg-gray-900"></span>
        </button>
        <nav
          :class="{ hidden: !open }"
          id="navbarCollapse"
          class="absolute top-full right-4 w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow lg:static
            lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent"
        >
          <ul class="block lg:flex lg:gap-8">
            <NavigationItem
              v-for="(item, index) in navLinkItems"
              :key="index"
              :label="item.text"
              :href="item.href"
            />
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
