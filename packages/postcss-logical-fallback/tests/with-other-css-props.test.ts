import { getFixture, postcssExpect } from './utils';

describe('with other CSS props', () => {
    it.each([
        'inset-inline-start.css',
        'inset-inline-end.css',
        'inset-block-start.css',
        'inset-block-end.css',
    ])('%s', (fixture) => postcssExpect(getFixture(`with-other-css-props/${fixture}`)));
});
