import {Declaration} from "postcss";
import {float, floatValues} from "../property-sets";

export const isFloatDecl = ({prop, value}: Declaration) => float.has(prop) && floatValues.has(value)
