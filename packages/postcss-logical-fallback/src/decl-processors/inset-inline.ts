import { Declaration } from 'postcss';
import { parseCssValue } from '../utils';
import { isCssVariable } from '../utils/is-css-variable';

const valueMap = {
    ltr: {
        start: 'left',
        end: 'right',
    },
    rtl: {
        start: 'right',
        end: 'left',
    },
};

export const processor = (decl: Declaration, dir = 'ltr') => {
    if (isCssVariable(decl.value)) {
        return;
    }

    const [start, end = start] = parseCssValue(decl.value);

    decl.cloneBefore({
        prop: valueMap[dir].start,
        value: start,
    });
    decl.cloneBefore({
        prop: valueMap[dir].end,
        value: end,
    });

    decl.remove();
};
