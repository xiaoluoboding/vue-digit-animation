<template>
  <div class="digital-gyro">
    <div
      v-for="(digit, index) in digits"
      class="digital-gyro__item"
      :class="`digital-gyro--${ensureDigitClass(digit)}`"
      :style="digitalGyroStyle"
      :key="index"
    >
      <Digit
        :value="digit"
        :index="index"
        :duration="duration"
        :stagger="stagger"
        :use-ease="useEase"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  PropType,
  defineComponent
} from 'vue'
import numeral from 'numeral'

import Digit from './DigitWheel.vue'
import { circleLinkedDigit } from '../utils/index'

type IAnimationType = PropType<'default' | 'slide' | 'countup'>
type IEaseType = PropType<'Linear' | 'Ease'>

export interface DigitProps {
  el: HTMLElement // the el which component mounted
  digit: number // the digit value
  animation: string // animation type
  duration: number // animation duration in milliseconds (1000)
  stagger: boolean // whether animation display with stagger
  useEase: string // transition easing function
  format: string // proivde number format use numeral (0,0)
}

// const el = ref<HTMLElement | null>(null)

export default defineComponent({
  name: 'DigitalGyro',
  components: {
    Digit
  },
  props: {
    el: {
      type: [String, HTMLElement],
      default: null
    },
    digit: {
      type: Number,
      default: 0
    },
    animation: {
      type: String as IAnimationType,
      default: 'slide'
    },
    duration: {
      type: Number,
      default: 1000
    },
    stagger: {
      type: Boolean,
      default: false
    },
    gutter: {
      type: Number,
      default: 0
    },
    useEase: {
      type: String as IEaseType,
      default: 'Ease'
    },
    format: {
      type: String,
      default: '0,0'
    }
  },
  setup(props) {
    // const digitCollection = Array.from('09876543210')
    const digitCollection = circleLinkedDigit.getCircleMiddle('5')
    const verticalDigit = ref(digitCollection.join(' '))
    // const isUpdated = ref(true)
    // const digit = ref(props.digit)

    const isNumber = (val: number): boolean => {
      return typeof val === 'number' && val === val
    }

    const isDigit = (val: string): boolean => {
      return isNumber(parseInt(val, 10))
    }

    const ensureDigitClass = (val: string): string => {
      const isLetter = /[a-zA-Z]/
      const isChinese = /[\u4E00-\u9FA5]/
      const isDigit = /\d/

      if (isLetter.test(val)) return 'letter'
      if (isChinese.test(val)) return 'chinese'
      if (isDigit.test(val)) return 'digit'
      return 'symbol'
    }

    const ensureDigit = (val: string): string => {
      const digitCollection = circleLinkedDigit.getCircleMiddle(val)
      const verticalDigit = digitCollection.join(' ')

      return verticalDigit
    }

    const digits = computed((): string[] => {
      const digits = numeral(props.digit).format(props.format)

      return Array.from(digits)
    })

    const digitalGyroStyle = computed((): object => {
      return {
        padding: `0 ${props.gutter}px`
      }
    })

    // const digitStyle = (index: number): object => {
    //   const digitValue = parseInt(digits.value[index], 10)
    //   const digitLength = digitCollection.length - 1
    //   const transDuration = `${props.duration + (props.stagger ? 200 : 0) * index}ms`
    //   const transEaseFunction = easingMap[props.useEase] || 'ease'

    //   /**
    //    * calc formula
    //    */
    //   const slideStyle = {
    //     // transform: `translateY(${digitValue - digitLength}em)`,
    //     transform: `translateY(-5em)`,
    //     transition: `${transDuration} ${transEaseFunction}`
    //   }

    //   return slideStyle
    // }

    // const digitize = (n: number): number[] => [...`${n}`].map(i => parseInt(i))

    onMounted(() => {
      console.log(props)
    })

    onBeforeUpdate(() => {
      // isUpdated.value = false
    })

    onUpdated(() => {
      // isUpdated.value = true
    })

    return {
      digits,
      isDigit,
      // digitStyle,
      verticalDigit,
      ensureDigit,
      digitalGyroStyle,
      ensureDigitClass
    }
  }
})
</script>

<style lang="scss" scoped>
// @mixin animation($single-animation) {
//   -webkit-animation: $single-animation;
//   animation: $single-animation;
// }

.digital-gyro {
  // @include digit-styling();
  display: inline-block;
  height: 1em;
  // transform: perspective(1000px) rotateY(-45deg);
  &__item {
    display: inline-block;
    height: 1em;
    overflow: hidden;
    // @include digit-item-styling();
  }

  &--digit,
  &--symbol {
    width: 1ch;
  }

  &--letter,
  &--chinese {
    width: 1em;
  }

  .digit {
    line-height: 1;
    // @include animation(slide infinite linear);
  }
}

// @keyframes slide {
//   from {
//     transform: translateY(-10em);
//   }

//   to {
//     transform: translateY(0);
//   }
// }
</style>

<style lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-enter-active {
  transition: all 666ms linear;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-5em);
}
// $unit-of-speed: 50ms; // crazy fast
// $unit-of-speed: 500ms; // normal
// $unit-of-speed: 5000ms; // boring

// @mixin digit-styling() {
//   color: rgba(255, 255, 255, 0.9);
//   margin: 2em auto;
//   background: #222;
//   text-shadow: 0 -1px rgba(0, 0, 0, 0.9);
//   border-radius: 2px;
//   box-shadow: inset 0 2px 8px -2px #000;
// }

// @mixin digit-item-styling() {
//   border-right: 1px solid rgba(0, 0, 0, 0.5);
//   border-left: 1px solid rgba(255, 255, 255, 0.05);
//   padding: 0 0.2em;
//   &:first-child {
//     border-left: none;
//   }
// }

// @mixin animation-duration($duration) {
//   -webkit-animation-duration: $duration;
//   animation-duration: $duration;
// }

// .digit-one {
//   @include animation-duration(10 * $unit-of-speed);
// }

// .digit-ten {
//   @include animation-duration(100 * $unit-of-speed);
// }

// .digit-hundred {
//   @include animation-duration(1000 * $unit-of-speed);
// }
</style>
