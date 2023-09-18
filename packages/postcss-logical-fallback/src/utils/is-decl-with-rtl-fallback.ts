import {Declaration} from "postcss";
import {isInlineInsetDecl} from "./is-inline-inset-decl"
import {isBorderDecl} from "./is-border-decl"
import {isFloatDecl} from "./is-float-decl"

export const isDeclWithRtlFallback = (decl: Declaration) => isInlineInsetDecl(decl) || isBorderDecl(decl) || isFloatDecl(decl)
