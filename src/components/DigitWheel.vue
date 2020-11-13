<template>
  <div v-if="isDigit(value)" class="digit-wheel" :style="digitWheelStyle">
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
  <div class="digit" v-else>{{ value }}</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { easingMap } from '../utils/index'

type IAnimationType = PropType<'default' | 'slide' | 'countup'>
type IEaseType = PropType<'Linear' | 'Ease'>

export default defineComponent({
  name: 'DigitWheel',
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

    const getTanFromDegrees = (degrees: number): number => {
      return Math.tan(degrees * Math.PI / 180)
    }

    const digitWheel = computed((): object[] => {
      return new Array(10).fill(0).map((item, index) => {
        return {
          value: index,
          style: {
            transform: `rotateX(${ 0 - index * 36 }deg) translateZ(${(96 / 2) / (getTanFromDegrees(18))}px)`,
            visibility: Number(props.value) === index
              ? 'visible' : 'hidden'
          }
        }
      })
    })

    const digitWheelStyle = computed((): object => {
      const transDuration = `${props.duration + (props.stagger ? 200 : 0) * props.index}ms`
      const transEaseFunction = easingMap[props.useEase] || 'ease'

      return {
        transform: `rotateX(${Number(props.value) * 36 - 360}deg)`,
        transition: `${transDuration} ${transEaseFunction}`
      }
    })

    return {
      isDigit,
      digitWheel,
      digitWheelStyle
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
  @return ($l / 2) / tan(central-angle($n) / 2);
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

.digit-wheel {
  transform-style: preserve-3d;
  height: 100%;
  // transform: perspective(1000px) rotateY(-45deg);
}

.digit.is-digit {
  position: absolute;
  top: 0;
  left: 0;
  height: 1em;
}
</style>
