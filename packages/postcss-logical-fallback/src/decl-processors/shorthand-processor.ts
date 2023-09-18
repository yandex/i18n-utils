import {Declaration} from "postcss";
import {parseCssValue} from "../utils";
export const processor = (decl: Declaration) => {
  const { prop, value } = decl
  const [start, end = start] = parseCssValue(value)
  decl.cloneBefore({
    prop: `${prop}-start`,
    value: start,
  })
  decl.cloneBefore({
    prop: `${prop}-end`,
    value: end,
  })
  decl.remove()
}
