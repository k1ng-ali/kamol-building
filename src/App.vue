<script setup lang="ts">
import Header from './components/Header.vue'
import { useReveal } from "@/app/useReveal.ts";

</script>

<template>
  <Header />
  <div class="layout">
    <main class="content">
      <router-view />
    </main>
  </div>
</template>
