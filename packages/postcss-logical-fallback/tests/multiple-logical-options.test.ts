import { getFixture, postcssExpect } from './utils';

describe('multiple logical props', () => {
    it.each([
        'double-inline.css',
        'double-block.css',
        'block-and-inline.css',
        'double-block-double-inline.css',
    ])('%s', (fixture) => postcssExpect(getFixture(`multiple-logical-options/${fixture}`)));
});
