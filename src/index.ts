import { App } from 'vue'
import DigitAnimationGroup from './packages/DigitAnimationGroup.vue'
import DigitWheel from './packages/DigitWheel.vue'

export const install = (app: App): void => {
  app.component(DigitAnimationGroup.name, DigitAnimationGroup)
  app.component(DigitWheel.name, DigitWheel)
}

export { DigitAnimationGroup, DigitWheel }

export default install
