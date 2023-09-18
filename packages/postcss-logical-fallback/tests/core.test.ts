import { getFixture, postcssExpect } from './utils';

describe('core tests', () => {
    it.each([
        'inset-inline-start.css',
        'inset-inline-end.css',
        'inset-block-start.css',
        'inset-block-end.css',
        'inset-block.css',
        'inset-inline.css',
        'padding-inline.css',
        'padding-block.css',
        'margin-block.css',
        'margin-inline.css',
        'border-start-start-radius.css',
        'border-start-end-radius.css',
        'border-end-end-radius.css',
        'border-end-start-radius.css',
    ])('%s', (fixture) => postcssExpect(getFixture(`core/${fixture}`)));
});
