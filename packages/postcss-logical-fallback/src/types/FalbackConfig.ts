import { Mappings } from './Mappings';
import {InitialValue} from "./UtilsProps";

type Fallback = 'inset' | 'shorthand';

export type FallbackConfig = {
  props: Readonly<string[]>;
  mappings: Mappings;
  fallback: Fallback;
  initialValue: InitialValue;
}
