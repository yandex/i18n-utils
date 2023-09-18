import {Declaration} from "postcss";
import {insets} from "../property-sets";

export const isInsetDecl = ({prop}: Declaration) => insets.has(prop)
