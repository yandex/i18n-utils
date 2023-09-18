import {Mappings} from "../types";

export const BORDER_RADIUS_PROPS = <const>[
    'border-start-start-radius',
    'border-start-end-radius',
    'border-end-start-radius',
    'border-end-end-radius'
];

export const BORDER_RADIUS_MAPPINGS: Mappings<typeof BORDER_RADIUS_PROPS> = {
    'border-start-start-radius': ['border-top-left-radius'],
    'border-start-end-radius': ['border-top-right-radius'],
    'border-end-start-radius': ['border-bottom-left-radius'],
    'border-end-end-radius': ['border-bottom-right-radius']
}
