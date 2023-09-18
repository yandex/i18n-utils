import {Declaration} from "postcss";

const declMap = {
  'inset-block-start': 'top',
  'inset-block-end': 'bottom'
}
export const processor = (decl: Declaration) => {
  decl.cloneBefore({
    prop: declMap[decl.prop]
  })
  decl.remove()
}
