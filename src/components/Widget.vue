<template>
    <div>
        <h2>I am a lazily loaded widget!</h2>
        <h1>All Vue Ref Types</h1>

        <section>
      <h2>ref()</h2>
      <p>count: {{ count }}</p>
      <button @click="count++">Increment</button>
    </section>

    <section>
      <h2>shallowRef() + triggerRef()</h2>
      <p>shallowObj.count: {{ shallowObj.count }}</p>
      <button @click="shallowObj.count++">Increment (won't react)</button>
      <button @click="replaceShallow()">Replace Object</button>
      <button @click="forceTrigger()">Force triggerRef()</button>
    </section>

    <section>
      <h2>customRef()</h2>
      <input v-model="debouncedInput" placeholder="Type with debounce" />
      <p>debounced value: {{ debouncedInput }}</p>
    </section>

    <section>
      <h2>toRef() & toRefs()</h2>
      <input v-model="name" />
      <p>Name from toRef: {{ name }}</p>
      <p>Age from toRefs: {{ age }}</p>
    </section>

    <section>
      <h2>template ref (DOM)</h2>
      <input ref="inputEl" placeholder="Will be focused" />
    </section>

    <section>
      <h2>template ref (Component via defineExpose)</h2>
      <Child ref="childRef" />
      <button @click="callChildMethod">Call Child Method</button>
    </section>
  </div>
</template>

<script setup>
import { ref, shallowRef, triggerRef, customRef, reactive, toRef, toRefs, onMounted } from 'vue'
import Child from './Child.vue'
//Purpose:
//Create a reactive primitive value (number, string, boolean, etc.), or wrap objects/arrays with deep reactivity
//Triggers re-renders when .value changes.
const count = ref(0)

//Purpose:
//Create a ref with shallow reactivity — only .value is reactive, not its nested properties.
//Best for performance-sensitive tasks, dynamic components, or external libraries.
const shallowRefObj = shallowRef({ count: 0 })
const shallowObj = shallowRefObj.value
function replaceShallow() {
  shallowRefObj.value = { count: shallowRefObj.value.count + 1 }
}

//Purpose:
//Manually force update on a shallowRef() when its internal state changes and you don't replace the object.
function forceTrigger() {
  triggerRef(shallowRefObj)
}

//Purpose:
//Create a custom reactive ref with controlled get/set behavior, such as debouncing input.
//Useful for building custom reactivity rules like throttling, validation, etc.
function useDebouncedRef(value, delay = 300) {
  let timeout
  return customRef((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(newVal) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        value = newVal
        trigger()
      }, delay)
    }
  }))
}
const debouncedInput = useDebouncedRef('', 500)

//Purpose:
//Convert a reactive object's property into a ref so it can be destructured without losing reactivity.
//Keeps reactivity even after object destructuring.
const state = reactive({ name: 'Thida', age: 37 })
const name = toRef(state, 'name')
const { age } = toRefs(state)


//Purpose:
//Access DOM elements or component instances via ref="name" in template.
//For direct DOM manipulation or accessing methods from child components.
const inputEl = ref(null)
onMounted(() => {
  inputEl.value.focus()
})

const childRef = ref(null)
function callChildMethod() {
  childRef.value.sayHello()
}

// ref() – reactive primitive

// shallowRef() – shallow object reactivity

// customRef() – debounced input example

// toRef() – reactive destructuring

// Template ref – DOM focus on mount

// | Ref Type       | Purpose                               | Reactive Level    |
// | -------------- | ------------------------------------- | ----------------- |
// | `ref()`        | Basic reactive data                   | Deep              |
// | `shallowRef()` | Reactive only on `.value` replacement | Shallow           |
// | `triggerRef()` | Manually notify on shallow change     | Manual trigger    |
// | `customRef()`  | Create custom get/set logic           | Custom            |
// | `toRef()`      | Create ref from reactive property     | Depends on source |
// | `toRefs()`     | Convert all properties to refs        | Depends on source |
// | Template `ref` | Access DOM or component via template  | DOM/Instance      |

</script>

<style scoped>
  section {
    margin-bottom: 20px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
</style>
