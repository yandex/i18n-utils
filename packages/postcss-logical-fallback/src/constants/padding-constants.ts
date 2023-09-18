import {Mappings} from "../types";

export const PADDING_PROPS = <const>[
  'padding-inline',
  'padding-block',
];


export const PADDING_MAPPINGS: Mappings<typeof PADDING_PROPS> = {
  'padding-inline': ['padding-inline-start', 'padding-inline-end'],
  'padding-block': ['padding-block-start', 'padding-block-end'],
};
