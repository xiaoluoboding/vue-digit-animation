<template>
  <div class="main">
    <DigitalGyro :value="digit" :pad-zero="4" />
    <div class="operation">
      <button @click="randomNumber">Random Number</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import DigitalGyro from './components/DigitalGyro.vue'

export default defineComponent({
  name: 'App',
  components: {
    DigitalGyro
  },
  setup() {
    const digit = ref(9527)
    let timer: number

    const randomNumber = () => {
      digit.value = Math.floor(Math.random() * Math.floor(10000))
    }

    // onMounted(() => {
    //   timer = setInterval(() => {
    //     randomNumber()
    //   }, 1333)
    // })

    // onBeforeUnmount(() => {
    //   clearInterval(timer)
    // })

    return {
      digit,
      randomNumber
    }
  }
})
</script>

<style lang="scss">
body {
  background-color: #333;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsla(255, 100%, 100%, .8);
  margin-top: 30vh;
}

.operation {
  margin-top: 10vh;
}
</style>
