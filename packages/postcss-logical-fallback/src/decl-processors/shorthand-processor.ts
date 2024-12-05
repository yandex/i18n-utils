import { Declaration } from 'postcss';
import { parseCssValue } from '../utils';
import { isCssVariable } from '../utils/is-css-variable';

export const processor = (decl: Declaration) => {
    const { prop, value } = decl;
    if (isCssVariable(value)) {
        return;
    }

    const [start, end = start] = parseCssValue(value);
    decl.cloneBefore({
        prop: `${prop}-start`,
        value: start,
    });
    decl.cloneBefore({
        prop: `${prop}-end`,
        value: end,
    });
    decl.remove();
};
