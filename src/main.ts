import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/fonts/index.scss'

import DigitalGyro from '@/components/index'

createApp(App).use(DigitalGyro).mount('#app')
