<template>
  <div class="digit-wheel__wrap" :style="textStyle">
    <div
      v-if="isDigit(digit)"
      class="digit-wheel"
      ref="digitWheel"
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
    <div v-else class="digit" :class="ensureDigitClass(digit)">{{ digit }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'

import { easingMap, fontSizePreset, UUIDGenerator } from '../utils/index'

type IAnimationType = PropType<'default' | 'wheel' | 'countup'>
type IEaseType = PropType<'Linear' | 'Ease'>

export interface DigitProps {
  digit: number; // the digit value
  size: string; // the digit preset font-size or custom font-size
  animation: string; // animation type
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
    animation: {
      type: String as IAnimationType,
      default: 'wheel'
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
  data: vm => ({
    uuid: UUIDGenerator(),
    digitHeight: 0,
    showRange: [vm.digit]
  }),
  computed: {
    digitWheel (): object {
      const digitValue = Number(this.digit)

      this.getDigitHeight()

      return new Array(10).fill(0).map((item, index) => {
        const inRadius = (this.digitHeight / 2) / (this.getTanFromDegrees(DIGIT_DEGREE / 2))
        // console.log(this.digitHeight, inRadius)
        const isBackDigit = (digitValue < 5 ? digitValue + 5 : digitValue - 5) === index
        const isHide = !this.showRange.includes(index)

        return {
          value: index,
          style: {
            transform: `rotateX(${0 - index * DIGIT_DEGREE}deg) translateZ(${inRadius}px)`,
            visibility: (isBackDigit || isHide) ? 'hidden' : 'visible'
          }
        }
      })
    },
    digitWheelStyle (): object {
      const transDuration = `${this.duration + (this.stagger ? 200 : 0) * this.index}ms`
      const transEaseFunction = easingMap[this.useEase] || 'ease'

      return {
        transform: `rotateX(${Number(this.digit) * DIGIT_DEGREE - 360}deg)`,
        transition: `${transDuration} ${transEaseFunction}`
      }
    },
    textStyle (): object {
      const sizePreset = Object.prototype.hasOwnProperty.call(fontSizePreset, this.size)
        ? fontSizePreset[this.size]
        : this.size

      return this.isGroup ? {} : { fontSize: sizePreset }
    }
  },
  watch: {
    digit (oldVal, newVal) {
      const digits = new Array(10).fill(0).map((item, index) => index)
      const minVal = oldVal < newVal ? oldVal : newVal
      const maxVal = oldVal < newVal ? newVal : oldVal
      this.showRange = digits.slice(minVal, maxVal + 1)
    }
  },
  mounted () {
    const dwEl = document.getElementById(this.uuid)
    if (dwEl) {
      const compStyles = window.getComputedStyle(dwEl)
      const digitFontSize = compStyles.getPropertyValue('font-size')
      this.digitHeight = Number(digitFontSize.replace('px', ''))
    }
    this.showRange.push(Number(this.digit))
  },
  methods: {
    isNumber (val: number): boolean {
      return typeof val === 'number' && !isNaN(val)
    },
    isDigit (val: string) {
      return this.isNumber(parseInt(val, 10))
    },
    getTanFromDegrees (degrees: number) {
      return Math.tan((degrees * Math.PI) / 180)
    },
    ensureDigitClass (val: string) {
      const isLetter = /[a-zA-Z]/
      const isChinese = /[\u4E00-\u9FA5]/
      const isDigit = /\d/
      const isPercentage = /%/

      if (isLetter.test(val)) return 'is-letter'
      if (isChinese.test(val)) return 'is-chinese'
      if (isPercentage.test(val)) return 'is-percentage'
      if (isDigit.test(val)) return 'is-digit'
      return 'is-symbol'
    },
    getDigitHeight (): void {
      const dwEl = document.getElementById(this.uuid)
      if (dwEl) {
        const compStyles = window.getComputedStyle(dwEl)
        const digitFontSize = compStyles.getPropertyValue('font-size')
        this.digitHeight = Number(digitFontSize.replace('px', ''))
      }
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
