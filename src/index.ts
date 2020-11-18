import { App } from 'vue'
import DigitWheelGroup from './packages/DigitWheelGroup.vue'
import DigitWheel from './packages/DigitWheel.vue'
import SlideDirective from './SlideDirective'

export const install = (app: App): void => {
  app.component(DigitWheelGroup.name, DigitWheelGroup)
  app.component(DigitWheel.name, DigitWheel)
  app.use(SlideDirective, 'slide')
}

export { DigitWheelGroup, DigitWheel }

export default install
