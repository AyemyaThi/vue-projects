<template>
    <div style="border: 1px solid green;">
        <input v-model="name" type="text" placeholder="Enter component name (e.g., HelloWorld, Calculator, ComponentA)">
        <button @click="loadDynamic(name)">Load Component</button>

        <component :is="currentComponent" v-if="currentComponent"/>
    </div>
</template>
<script setup>
import { ref, defineAsyncComponent, shallowRef } from 'vue'

const name = ref('')
const currentComponent = shallowRef(null)

function loadDynamic(name) {
    //currentComponent.value = defineAsyncComponent(() => import(`./${name}.vue`))

    currentComponent.value = defineAsyncComponent({
        loader: () => import(`./${name}.vue`),
        loadingComponent: { template: '<div>Loading...</div>' },
        errorComponent: { template: '<div>Error loading component.</div>' },
        delay: 200,
        timeout: 10000 //10 sec
    })
}

//In Vue 3, shallowRef() is part of the Composition API. It's similar to ref(), but with shallower reactivity, and it’s very useful in performance-sensitive cases — like dynamic component rendering or working with non-reactive objects.
</script>