import { Mappings } from '../types';

export const MARGIN_PROPS = <const>['margin-inline', 'margin-block'];

export const MARGIN_MAPPINGS: Mappings<typeof MARGIN_PROPS> = {
    'margin-inline': ['margin-inline-start', 'margin-inline-end'],
    'margin-block': ['margin-block-start', 'margin-block-end'],
};
