<template>
  <div class="digit-animation-demo">
    <header class="text-gray-700 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl">Vue Digit Animation</span>
        </a>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a class="mr-5 hover:text-gray-900">Demos</a>
          <a class="mr-5 hover:text-gray-900">Document</a>
        </nav>
        <button class="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">
          GitHub
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
    <main class="main">
      <section class="text-gray-700 body-font">
        <div class="container mx-auto flex px-5 pt-40 pb-24 items-center justify-center flex-col">
          <div class="text-center lg:w-2/3 w-full">
            <h1 class="title-font sm:text-4xl text-5xl mb-4 font-medium text-gray-900">
              Vue Digit Animation
            </h1>
            <p class="mb-8 leading-relaxed">A digit animation component with wheel/slide effect for Vue 3.</p>
            <div class="flex justify-center">
              <button class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Preview</button>
              <button class="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Document</button>
            </div>
          </div>
        </div>
      </section>
      <section class="text-gray-700 body-font">
        <div class="container mx-auto px-5 py-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <figure class="w-full">
            <div class="p-4 w-full shadow-md rounded-md border text-center">
              <div class="mt-8">
                <h1 class="text-3xl mb-4 text-gray-800 font-semibold">BitCoin Price</h1>
                <span class="text-gray-400">$0,0.00</span>
              </div>
              <div class="py-8">
                <digit-animation-group
                  format="$0,0.00"
                  size="6xl"
                  use-ease="Quit.easeInOut"
                  :stagger="true"
                  :digits="bitcoin.bpi.USD.rate_float"
                  :duration="666"
                />
              </div>
            </div>
          </figure>
          <figure class="w-full">
            <div class="p-4 w-full shadow-md rounded-md border text-center">
              <div class="mt-8">
                <h1 class="text-3xl mb-4 text-gray-800 font-semibold">Realtime</h1>
                <span class="text-gray-400">HH:mm:ss</span>
              </div>
              <div class="py-8">
                <digit-animation-group
                  format="HHmmss"
                  size="6xl"
                  animation="slide"
                  use-ease="Linear"
                  :stagger="false"
                  :digits="datetime"
                  :duration="100"
                />
              </div>
            </div>
          </figure>
          <figure class="w-full">
            <div class="p-4 w-full shadow-md rounded-md border text-center">
              <div class="mt-8">
                <h1 class="text-3xl mb-4 text-gray-800 font-semibold">Random Number</h1>
                <span class="text-gray-400">0,0</span>
              </div>
              <div class="py-8">
                <digit-animation-group
                  size="6xl"
                  format="0,0"
                  type="slide"
                  use-ease="Quit.easeInOut"
                  :stagger="true"
                  :digits="digits"
                  :duration="1000"
                />
              </div>
            </div>
          </figure>
        </div>
      </section>
    </main>
    <footer class="text-gray-700 body-font">
      <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl">Vue Digit Animation</span>
        </a>
        <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2020 Vue Digit Animation —
          <a href="https://twitter.com/knyttneve" class="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@xiaoluoboding</a>
        </p>
        <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a class="text-gray-500">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a class="ml-3 text-gray-500">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a class="ml-3 text-gray-500">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a class="ml-3 text-gray-500">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
              <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { useAxios } from './utils/useAxios'

const BITCOIN_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'

export default defineComponent({
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
  // background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 100%);
  // background-size: 100%;
  // font-size: 16px;
  // color: #daf6ff;
  // text-shadow: 0 0 8px #0ab9e6, 0 0 8px rgba(10, 175, 230, 0);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  // font-family: DS-DIGI, PT-DIN-CC, Helvetica, Arial, sans-serif;
  // font-family: PT-DIN-CC, DS-DIGI, Helvetica, Arial, sans-serif;
  // text-align: center;
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(-50%, -50%);
}

.operation {
  margin-top: 10vh;
}
</style>
