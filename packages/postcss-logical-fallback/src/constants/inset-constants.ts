import { Mappings } from '../types';

export const INSET_PROPS = <const>[
    'inset-block-start',
    'inset-inline-start',
    'inset-block-end',
    'inset-inline-end',
    'inset-inline',
    'inset-block',
];

export const INSET_MAPPINGS: Mappings<typeof INSET_PROPS> = {
    'inset-block-start': ['top'],
    'inset-block-end': ['bottom'],
    'inset-inline-start': ['left'],
    'inset-inline-end': ['right'],
    'inset-inline': ['left', 'right'],
    'inset-block': ['top', 'bottom'],
};
