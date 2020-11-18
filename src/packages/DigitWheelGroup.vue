<template>
  <div class="digit-wheel-group" :style="textStyle">
    <div
      v-for="(digit, index) in digits"
      class="digit-wheel-group__col"
      :style="gyroStyle"
      :key="index"
    >
      <DigitWheel
        is-group
        :value="digit"
        :index="index"
        :size="size"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  PropType,
  defineComponent
} from 'vue'
import numeral from 'numeral'

import { fontSizePreset } from '../utils/index'
import DigitWheel from './DigitWheel.vue'

type IAnimationType = PropType<'default' | 'wheel' | 'countup'>
type IEaseType = PropType<'Linear' | 'Ease'>

export interface DigitProps {
  digit: number; // the digit value
  size: string; // the digit preset font-size or custom font-size
  gutter: number; // digit Spacing, default is 8px
  animation: string; // animation type
  duration: number; // Sets the length of time that animation completed, Unit is milliseconds(1000)
  stagger: boolean; // whether animation display with stagger effect
  useEase: string; // transition easing function
  format: string; // proivde number format use numeral (0,0)
}

// const el = ref<HTMLElement | null>(null)

export default defineComponent({
  name: 'DigitWheelGroup',
  components: {
    DigitWheel
  },
  props: {
    digit: {
      type: Number,
      default: 0,
      required: true
    },
    gutter: {
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: '0,0'
    },
    size: {
      type: String,
      default: 'base'
    }
  },
  setup (props) {
    const digits = computed((): string[] => {
      let digits = numeral(props.digit).format(props.format)

      const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length

      digits = Array.from(digits).filter((item: any) => !isEmpty(item))

      return digits
    })

    const gyroStyle = computed((): object => {
      return {
        // 'grid-template-columns': `repeat(${digits.value.length}, minmax(0, 1fr))`,
        padding: `0 ${props.gutter}px`
      }
    })

    const textStyle = computed((): object => {
      const sizePreset = Object.prototype.hasOwnProperty.call(fontSizePreset, props.size)
        ? fontSizePreset[props.size]
        : props.size
      return {
        fontSize: sizePreset
      }
    })

    onMounted(() => {
      // console.log(props)
    })

    onBeforeUpdate(() => {
      // isUpdated.value = false
    })

    onUpdated(() => {
      // isUpdated.value = true
    })

    return {
      digits,
      gyroStyle,
      textStyle
    }
  }
})
</script>

<style scoped>
.digit-wheel-group {
  height: 1em;
}

.digit-wheel-group__col {
  display: inline-block;
}

.digit-wheel-group__col:first-child {
  padding-left: 0 !important;
}

.digit-wheel-group__col:last-child {
  padding-right: 0 !important;
}
</style>
