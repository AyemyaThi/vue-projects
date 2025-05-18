<template>
    <div>
        <button @click="loadComponent('A')">Load A</button>
        <button @click="loadComponent('B')">Load B</button>

        <component :is="currentCompnent" v-if="currentCompnent" />
    </div>
</template>
<script setup>
import { ref, shallowRef } from 'vue'
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

const componentMap = {
    A: ComponentA,
    B: ComponentB,
}

const currentCompnent = shallowRef(null)

function loadComponent(name) {
    currentCompnent.value = componentMap[name]
}

</script>