import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/fonts/index.scss'
import '@/assets/index.css'

import VueDigitWheel from '../src/index'

createApp(App)
  .use(VueDigitWheel)
  .mount('#app')
