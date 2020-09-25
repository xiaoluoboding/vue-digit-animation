import { App } from 'vue'
import DigitalGyro from './DigitalGyro.vue'

export interface DigitProps {
  el: HTMLElement // the el which component mounted
  digit: number // the digit value
  animation: string // animation type
  duration: number // animation duration in milliseconds (1000)
  stagger: boolean // whether animation display with stagger
  useEase: string // transition easing function
  format: string // proivde number format use numeral (0,0)
}

export default (app: App): void => {
  app.component(DigitalGyro.name, DigitalGyro)
}
