import {Declaration} from "postcss";
import {borders} from "../property-sets";

export const isBorderDecl = ({prop}: Declaration) => borders.has(prop)
