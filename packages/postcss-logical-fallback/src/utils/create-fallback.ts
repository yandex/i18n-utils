import { ADD_RTL_FALLBACK_PROPS, CAN_SKIP_RTL_FALLBACK_FOR_SINGLE_VALUE } from '../constants';
import { markVisited } from './postcss/visited';
import { UtilsProps } from '../types';
import { createRtlFallback } from './create-rtl-fallback';
import { parseCssValue } from './parse-css-value';
import { AtRule, Rule } from 'postcss';

const isRtlFallbackRequired = (prop: string, valuesLen?: number) => {
    if (valuesLen && valuesLen === 1 && CAN_SKIP_RTL_FALLBACK_FOR_SINGLE_VALUE.includes(prop)) {
        return false;
    }

    return ADD_RTL_FALLBACK_PROPS.includes(prop);
};

export const createFallback = (props: UtilsProps) => {
    const { selectors, helpers, selectorId, decl, mappings } = props;

    const logicalDecl = decl.clone();
    logicalDecl.cleanRaws();

    const roots = selectors.get(selectorId);

    if (!roots) {
        throw decl.error(`selector ${selectorId} was not found`);
    }

    roots.logicalSrc.append(logicalDecl);

    const physicalMappedRules = mappings[decl.prop];
    const values = parseCssValue(decl.value);

    physicalMappedRules.forEach((prop, i) => {
        const physicalDecl = new helpers.Declaration({
            prop,
            value: values[i] || values[0],
        });
        roots.physicalSrc.append(physicalDecl);

        if (isRtlFallbackRequired(decl.prop, values.length)) {
            createRtlFallback({
                ...props,
                declParent: roots.physicalSrc as Rule | AtRule,
                decl: physicalDecl,
            });
        }
    });

    markVisited(logicalDecl);
    decl.remove();
};
