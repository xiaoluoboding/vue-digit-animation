import './formatZhNumber'
import './formatColonTime'
import './formatLocalDate'
import CircleLinkedList from './circleLinkedList'

const easingMap = {
  'Cubic.easeInOut': 'cubic-bezier(0.65, 0, 0.35, 1)',
  'Cubic.easeIn': 'cubic-bezier(0.32, 0, 0.67, 0)',
  'Cubic.easeOut': 'cubic-bezier(0.33, 1, 0.68, 1)',

  'Sine.easeIn': 'cubic-bezier(0.12, 0, 0.39, 0)',
  'Sine.easeOut': 'cubic-bezier(0.61, 1, 0.88, 1)',
  'Sine.easeInOut': 'cubic-bezier(0.37, 0, 0.63, 1)',

  'Quad.easeIn': 'cubic-bezier(0.11, 0, 0.5, 0)',
  'Quad.easeOut': 'cubic-bezier(0.5, 1, 0.89, 1)',
  'Quad.easeInOut': 'cubic-bezier(0.45, 0, 0.55, 1)',

  'Quart.easeIn': 'cubic-bezier(0.5, 0, 0.75, 0)',
  'Quart.easeOut': 'cubic-bezier(0.25, 1, 0.5, 1)',
  'Quart.easeInOut': 'cubic-bezier(0.76, 0, 0.24, 1)',

  'Quint.easeIn': 'cubic-bezier(0.64, 0, 0.78, 0)',
  'Quint.easeOut': 'cubic-bezier(0.22, 1, 0.36, 1)',
  'Quint.easeInOut': 'cubic-bezier(0.83, 0, 0.17, 1)',

  'Expo.easeIn': 'cubic-bezier(0.7, 0, 0.84, 0)',
  'Expo.easeOut': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'Expo.easeInOut': 'cubic-bezier(0.87, 0, 0.13, 1)',

  'Circ.easeIn': 'cubic-bezier(0.55, 0, 1, 0.45)',
  'Circ.easeOut': 'cubic-bezier(0, 0.55, 0.45, 1)',
  'Circ.easeInOut': 'cubic-bezier(0.85, 0, 0.15, 1)',

  'Back.easeIn': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  'Back.easeOut': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  'Back.easeInOut': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',

  'Linear': 'linear',
  'Ease': 'ease'
}

const fontSizePreset: any = {
  'xs': '0.75rem',
  'sm': '0.875rem',
  'base': '1rem',
  'lg': '1.125rem',
  'xl': '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '4rem'
}

const circleLinkedDigit = new CircleLinkedList()

const UUIDGenerator = () =>
  (String(1e7) + -1e11).replace(/[018]/g, (c: string) =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
    ).toString(16)
  )

circleLinkedDigit
  .insert('0', 'head')
  .insert('9', '0')
  .insert('8', '9')
  .insert('7', '8')
  .insert('6', '7')
  .insert('5', '6')
  .insert('4', '5')
  .insert('3', '4')
  .insert('2', '3')
  .insert('1', '2')
  .insert('0', '1')

export { easingMap, fontSizePreset, UUIDGenerator, circleLinkedDigit }
