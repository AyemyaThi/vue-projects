<script setup>
const sayHello = () => alert("Hello from Child Component!")
defineExpose({ sayHello })
</script>

<template>
  <p>I am the Child Component</p>
</template>
