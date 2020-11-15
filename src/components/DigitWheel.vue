<template>
  <div class="digit-wheel--wrapper" :style="textStyle">
    <div
      v-if="isDigit(value)"
      class="digit-wheel"
      :id="wheelId"
      :style="digitWheelStyle"
      :data-digit="value"
    >
      <div
        class="digit is-digit"
        v-for="item in digitWheel"
        :key="item.value"
        :data-digit="item.value"
        :class="`digit-${item.value}`"
        :style="item.style"
      >
        {{ item.value }}
      </div>
    </div>
    <div
      v-else
      class="digit"
      :class="ensureDigitClass(value)"
    >{{ value }}</div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, PropType, onMounted } from 'vue'

import { easingMap, fontSizePreset, UUIDGenerator } from '../utils/index'

type IAnimationType = PropType<'default' | 'wheel' | 'countup'>
type IEaseType = PropType<'Linear' | 'Ease'>

const DIGIT_DEGREE = 360 / 10

export default defineComponent({
  name: 'DigitWheel',
  props: {
    value: {
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
    }
  },
  setup(props, context) {
    const uuid = UUIDGenerator()
    const wheelId = ref(uuid)
    const digitHeight = ref(0)

    const isNumber = (val: number): boolean => {
      return typeof val === 'number' && val === val
    }

    const isDigit = (val: string): boolean => {
      return isNumber(parseInt(val, 10))
    }

    const getTanFromDegrees = (degrees: number): number => {
      return Math.tan(degrees * Math.PI / 180)
    }

    const digitWheel = computed((): object[] => {
      return new Array(10).fill(0).map((item, index) => {
        const inRadius = (digitHeight.value / 2) / (getTanFromDegrees(DIGIT_DEGREE / 2))
        return {
          value: index,
          style: {
            transform: `rotateX(${ 0 - index * DIGIT_DEGREE }deg) translateZ(${inRadius}px)`,
          }
        }
      })
    })

    const digitWheelStyle = computed((): object => {
      const transDuration = `${props.duration + (props.stagger ? 200 : 0) * props.index}ms`
      const transEaseFunction = easingMap[props.useEase] || 'ease'

      return {
        transform: `rotateX(${Number(props.value) * DIGIT_DEGREE - 360}deg)`,
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

    const ensureDigitClass = (val: string): string => {
      const isLetter = /[a-zA-Z]/
      const isChinese = /[\u4E00-\u9FA5]/
      const isDigit = /\d/

      if (isLetter.test(val)) return 'is-letter'
      if (isChinese.test(val)) return 'is-chinese'
      if (isDigit.test(val)) return 'is-digit'
      return 'is-symbol'
    }

    onMounted(() => {
      const dwEl = document.getElementById(wheelId.value)
      if (dwEl) {
        const compStyles = window.getComputedStyle(dwEl)
        const digitFontSize = compStyles.getPropertyValue('font-size')
        digitHeight.value = Number(digitFontSize.replace('px', ''))
      }
    })

    return {
      wheelId,
      isDigit,
      digitWheel,
      digitWheelStyle,
      textStyle,
      ensureDigitClass
    }
  }
})
</script>

<style lang="scss">
$digit-deg: 36deg;
$digit-height: 10em;

@function central-angle($n) {
  @return 360deg / $n;
}

@function inradius($n, $l) {
  @return ($l / 2) / tan(central-angle($n));
}

@for $i from 0 through 10 {
  .slide-offset-#{10 - $i} {
    --slide-offset: #{$i - 10}em;
  }
}

// @for $i from 0 through 10 {
//   $translateZ: inradius(10, $digit-height);
//   .digit-#{$i} {
//     transform: rotateX(0 - $i - $digit-deg) translateZ($translateZ + "px");
//   }
// }

.digit-wheel--wrapper {
  display: inline-block;
  overflow: hidden;

  .digit-wheel {
    transform-style: preserve-3d;
    height: 1em;
    width: 1ch;
    background-color: #333;
  }

  .digit {
    line-height: 1;
  }

  .digit.is-digit {
    position: absolute;
    top: 0;
    left: 0;
    height: 1em;
    background-color: #333;
    // &:after {
    //   content: ' ';
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   height: 1em;
    //   width: 100%;
    //   background: #333;
    //   z-index: -1;
    // }
  }

  .digit.is-symbol {
    width: 1ch;
  }

  .digit.is-letter,
  .digit.is-chinese {
    height: 1em;
    width: 1em;
  }
}
</style>
