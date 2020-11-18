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
import { computed, defineComponent, PropType } from 'vue-demi'

import { easingMap, circleLinkedDigit } from '../utils/index'

type IAnimationType = PropType<'default' | 'slide' | 'countup'>
type IEaseType = PropType<'Linear' | 'Ease'>

export default defineComponent({
  name: 'DigitRuler',
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
      // const slideDigit = Number(value) - 4
      // const offsetDigit = slideDigit < 0 ? slideDigit + 10 : slideDigit
      // const digitCollection = circleLinkedDigit.getCircleMiddle(offsetDigit.toString())
      const digitCollection = circleLinkedDigit.getCircleMiddle(value)

      // return digitCollection.slice(4, 7).join(' ')
      return digitCollection.join(' ')
    })

    const digitStyle = computed((): string => {
      const transDuration = `${props.duration + (props.stagger ? 200 : 0) * props.index}ms`
      const transEaseFunction = easingMap[props.useEase] || 'ease'

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

<style lang="scss" scoped>
@for $i from 0 through 10 {
  .slide-offset-#{10 - $i} {
    --slide-offset: #{$i - 10}em;
  }
}

.digit.is-digit {
  transform: translateY(var(--slide-offset));
  /* transition: all 666ms; */
}
</style>
