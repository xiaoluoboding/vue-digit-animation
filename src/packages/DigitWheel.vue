<template>
  <div class="digit-wheel__wrap" :style="digitTextStyle">
    <div
      class="digit-wheel"
      :id="uuid"
      :style="digitWheelStyle"
      :data-digit="digit"
    >
      <div
        class="digit is-digit"
        v-for="item in digitWheel"
        :key="item.value"
        :data-digit="item.value"
        :style="item.style"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, reactive, watch, onMounted } from 'vue'

import { easingMap, UUIDGenerator, fontSizePreset } from '../utils/index'

type IEaseType = PropType<'Linear' | 'Ease'>

interface LocalState {
  digitHeight: number;
  showRange: number[];
}

export interface DigitProps {
  digit: string; // the digit value
  size: string; // the digit preset font-size or custom font-size
  duration: number; // Sets the length of time that animation completed, Unit is milliseconds(1000)
  useEase: string; // transition easing function
}

const DIGIT_DEGREE = 360 / 10

export default defineComponent({
  name: 'DigitWheel',
  props: {
    digit: {
      type: [String, Number],
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'base'
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
    },
    isGroup: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const uuid = UUIDGenerator()

    const state = reactive<LocalState>({
      digitHeight: 0,
      showRange: []
    })

    const getDigitHeight = (): void => {
      const dwEl = document.getElementById(uuid)
      if (dwEl) {
        const compStyles = window.getComputedStyle(dwEl)
        const digitFontSize = compStyles.getPropertyValue('font-size')
        state.digitHeight = Number(digitFontSize.replace('px', ''))
      }
    }

    const getTanFromDegrees = (degrees: number) => {
      return Math.tan((degrees * Math.PI) / 180)
    }

    const digitWheel = computed((): object => {
      const digitValue = Number(props.digit)

      getDigitHeight()

      return new Array(10).fill(0).map((item, index) => {
        const inRadius = (state.digitHeight / 2) / (getTanFromDegrees(DIGIT_DEGREE / 2))
        const backDigit = (digitValue < 5 ? digitValue + 5 : digitValue - 5)
        // hide wheel back digit
        const isBackDigit = backDigit === index
        // hide none animation path digit
        const isHideDigit = !state.showRange.includes(index)

        return {
          value: index,
          style: {
            transform: `rotateX(${0 - index * DIGIT_DEGREE}deg) translateZ(${inRadius}px)`,
            visibility: (isBackDigit || isHideDigit) ? 'hidden' : 'visible'
          }
        }
      })
    })

    const digitWheelStyle = computed((): object => {
      const transDuration = `${props.duration + (props.stagger ? 200 : 0) * props.index}ms`
      const transEaseFunction = easingMap[props.useEase] || 'ease'

      return {
        transform: `rotateX(${Number(props.digit) * DIGIT_DEGREE - 360}deg)`,
        transition: `${transDuration} ${transEaseFunction}`
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

    const digitTextStyle = props.isGroup ? {} : textStyle

    watch(
      () => props.digit,
      (newVal, oldVal) => {
        const oldNumber = Number(oldVal)
        const newNumber = Number(newVal)
        const digits = new Array(10).fill(0).map((item, index) => index)
        const minVal = oldNumber < newNumber ? oldNumber : newNumber
        const maxVal = oldNumber < newNumber ? newNumber : oldNumber
        state.showRange = digits.slice(minVal, maxVal + 1)
      }
    )

    onMounted(() => {
      const dwEl = document.getElementById(uuid)
      if (dwEl) {
        const compStyles = window.getComputedStyle(dwEl)
        const digitFontSize = compStyles.getPropertyValue('font-size')
        state.digitHeight = Number(digitFontSize.replace('px', ''))
      }
      state.showRange.push(Number(props.digit))
    })

    return {
      uuid,
      digitWheel,
      digitTextStyle,
      digitWheelStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.digit-wheel__wrap {
  display: inline-block;
  overflow: hidden;

  .digit-wheel {
    transform-style: preserve-3d;
    height: 1em;
    width: 1ch;
  }

  .digit {
    line-height: 1;
  }

  .digit.is-digit {
    position: absolute;
    top: 0;
    left: 0;
    width: 1ch;
  }

  .digit.is-symbol {
    width: 1ch;
  }

  .digit.is-letter,
  .digit.is-chinese,
  .digit.is-percentage {
    width: 1em;
  }
}
</style>
