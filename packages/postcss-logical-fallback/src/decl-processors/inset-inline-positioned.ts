import {processor as positionedProcessor} from "./positioned";

const declMap = {
  ltr: {
    'inset-inline-start': 'left',
    'inset-inline-end': 'right'
  },
  rtl: {
    'inset-inline-start': 'right',
    'inset-inline-end': 'left'
  }
}

const defaultValue = 'auto'
export const processor = positionedProcessor.bind(null, declMap, defaultValue)
