<template>
  <div class="main">
    <DigitalGyro
      animation="slide"
      format="HHmmss"
      useEase="Linear"
      :stagger="false"
      :digit="digit"
      :gutter="8"
      :duration="666"
    />
    <div class="operation">
      <button @click="randomNumber">Random Number</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const digit = ref(9527)
    let timer: number

    const randomNumber = () => {
      // digit.value = Math.floor(Math.random() * Math.floor(1000000))
      // digit.value = parseFloat(Math.floor(Math.random() * Math.floor(10000000)) + Math.random().toFixed(4))
      digit.value = Math.floor(new Date().getTime())
    }

    // onMounted(() => {
    //   timer = setInterval(() => {
    //     randomNumber()
    //   }, 1000)
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
  background-color: #313131;
  font-size: 16px;
}

#app {
  // font-family: Helvetica, Arial, sans-serif;
  // font-family: DS-DIGI, PT-DIN-CC, Helvetica, Arial, sans-serif;
  font-family: PT-DIN-CC, DS-DIGI, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsla(255, 100%, 100%, .8);
  margin-top: 30vh;
}

.digital-gyro {
  font-size: 6em;
  background-image: linear-gradient(90deg, #ff3278, #0ab9e6);
  padding: 20px;
}

.operation {
  margin-top: 10vh;
}
</style>
