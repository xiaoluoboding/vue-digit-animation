<template>
  <div class="digit-ruler" :style="digitTextStyle">
    <div
      v-slide="{ digit, transition: digitStyle }"
      class="digit is-digit"
      :id="uuid"
      :data-digit="digit"
    >
      <span>{{ verticalDigit }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { easingMap, circleLinkedDigit, UUIDGenerator, fontSizePreset } from '../utils/index'

type IEaseType = PropType<'Linear' | 'Ease'>

export interface DigitProps {
  digit: number; // the digit value
  size: string; // the digit preset font-size or custom font-size
  duration: number; // Sets the length of time that animation completed, Unit is milliseconds(1000)
  useEase: string; // transition easing function
}

/* scss function */
// @for $i from 0 through 10 {
//   .slide-offset-#{10 - $i} {
//     --slide-offset: #{$i - 10}em;
//   }
// }

export default defineComponent({
  name: 'DigitRuler',
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

    const verticalDigit = computed((): string => {
      const { digit } = props
      // const slideDigit = Number(value) - 4
      // const offsetDigit = slideDigit < 0 ? slideDigit + 10 : slideDigit
      // const digitCollection = circleLinkedDigit.getCircleMiddle(offsetDigit.toString())
      const digitCollection = circleLinkedDigit.getCircleMiddle(String(digit))

      // return digitCollection.slice(4, 7).join(' ')
      return digitCollection.join(' ')
    })

    const digitStyle = computed((): string => {
      const transDuration = `${props.duration + (props.stagger ? 200 : 0) * props.index}ms`
      const transEaseFunction = easingMap[props.useEase] || 'ease'

      return `${transDuration} ${transEaseFunction}`
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

    return {
      uuid,
      verticalDigit,
      digitStyle,
      digitTextStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.slide-offset-10 {
  --slide-offset: -10em;
}
.slide-offset-9 {
  --slide-offset: -9em;
}
.slide-offset-8 {
  --slide-offset: -8em;
}
.slide-offset-7 {
  --slide-offset: -7em;
}
.slide-offset-6 {
  --slide-offset: -6em;
}
.slide-offset-5 {
  --slide-offset: -5em;
}
.slide-offset-4 {
  --slide-offset: -4em;
}
.slide-offset-3 {
  --slide-offset: -3em;
}
.slide-offset-2 {
  --slide-offset: -2em;
}
.slide-offset-1 {
  --slide-offset: -1em;
}

.digit-ruler {
  overflow: hidden;
  height: 1em;
  .digit {
    line-height: 1;
    width: 1ch;
    display: inline-block;
    height: 1em;
  }
  .digit.is-digit {
    transform: translateY(var(--slide-offset));
  }
}
</style>
