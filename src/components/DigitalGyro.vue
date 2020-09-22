<template>
  <div class="digital-gyro">
    <template v-for="(item, index) in digits">
      <div class="digital-gyro--item">
        <div class="digit" :style="digitStyle(index)">
          <span>0 9 8 7 6 5 4 3 2 1 0</span>
          <!-- 09876543210 -->
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted, PropType } from 'vue'

type IAnimationType = PropType<'default' | 'flip' | 'countup'>

interface DigitProps {
  el: HTMLElement
  value: number
  animation: string
  wave: boolean
  format: string
  duration: number
  padZero: number
}

// const el = ref<HTMLElement | null>(null)

export default defineComponent({
  name: 'DigitalGyro',
  props: {
    el: {
      type: [String, HTMLElement],
      default: null
    },
    value: {
      type: Number,
      default: 0
    },
    animation: {
      type: String as IAnimationType,
      default: 'flip'
    },
    wave: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'dd'
    },
    duration: {
      type: Number,
      default: 1000
    },
    padZero: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const digit = ref(props.value)

    // pads zero from the start of the digit
    const digits = computed(() => {
      let digits = props.value.toString()

      if (props.padZero > Array.from(digits).length) {
        digits = digits.padStart(props.padZero, '0')
      }

      return Array.from(digits)
    })

    const digitStyle = (index: number): object => {
      const flipStyle = {
        transform: `translateY(${-10 + parseInt(digits.value[index], 10)}em)`,
        transition: `${props.duration || 1000 + index * 100}ms`
      }

      return flipStyle
    }

    onMounted(() => {
      console.log(props)
    })

    return {
      digit,
      digits,
      digitStyle
    }
  }
})
</script>

<style lang="scss">
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
    width: 1em;
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
