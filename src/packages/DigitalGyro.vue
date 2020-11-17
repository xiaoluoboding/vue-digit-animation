<template>
  <div class="digital-gyro" :style="textStyle">
    <div
      v-for="(digit, index) in digits"
      class="digital-gyro__col"
      :style="gyroStyle"
      :key="index"
    >
      <DigitWheel
        is-gyro
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

type IAnimationType = PropType<'default' | 'slide' | 'countup'>
type IEaseType = PropType<'Linear' | 'Ease'>

export interface DigitProps {
  digit: number; // the digit value
  size: string; // the digit preset font-size or custom font-size
  animation: string; // animation type
  duration: number; // animation duration in milliseconds (1000)
  stagger: boolean; // whether animation display with stagger
  useEase: string; // transition easing function
  format: string; // proivde number format use numeral (0,0)
}

// const el = ref<HTMLElement | null>(null)

export default defineComponent({
  name: 'DigitalGyro',
  components: {
    DigitWheel
  },
  props: {
    digit: {
      type: Number,
      default: 0
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
.digital-gyro {
  height: 1em;
}

.digital-gyro__col {
  display: inline-block;
}

.digital-gyro__col:first-child {
  padding-left: 0 !important;
}

.digital-gyro__col:last-child {
  padding-right: 0 !important;
}
</style>
