<template>
  <div>
    <h3>Child View (Nested)</h3>
    <h6>Using defineAsyncComponent</h6>
    <button @click="isShowWidget = !isShowWidget">{{ isShowWidget ? 'Hide' : 'Show' }} Ref Widget</button>
    <refWidget v-if="isShowWidget" />

    <button @click="isShowDynamicWidget = !isShowDynamicWidget">{{ isShowDynamicWidget ? 'Hide' : 'Show' }} Dynamic Widget</button>
   <dynamicWidget v-if="isShowDynamicWidget" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted } from 'vue'
import Widget from '../../components/Widget.vue'
import AnotherWidget from '../../components/AnotherWidget.vue'

const isShowWidget = ref(false)
const isShowDynamicWidget = ref(false)

onMounted(() => {
  console.log('Parent is mounted')
})

//Lazy Load a Component Inside Another Component
//Benefits of Lazy Loading
//1 Faster initial load
//2 Smaller bundle size
//3 loads only what the user needs
//const lazyWidget = defineAsyncComponent(() => import('../../components/Widget.vue'))

const refWidget = defineAsyncComponent({
    loader: () => import('../../components/Widget.vue'),
    loadingComponent: { template: '<div>Loading...</div>' },
    errorComponent: { template: '<div>Error loading component.</div>' },
    delay: 200,
    timeout: 10000 //10 sec
})

const dynamicWidget = defineAsyncComponent(() => import(`../../components/ComponentA.vue`))

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


