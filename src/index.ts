import { App } from 'vue'
import DigitalGyro from './packages/DigitalGyro.vue'
import DigitWheel from './packages/DigitWheel.vue'
import SlideDirective from './SlideDirective'

export const install = (app: App): void => {
  app.component(DigitalGyro.name, DigitalGyro)
  app.component(DigitWheel.name, DigitWheel)
  app.use(SlideDirective, 'slide')
}

export { DigitalGyro, DigitWheel }

export default install
