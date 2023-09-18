import {needFallback, isProcessed} from "../utils";

export const processor = declProcessor => {
  return (decl) => {
    if (!isProcessed(decl)) {
      declProcessor(decl, needFallback(decl) ? 'rtl' : 'ltr')
    }
  }
}
