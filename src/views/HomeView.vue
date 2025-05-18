<template>
  <div>
    <h2>Home</h2>
    <p>Welcome to the Home page.</p>
    <DynamicHost />
    <AsyncComponent />
  </div>
</template>

<script setup>
import DynamicHost from '../components/DynamicHost.vue';
import AsyncComponent from '../components/AsyncComponent.vue';
</script>