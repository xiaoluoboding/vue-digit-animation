<template>
  <div class="main">
    <DigitalGyro
      animation="slide"
      format="0,0.00"
      useEase="Quit.easeInOut"
      :stagger="true"
      :digit="bitcoin.bpi.USD.rate_float"
      :gutter="8"
      :duration="1000"
    />
    <DigitalGyro
      animation="slide"
      format="HHmmss"
      useEase="Linear"
      :stagger="false"
      :digit="datetime"
      :gutter="8"
      :duration="100"
    />
    <div class="operation">
      <button @click="randomDigit">Random Number</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useAxios } from './utils/useAxios'

const BITCOIN_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'

export default defineComponent({
  name: 'App',
  setup() {
    const digit = ref(9527)
    const datetime = ref(Math.floor(new Date().getTime()))
    const { refetch, data } = useAxios(BITCOIN_URL)
    const bitcoin = ref(data)

    let digitTimer: number
    let dateTimeTimer: number

    const randomDigit = () => {
      // digit.value = Math.floor(Math.random() * Math.floor(1000000))
      digit.value = parseFloat(Math.floor(Math.random() * Math.floor(100000)) + Math.random().toFixed(4))
    }

    const getNowTime = () => {
      datetime.value = Math.floor(new Date().getTime())
    }

    onMounted(() => {
      digitTimer = setInterval(() => {
        refetch()
      }, 20000)
      // getNowTime()
      dateTimeTimer = setInterval(() => {
        getNowTime()
      }, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(digitTimer)
      clearInterval(dateTimeTimer)
    })

    return {
      digit,
      bitcoin,
      datetime,
      randomDigit
    }
  }
})
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

body {
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
  background-size: 100%;
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
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.digital-gyro {
  font-size: 6em;
  // background-image: linear-gradient(90deg, #ff3278, #0ab9e6);
  color: #daf6ff;
  text-shadow: 0 0 12px #0ab9e6, 0 0 12px rgba(10, 175, 230, 0);
  padding: 20px;
}

.operation {
  margin-top: 10vh;
}
</style>
