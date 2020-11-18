<template>
  <div class="main">
    <DigitWheel
      size="10vw"
      use-ease="Quit.easeInOut"
      :digit="digit"
      :duration="1000"
    />
    <digit-wheel-group
      size="6em"
      format="0,0"
      use-ease="Quit.easeInOut"
      :stagger="true"
      :digits="digits"
      :gutter="16"
      :duration="1000"
    />
    <DigitWheelGroup
      format="$0,0.00"
      size="120px"
      use-ease="Quit.easeInOut"
      :stagger="true"
      :digits="bitcoin.bpi.USD.rate_float"
      :gutter="8"
      :duration="666"
    />
    <DigitWheelGroup
      format="HHmmss"
      size="6xl"
      use-ease="Linear"
      :stagger="false"
      :digits="datetime"
      :gutter="8"
      :duration="100"
    />
    <!-- <div class="operation">
      <button @click="randomDigit">Random Number</button>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import DigitWheelGroup from '../src/packages/DigitWheelGroup.vue'
import { useAxios } from './utils/useAxios'

const BITCOIN_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'

export default defineComponent({
  components: { DigitWheelGroup },
  name: 'App',
  setup () {
    const digit = ref(0)
    const digits = ref(9527)
    const datetime = ref(Math.floor(new Date().getTime()))
    const { refetch, data } = useAxios(BITCOIN_URL)
    const bitcoin = ref(data)

    let digitTimer: number
    let digitsTimer: number
    let bitcoinTimer: number
    let dateTimeTimer: number

    const randomDigit = () => {
      digit.value = Math.floor(Math.random() * Math.floor(9))
    }

    const randomDigits = () => {
      digits.value = Math.floor(Math.random() * Math.floor(1000000))
      // digits.value = parseFloat(Math.floor(Math.random() * Math.floor(100000)) + Math.random().toFixed(4))
    }

    const getNowTime = () => {
      datetime.value = Math.floor(new Date().getTime())
    }

    onMounted(() => {
      digitTimer = setInterval(() => {
        randomDigit()
      }, 3333)
      digitsTimer = setInterval(() => {
        randomDigits()
      }, 5000)
      bitcoinTimer = setInterval(() => {
        refetch()
      }, 20000)
      dateTimeTimer = setInterval(() => {
        getNowTime()
      }, 1000)
    })

    onBeforeUnmount(() => {
      clearInterval(digitTimer)
      clearInterval(digitsTimer)
      clearInterval(bitcoinTimer)
      clearInterval(dateTimeTimer)
    })

    return {
      digit,
      digits,
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
  background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 100%);
  background-size: 100%;
  font-size: 16px;
  color: #daf6ff;
  text-shadow: 0 0 8px #0ab9e6, 0 0 8px rgba(10, 175, 230, 0);
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

.operation {
  margin-top: 10vh;
}
</style>
