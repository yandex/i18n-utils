import { INSET_MAPPINGS, INSET_PROPS } from './inset-constants';
import { MARGIN_MAPPINGS, MARGIN_PROPS } from './margin-constants';
import { PADDING_MAPPINGS, PADDING_PROPS } from './padding-constants';
import { FallbackConfig } from '../types';
import {BORDER_RADIUS_MAPPINGS, BORDER_RADIUS_PROPS} from "./border-radius-constants";

export const RTL_MAPPING = {
    left: 'right',
    right: 'left',
    'margin-left': 'margin-right',
    'margin-right': 'margin-left',
    'padding-left': 'padding-right',
    'padding-right': 'padding-left',
    'border-top-left-radius': 'border-top-right-radius',
    'border-top-right-radius': 'border-top-left-radius',
    'border-bottom-left-radius': 'border-bottom-right-radius',
    'border-bottom-right-radius': 'border-bottom-left-radius',
};

export const FALLBACK_CONFIG: FallbackConfig[] = [
    {
        props: INSET_PROPS,
        mappings: INSET_MAPPINGS,
        fallback: 'inset',
        initialValue: 'auto'
    },
    {
        props: MARGIN_PROPS,
        mappings: MARGIN_MAPPINGS,
        fallback: 'shorthand',
        initialValue: 'auto'
    },
    {
        props: PADDING_PROPS,
        mappings: PADDING_MAPPINGS,
        fallback: 'shorthand',
        initialValue: 'auto'
    },
    {
        props: BORDER_RADIUS_PROPS,
        mappings: BORDER_RADIUS_MAPPINGS,
        fallback: 'inset',
        initialValue: '0'
    }
];

export const ADD_RTL_FALLBACK_PROPS = [
    'inset-inline-start',
    'inset-inline-end',
    'inset-inline',
    'margin-inline',
    'padding-inline',
    ...BORDER_RADIUS_PROPS
];
export const CAN_SKIP_RTL_FALLBACK_FOR_SINGLE_VALUE = [
    'inset-inline',
    'margin-inline',
    'padding-inline',
];

export const PLUGIN_NAME = 'postcss-logical-fallback';
