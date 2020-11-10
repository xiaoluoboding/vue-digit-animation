declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defneComponent>
  export default component
}

declare module 'numeral'
