<template>
    <div>
        <input v-model="selected" type="text" placeholder="Enter A or B">
        <component :is="currentComponent" v-if="currentComponent" />
    </div>
</template>
<script setup>
import { ref, shallowRef, watch, defineAsyncComponent } from 'vue'

const selected = ref('')
const currentComponent = shallowRef(null)

const knownComponents = {
    A: () => import('./ComponentA.vue'),
    B: () => import('./ComponentB.vue')
}

watch(selected, async(value) => {
    if(value in knownComponents) {
        currentComponent.value = defineAsyncComponent(knownComponents[value])
    } else {
        currentComponent.value = null
    }
})
</script>