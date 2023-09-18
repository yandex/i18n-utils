import { getFixture, postcssExpect } from './utils';

describe('media queries', () => {
    it.each([
        'non-rtl.css',
        'rtl.css',
        'multiple-non-rtl.css',
        'multiple-rtl.css',
        'with-other-css-props.css',
    ])('%s', (fixture) => postcssExpect(getFixture(`media-queries/${fixture}`)));
});
