# Digit Animation

<p align="left">
  <a href="https://www.npmjs.com/package/vue-digit-animation" target="_blank"><img src="https://img.shields.io/npm/v/vue-digit-animation.svg"></a>
  <a href="https://github.com/xiaoluoboding/vue-digit-animation"><img src="https://img.shields.io/github/stars/xiaoluoboding/vue-digit-animation.svg"></a>
  <a href="https://github.com/xiaoluoboding/vue-digit-animation"><img src="https://img.shields.io/github/license/xiaoluoboding/vue-digit-animation.svg"></a>
</p>

> A digit animation component with wheel/slide effect for Vue 3.

## Preview

### Gif

![vue-digit-animation](https://cdn.jsdelivr.net/gh/xiaoluoboding/image-hub@latest/images/2020/11/202011_vue-digit-animation.gif)

### Online Demo

[Edit on CodePen](https://codepen.io/xiaoluoboding/pen/NWrJGJq)

### Vercel

[vue-digit-animation.vercel.app/](vue-digit-animation.vercel.app/)

### Codesandbox

[![Edit Digit Wheel Animation For Vue 3 Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/digit-wheel-animation-for-vue-3-demo-df5k2?fontsize=14&hidenavigation=1&theme=dark)

## Installation

```bash
npm i vue-digit-animation -S
or
yarn add vue-digit-animation -S
```

## Import

### Import all the components

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import VueDigitAnimation from 'vue-digit-animation'

createApp(App)
  .use(VueDigitAnimation)
  .mount('#app')
```

### Use in your component

```js
import { DigitAnimationGroup, DigitWheel } from 'vue-digit-animation'

export default {
  components: {
    DigitAnimationGroup,
    DigitWheel
  }
  ...
}
```

## Usage

### DigitWheel

Single `<digit-wheel>` component for display single digit with wheel effect

**Demo**

```html
<digit-wheel
  size="6xl"
  use-ease="Quit.easeInOut"
  :digit="6"
  :duration="1000"
/>
```

**Template**

```typescript
interface DigitProps {
  digit: number; // the digit value
  size: string; // the digit preset font-size or custom font-size
  duration: number; // Sets the length of time that animation completed, Unit is milliseconds(1000)
  useEase: string; // transition easing function
}
```

### DigitAnimationGroup

A group of `<digit-wheel>` or `<digit-ruler>` component for display multiple digits

**Template**

```html
<digit-animation-group
  size="6em"
  format="0,0"
  use-ease="Quit.easeInOut"
  stagger
  :digits="9527"
  :duration="1000"
/>
```

**Props**

```typescript
interface DigitsProps {
  digits: number; // the digits value
  size: string; // the digits preset font-size or custom font-size
  gutter: number; // digits Spacing, default is 0px
  duration: number; // sets the length of time that animation completed, Unit is milliseconds(1000)
  stagger: boolean; // whether animation display with stagger effect
  useEase: string; // transition easing function
  format: string; // provide number format use numeral (0,0)
}
```

### With TypeScript

```typescript
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare `vue-digit-animation` as a module
declare module 'vue-digit-animation'
```

## License

MIT [@xiaoluoboding](https://github.com/xiaoluoboding)
