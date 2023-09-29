import type { Plugin, Processor } from 'postcss';
import type { Selectors } from './types';

import { createInsetFallback } from './create-inset-fallback';
import { PLUGIN_NAME, FALLBACK_CONFIG } from './constants';
import { createShorthandsFallback } from './create-shorthands-fallback';

const selectors: Selectors = new Map();
let supportsSelectors = {};

module.exports = (): Plugin | Processor => {
    return {
        postcssPlugin: PLUGIN_NAME,

        Once: () => {
            selectors.clear()
            supportsSelectors = {};
        },

        Declaration: (css, helpers) => {
            FALLBACK_CONFIG.forEach(({ props, mappings, fallback, initialValue }) => {
                if (props.includes(css.prop)) {
                    switch (fallback) {
                        case 'inset':
                            createInsetFallback(
                                supportsSelectors,
                                selectors,
                                css,
                                helpers,
                                mappings,
                                initialValue,
                            );
                            break;
                        case 'shorthand':
                            createShorthandsFallback(css, helpers, mappings);
                            break;
                    }
                }
            });
        },
    };
};

module.exports.postcss = true;
