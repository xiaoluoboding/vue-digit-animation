import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/fonts/index.scss'

import DigitalGyro from '../src/index'

createApp(App)
  .use(DigitalGyro)
  .mount('#app')
