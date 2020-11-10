<template>
  <div
    v-if="isDigit(value)"
    v-slide="{ value, transition: digitStyle }"
    class="digit is-digit"
  >
    <span>{{ verticalDigit }}</span>
  </div>
  <div class="digit" v-else>{{ value }}</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { easingMap, circleLinkedDigit } from '../utils/index'

type IAnimationType = PropType<'default' | 'slide' | 'countup'>
type IEaseType = PropType<'Linear' | 'Ease'>

export default defineComponent({
  name: 'Digit',
  props: {
    value: {
      type: String,
      default: ''
    },
    index: {
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
    useEase: {
      type: String as IEaseType,
      default: 'Ease'
    }
  },
  setup(props) {
    const isNumber = (val: number): boolean => {
      return typeof val === 'number' && val === val
    }

    const isDigit = (val: string): boolean => {
      return isNumber(parseInt(val, 10))
    }

    const verticalDigit = computed((): string => {
      const { value } = props
      const slideDigit = Number(value) - 4
      const offsetDigit = slideDigit < 0 ? slideDigit + 10 : slideDigit
      const digitCollection = circleLinkedDigit.getCircleMiddle(offsetDigit.toString())

      // return digitCollection.slice(4, 7).join(' ')
      return digitCollection.join(' ')
    })

    const digitStyle = computed((): string => {
      // const digitValue = parseInt(digits.value[index], 10)
      // const digitLength = digitCollection.length - 1
      const transDuration = `${props.duration + (props.stagger ? 200 : 0) * props.index}ms`
      const transEaseFunction = easingMap[props.useEase] || 'ease'

      /**
       * calc formula
       */
      // const slideStyle = {
      //   // transform: `translateY(${digitValue - digitLength}em)`,
      //   // transform: `translateY(-5em)`,
      //   transition: `${transDuration} ${transEaseFunction}`
      // }

      return `${transDuration} ${transEaseFunction}`
    })

    return {
      isDigit,
      verticalDigit,
      digitStyle
    }
  }
})
</script>

<style lang="scss">
@for $i from 0 through 10 {
  .slide-height-#{10 - $i} {
    --slide-height: #{$i - 10}em;
  }
}

.digit.is-digit {
  transform: translateY(var(--slide-height));
  // transform: translateY(-100%);
  // transition: all 666ms;
}
</style>
