<template>
  <div class="digital-gyro">
    <template v-for="(item, index) in digits">
      <div class="digital-gyro--item">
        <div
          v-if="isNumber(parseInt(item, 10))"
          class="digit"
          :style="digitStyle(index)"
        >
          <span>{{ verticalDigit.join(' ') }}</span>
        </div>
        <div class="digit" v-else>,</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted, PropType } from 'vue'
import numeral from 'numeral'

type IAnimationType = PropType<'default' | 'slide' | 'countup'>

interface DigitProps {
  el: HTMLElement // the el which component mounted
  digit: number // the digit value
  animation: string // animation type
  format: string
  duration: number
  padZero: number
  thousandSeparated: boolean
  stagger: boolean
}

// const el = ref<HTMLElement | null>(null)

export default defineComponent({
  name: 'DigitalGyro',
  props: {
    el: {
      type: [String, HTMLElement],
      default: null
    },
    digit: {
      type: Number,
      default: 0
    },
    animation: {
      type: String as IAnimationType,
      default: 'flip'
    },
    format: {
      type: String,
      default: '0,0'
    },
    duration: {
      type: Number,
      default: 1000
    },
    padZero: {
      type: Number,
      default: 0
    },
    thousandSeparated: {
      type: Boolean,
      default: false
    },
    stagger: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const digitCollection = Array.from('09876543210')
    const verticalDigit = ref(digitCollection)
    // const digit = ref(props.digit)

    const isNumber = (val: number): boolean => typeof val === 'number' && val === val

    // pads zero from the start of the digit
    const digits = computed((): string[] => {
      let digits: string
      let digitsLength: number
      let separatedLength: number

      // thousand separated
      if (props.thousandSeparated) {
        digits = numeral(props.digit).format(props.format)
        digitsLength = Array.from(digits).filter(item => isNumber(parseInt(item, 10))).length
        separatedLength = digits.length - digitsLength
      } else {
        digits = props.digit.toString()
        digitsLength = Array.from(digits).length
        separatedLength = 0
      }

      if (props.padZero > digitsLength) {
        digits = digits.padStart(props.padZero + separatedLength, '0')
      }

      return Array.from(digits)
    })

    const digitStyle = (index: number): object => {
      const digitLength = digitCollection.length - 1
      /**
       * calc formula
       * @demo 5 - digitLength = -5em
       * transform: `translateY(${(5 - 10)em})`
       * transition: `${props.duration}ms`
       */
      const slideStyle = {
        transform: `translateY(${parseInt(digits.value[index], 10) - digitLength}em)`,
        transition: `${(props.duration || 1000) + index * (props.stagger ? 200 : 0)}ms`
      }

      return slideStyle
    }

    // const digitize = (n: number): number[] => [...`${n}`].map(i => parseInt(i))

    onMounted(() => {
      console.log(props)
    })

    return {
      verticalDigit,
      digits,
      digitStyle,
      isNumber
    }
  }
})
</script>

<style lang="scss" scoped>
// $unit-of-speed: 50ms; // crazy fast
// $unit-of-speed: 500ms; // normal
$unit-of-speed: 5000ms; // boring

@mixin digit-styling() {
  color: rgba(255, 255, 255, 0.9);
  margin: 2em auto;
  background: #222;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.9);
  border-radius: 2px;
  box-shadow: inset 0 2px 8px -2px #000;
}

@mixin digit-item-styling() {
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0 0.2em;
  &:first-child {
    border-left: none;
  }
}

@mixin animation($single-animation) {
  -webkit-animation: $single-animation;
  animation: $single-animation;
}

@mixin animation-duration($duration) {
  -webkit-animation-duration: $duration;
  animation-duration: $duration;
}

.digital-gyro {
  // @include digit-styling();
  display: inline-block;
  &--item {
    display: inline-block;
    height: 1em;
    width: calc(1em * 0.8);
    overflow: hidden;
    font-size: 6em;
    // @include digit-item-styling();
  }
}

.digit {
  line-height: 1em;
  @include animation(slide infinite linear);
}

.digit-one {
  // @include animation-duration(10 * $unit-of-speed);
}

.digit-ten {
  // @include animation-duration(100 * $unit-of-speed);
}

.digit-hundred {
  // @include animation-duration(1000 * $unit-of-speed);
}

@keyframes slide {
  from {
    transform: translateY(-10em);
  }

  to {
    transform: translateY(0);
  }
}
</style>
