import { getFixture, postcssExpect } from './utils';

describe('multiple selectors', () => {
    it.each(['class-and-html-element.css', 'id-and-complicated-selector.css'])('%s', (fixture) =>
        postcssExpect(getFixture(`multiple-selectors/${fixture}`)),
    );
});
