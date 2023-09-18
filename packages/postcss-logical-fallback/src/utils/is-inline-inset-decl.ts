import {Declaration} from "postcss";
import {inlineInsets} from "../property-sets";

export const isInlineInsetDecl = ({prop}: Declaration) => inlineInsets.has(prop)
