<template>
  <div>
    <h2>About</h2>
    <p>This is a lazily loaded page with a route guard.</p>
    <AsyncWatchComponent />
  </div>
</template>

<script setup>
// This is enough — setup mode gives default export
import AsyncWatchComponent from '../components/AsyncWatchComponent.vue';
</script>
