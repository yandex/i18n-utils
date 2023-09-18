import {Declaration} from "postcss";
import {DeclarationMap} from "../types/DeclarationMap";

export const processor = (declMap: DeclarationMap, defaultValue: string, decl: Declaration, dir = 'ltr') => {
  const { prop } = decl
  if (dir === 'rtl') {
    decl.cloneBefore({
      prop: declMap.ltr[prop],
      value: defaultValue
    })
  }
  decl.cloneBefore({
    prop: declMap[dir][prop]
  })
  decl.remove()
}
