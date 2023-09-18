import type { Declaration, Helpers } from 'postcss';
import type { Mappings } from './types';
import { parseCssValue } from './utils/parse-css-value';

export const createShorthandsFallback = (
    decl: Declaration,
    helpers: Helpers,
    mappings: Mappings,
) => {
    const parsedValues = parseCssValue(decl.value);
    const props = mappings[decl.prop];
    if (!props) {
        throw decl.error(`no mapping for prop ${decl.prop} found`);
    }

    props.forEach((prop, i) => {
        const propDecl = new helpers.Declaration({
            prop,
            value: parsedValues[i] || parsedValues[0],
        });
        decl.before(propDecl);
    });

    decl.remove();
};
