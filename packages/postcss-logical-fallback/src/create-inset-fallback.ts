import type { Declaration, Helpers } from 'postcss';
import type {InitialValue, Mappings, Selectors, SupportsAtRulesMap, UtilsProps} from './types';

import {
    isVisited,
    createSupports,
    createPhysicalAndLogicalSelectors,
    createFallback,
    getDeclSelectorId,
    getDeclParent,
    isEmpty,
} from './utils';

export const createInsetFallback = (
    supportsAtRulesMap: SupportsAtRulesMap,
    selectors: Selectors,
    decl: Declaration,
    helpers: Helpers,
    mappings: Mappings,
    initialValue: InitialValue,
) => {
    if (!isVisited(decl)) {
        const declParent = getDeclParent(decl);
        const selectorId = getDeclSelectorId(decl);

        const shouldCreateSupports =
            !supportsAtRulesMap.supports || !supportsAtRulesMap.supportsNot;

        if (shouldCreateSupports) {
            createSupports({ supportsAtRulesMap, decl, helpers });
        }

        const supportsAtRules = supportsAtRulesMap as Required<SupportsAtRulesMap>;

        const utilsProps: UtilsProps = {
            helpers,
            supportsAtRules,
            selectorId,
            declParent,
            selectors,
            mappings,
            decl,
            initialValue,
        };

        if (!selectors.has(selectorId)) {
            createPhysicalAndLogicalSelectors(utilsProps);
        }

        createFallback(utilsProps);

        if (isEmpty(declParent)) {
            declParent.remove();
        }
    }
};
