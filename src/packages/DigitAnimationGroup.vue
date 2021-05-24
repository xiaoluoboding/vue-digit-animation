<template>
  <div class="digit-animation-group" :style="textStyle">
    <div
      v-for="(digit, index) in groupDigits"
      class="digit-animation-group__col"
      :style="colStyle"
      :key="index"
    >
      <digit-wheel
        v-if="isDigit(digit)"
        is-group
        :digit="digit"
        :index="index"
        :size="size"
        v-bind="$attrs"
      />
      <div v-else class="digit" :class="ensureDigitClass(digit)">
        {{ digit }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, PropType, defineComponent, provide } from 'vue'
import numeral from 'numeral'

import { isDigit, fontSizePreset, ensureDigitClass } from '../utils/index'
import DigitWheel from './DigitWheel.vue'
// import DigitRuler from './DigitRuler.vue'

type IAnimationType = PropType<'default' | 'wheel' | 'slide'>
type IEaseType = PropType<'Linear' | 'Ease'>

export interface DigitsProps {
  digits: number; // the digit value
  size: string; // the digit preset font-size or custom font-size
  gutter: number; // digit Spacing, default is 8px
  duration: number; // sets the length of time that animation completed, Unit is milliseconds(1000)
  stagger: boolean; // whether animation display with stagger effect
  useEase: string; // transition easing function
  format: string; // proivde number format use numeral (0,0)
}

export default defineComponent({
  name: 'DigitAnimationGroup',
  components: {
    DigitWheel
  },
  props: {
    digits: {
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
    const groupDigits = computed((): string[] => {
      let digits = numeral(props.digits).format(props.format)

      const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length

      digits = Array.from(digits).filter((item: any) => !isEmpty(item))

      return digits
    })

    const colStyle = computed((): object => {
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

    provide('textStyle', textStyle)

    return {
      groupDigits,
      colStyle,
      textStyle,
      isDigit,
      ensureDigitClass
    }
  }
})
</script>

<style lang="scss" scoped>
.digit-animation-group {
  height: 1em;
}

.digit-animation-group__col {
  display: inline-block;
  height: 1em;
  .digit {
    display: inline-block;
    overflow: hidden;
    height: 1em;
    line-height: 1;
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

.digit-animation-group__col:first-child {
  padding-left: 0 !important;
}

.digit-animation-group__col:last-child {
  padding-right: 0 !important;
}
</style>
