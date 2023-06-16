<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar/>
  <RouterView />
</template>

<style scoped>
*{
  overflow: hidden; /* Hide scrollbars */
}
</style>
