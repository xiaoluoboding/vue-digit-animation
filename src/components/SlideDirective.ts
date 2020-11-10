import type { App, ObjectDirective, DirectiveBinding } from 'vue'

// const CENTER_DIGIT = -5

interface VSlideProps {
  value: string // the digit value
  transition: string // transition easing function
}

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const directive: ObjectDirective = {
  mounted: (el: HTMLElement, binding: DirectiveBinding<string>) => {
    const { value } = binding
    if (value) {
      el.classList.add(`slide-height-1`)
      el.setAttribute('data-digit', value)
    }
  },
  beforeUpdate: (el: HTMLElement, binding: DirectiveBinding<string>) => {
    const { oldValue, value } = binding
    // const newDigit = Math.abs(Math.abs(Number(value) - Number(oldValue)) + CENTER_DIGIT)
    
    if (oldValue !== null) {
      el.classList.remove(`is-digit`)
      el.classList.remove(`slide-height-1`)
      el.style.transition = ''
      // el.classList.add(`slide-height-${newDigit}`)
    }
  },
  updated: (el: HTMLElement, binding: DirectiveBinding<VSlideProps>) => {
    // console.log(binding.value.value)
    // console.log(binding.value.transition)
    const { oldValue, value, instance: vm } = binding
    // const newDigit = Math.abs(Math.abs(Number(value) - Number(oldValue)) + CENTER_DIGIT)

    if (oldValue !== null) {
      setTimeout(() => {
        el.classList.add(`is-digit`)
        el.classList.add(`slide-height-1`, )
        // el.classList.remove(`slide-height-${newDigit}`)
        el.style.transition = value.transition
      }, 17)
    }

    if (value) {
      el.setAttribute('data-digit', value.value)
    }
  }
}

const isVue3 = (app: App): app is App =>
  app.version[0] === "3"

const Plugin = (
  app: App,
  directives: string | string[] = 'variantwind'
) => {
  if (isVue3(app)) {
    if (Array.isArray(directives)) {
      directives.map((name) => {
        app.directive(name, directive)
      })
    } else {
      app.directive(directives, directive)
    }
  }
}

export default Plugin