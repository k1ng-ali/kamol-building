<script setup lang="ts">
import Header from './components/Header.vue'

</script>

<template>
  <Header />
  <div class="layout">
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-inline: clamp(16px, 3vw, 32px);
}

.content {
  flex: 1;
}
</style>
