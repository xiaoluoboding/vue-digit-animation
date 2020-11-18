# Digit Wheel

<p align="left">
  <a href="https://travis-ci.org/xiaoluoboding/vue-digit-wheel"><img src="https://travis-ci.org/xiaoluoboding/vue-digit-wheel.svg?branch=master"></a>
  <a href="https://www.npmjs.com/package/vue-digit-wheel" target="_blank"><img src="https://img.shields.io/npm/v/vue-digit-wheel.svg"></a>
  <a href="https://github.com/xiaoluoboding/vue-digit-wheel"><img src="https://img.shields.io/github/stars/xiaoluoboding/vue-digit-wheel.svg"></a>
  <a href="https://github.com/xiaoluoboding/vue-digit-wheel"><img src="https://img.shields.io/github/license/xiaoluoboding/vue-digit-wheel.svg"></a>
</p>

> A digit wheel animation component for Vue 3.

## Installation

```bash
npm i vue-digit-wheel -S
or
yarn add vue-digit-wheel -S
```

## Import

### Import all the components:

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import VueDigitWheel from 'vue-digit-wheel'

createApp(App)
  .use(VueDigitWheel)
  .mount('#app')
```

### Use in your component:

```js
import { DigitWheelGroup, DigitWheel } from 'vue-digit-wheel'

export default {
  components: { DigitWheelGroup, DigitWheel }
  ...
}
```

## Usage

### DigitWheel

```html
<digit-wheel
  size="6xl"
  use-ease="Quit.easeInOut"
  :digit="6"
  :duration="1000"
/>
```

### DigitWheelGroup

```html
<digit-wheel-group
  size="6em"
  format="0,0"
  use-ease="Quit.easeInOut"
  :stagger="true"
  :digits="9527"
  :gutter="16"
  :duration="1000"
/>
```

## License

MIT
