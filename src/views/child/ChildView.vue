<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue'
import Widget from '../../components/Widget.vue'
import AnotherWidget from '../../components/AnotherWidget.vue'

const show = ref(false)

onMounted(() => {
  console.log('Parent is mounted')
  //show.value = true
})

//const lazyWidget = defineAsyncComponent(() => import('../../components/Widget.vue'))

const dynamicWidget = defineAsyncComponent({
    loader: () => import('../../components/Widget.vue'),
    loadingComponent: { template: '<div>Loading...</div>' },
    errorComponent: { template: '<div>Error loading component.</div>' },
    delay: 200,
    timeout: 10000 //10 sec
})

// const dynamicWidget = defineAsyncComponent(() => {
//   return new Promise((resolve, reject) => {
//     if(show.value) {
//       resolve(Widget);
//     } else {
//       resolve(AnotherWidget);
//     }
//   })
// })

</script>

<template>
  <div>
    <h3>Child View (Nested)</h3>
    <h6>Using defineAsyncComponent</h6>
    <button @click="show = !show">{{ show ? 'Hide' : 'Show' }} Widget</button>
    
    <dynamicWidget v-if="show" />
    <!-- <LazyWidget v-if="show" /> -->
  </div>
</template>
