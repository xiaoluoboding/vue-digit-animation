import { App } from 'vue'
import DigitAnimationGroup from './packages/DigitAnimationGroup.vue'
import DigitWheel from './packages/DigitWheel.vue'
import DigitRuler from './packages/DigitRuler.vue'
import SlideDirective from './SlideDirective'

export const install = (app: App): void => {
  app.component(DigitAnimationGroup.name, DigitAnimationGroup)
  app.component(DigitWheel.name, DigitWheel)
  app.component(DigitRuler.name, DigitRuler)
  app.use(SlideDirective, 'slide')
}

export { DigitAnimationGroup, DigitWheel, DigitRuler }

export default install
