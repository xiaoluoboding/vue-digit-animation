# Digit Animation

<p align="left">
  <a href="https://travis-ci.org/xiaoluoboding/vue-digit-animation"><img src="https://travis-ci.org/xiaoluoboding/vue-digit-animation.svg?branch=master"></a>
  <a href="https://www.npmjs.com/package/vue-digit-animation" target="_blank"><img src="https://img.shields.io/npm/v/vue-digit-animation.svg"></a>
  <a href="https://github.com/xiaoluoboding/vue-digit-animation"><img src="https://img.shields.io/github/stars/xiaoluoboding/vue-digit-animation.svg"></a>
  <a href="https://github.com/xiaoluoboding/vue-digit-animation"><img src="https://img.shields.io/github/license/xiaoluoboding/vue-digit-animation.svg"></a>
</p>

> A digit animation component with wheel/slide effect for Vue 3.

## Installation

```bash
npm i vue-digit-animation -S
or
yarn add vue-digit-animation -S
```

## Import

### Import all the components:

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import VueDigitAnimation from 'vue-digit-animation'

createApp(App)
  .use(VueDigitAnimation)
  .mount('#app')
```

### Use in your component:

```js
import { DigitAnimationGroup, DigitWheel, DigitRuler } from 'vue-digit-animation'

export default {
  components: {
    DigitAnimationGroup,
    DigitWheel,
    DigitRuler
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

```js
interface DigitProps {
  digit: number; // the digit value
  size: string; // the digit preset font-size or custom font-size
  duration: number; // Sets the length of time that animation completed, Unit is milliseconds(1000)
  useEase: string; // transition easing function
}
```

> DigitRuler

Single `<digit-ruler>` component for display single digit with slide effect

**Template**

```html
<digit-ruler
  size="6xl"
  use-ease="Quit.easeInOut"
  :digit="6"
  :duration="1000"
/>
```

**Props**

```js
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
  type="wheel"
  size="6em"
  format="0,0"
  use-ease="Quit.easeInOut"
  stagger
  :digits="9527"
  :duration="1000"
/>
```

**Props**

```js
interface DigitsProps {
  digits: number; // the digit value
  size: string; // the digit preset font-size or custom font-size
  gutter: number; // digit Spacing, default is 8px
  type: string; // animation type
  duration: number; // sets the length of time that animation completed, Unit is milliseconds(1000)
  stagger: boolean; // whether animation display with stagger effect
  useEase: string; // transition easing function
  format: string; // proivde number format use numeral (0,0)
}
```

## License

MIT [@xiaoluoboding](https://github.com/xiaoluoboding)
