<template>
    <div class="calculator">
        <input type="text" v-model="display" readonly />

        <div class="buttons">
            <button v-for="btn in buttons" :key="btn" @click="handleClick(btn)">
                {{ btn }}
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const display = ref('');
const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
];

function handleClick(btn) {
    if(btn === 'C') {
        display.value = '';
    } else if (btn === '=') {
        try {
            display.value = eval(display.value).toString();
        } catch {
            display.value = 'Error';
        }
    } else {
        display.value += btn;
    }
}
</script>
<style scoped>
.calculator {
    max-width: 300px;
    margin: 50px auto;
    text-align: center;
}
/* .buttons {
    max-width: 200px;
    margin: 50px auto;
    text-align: center;
} */
.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}
button {
    font-size: 1.5rem;
    padding: 15px;
}
input {
    width: 100%;
    font-size: 2rem;
    text-align: right;
    padding: 10px;
    margin-bottom: 10px;
}
</style>