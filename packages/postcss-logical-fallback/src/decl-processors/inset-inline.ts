import {Declaration} from "postcss";
import {parseCssValue} from "../utils";

const valueMap = {
  ltr: {
    start: 'left',
    end: 'right'
  },
  rtl: {
    start: 'right',
    end: 'left'
  }
}

export const processor = (decl: Declaration, dir = 'ltr') => {
  const [start, end = start] = parseCssValue(decl.value)

  decl.cloneBefore({
    prop: valueMap[dir].start,
    value: start
  })
  decl.cloneBefore({
    prop: valueMap[dir].end,
    value: end
  })

  decl.remove()
}
