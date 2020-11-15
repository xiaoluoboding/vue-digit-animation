<template>
  <div class="digital-gyro">
    <div
      v-for="(digit, index) in digits"
      class="digital-gyro__item"
      :style="gyroItemStyle"
      :key="index"
    >
      <Digit
        :value="digit"
        :index="index"
        :duration="duration"
        :stagger="stagger"
        :use-ease="useEase"
        :size="size"
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
import { fontSizePreset, circleLinkedDigit } from '../utils/index'

type IAnimationType = PropType<'default' | 'slide' | 'countup'>
type IEaseType = PropType<'Linear' | 'Ease'>

export interface DigitProps {
  el: HTMLElement // the el which component mounted
  digit: number // the digit value
  size: string // the digit preset font-size or custom font-size
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
    size: {
      type: String,
      default: 'base'
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

    const isNumber = (val: number): boolean => {
      return typeof val === 'number' && val === val
    }

    const isDigit = (val: string): boolean => {
      return isNumber(parseInt(val, 10))
    }

    const digits = computed((): string[] => {
      const digits = numeral(props.digit).format(props.format)

      return Array.from(digits)
    })

    const gyroStyle = computed((): object => {
      const sizePreset = Object.prototype.hasOwnProperty.call(fontSizePreset, props.size)
        ? fontSizePreset[props.size]
        : props.size
      return {
        fontSize: sizePreset
      }
    })

    const gyroItemStyle = computed((): object => {
      return {
        padding: `0 ${props.gutter}px`
      }
    })

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
      verticalDigit,
      gyroStyle,
      gyroItemStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.digital-gyro {
  &__item {
    display: inline-block;
    overflow: hidden;
  }
}
</style>
