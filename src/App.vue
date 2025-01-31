<script setup>
import {  RouterView } from 'vue-router'
import 'vue-toast-notification/dist/theme-sugar.css';

</script>

<template>
  <main class="md:flex h-screen">
    <div class="h-64 md:h-auto bg-cover bg-center md:w-1/3 bg-hero">
    </div>
    <section class="px-4 xl:px-8 py-8 md:w-2/3 min-h-full overflow-scroll">
      <RouterView />
    </section>
  </main>

</template>
