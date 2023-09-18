import { processor as positionedProcessor } from './positioned'

const declMap = {
  ltr: {
    'border-start-start-radius': 'border-top-left-radius',
    'border-start-end-radius': 'border-top-right-radius',
    'border-end-start-radius': 'border-bottom-left-radius',
    'border-end-end-radius': 'border-bottom-right-radius',
  },
  rtl: {
    'border-start-start-radius': 'border-top-right-radius',
    'border-start-end-radius': 'border-top-left-radius',
    'border-end-start-radius': 'border-bottom-right-radius',
    'border-end-end-radius': 'border-bottom-left-radius',
  }
}

const defaultValue = '0'

export const processor = positionedProcessor.bind(null, declMap, defaultValue)
