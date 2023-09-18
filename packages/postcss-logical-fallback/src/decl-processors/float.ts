import {Declaration} from "postcss";
import {floatValues} from "../property-sets";

const valueMap = {
  rtl: {
    'inline-start': 'right',
    'inline-end': 'left'
  },
  ltr: {
    'inline-start': 'left',
    'inline-end': 'right'
  }
}

export const processor = (decl: Declaration, dir = 'ltr') => {
  const { value } = decl
  if (floatValues.has(value)) {
    decl.cloneBefore({
      value: valueMap[dir][value]
    })
    decl.remove()
  }
}
