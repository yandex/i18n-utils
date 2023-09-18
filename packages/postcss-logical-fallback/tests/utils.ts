const postcss = require('postcss');
const plugin = require('../src');
const path = require('path');
const fs = require('fs');
const stylelint = require('stylelint');

const FIXTURE_PATH = './fixtures';
const TEST_SEPARATOR = '/*expected*/';

type Fixture = {
    input: string;
    expected: string;
};

export const getFixture = (src: string): Fixture => {
    const [input, expected] = fs
        .readFileSync(path.join(__dirname, FIXTURE_PATH, src))
        .toString()
        .split(TEST_SEPARATOR);

    return { input: input.trim(), expected: expected.trim() };
};

export async function postcssExpect({ input, expected }: Fixture, opts = {}) {
    const result = await postcss([plugin(opts)]).process(input, { from: undefined });

    const { output } = await stylelint.lint({
        code: result.css,
        fix: true,
        quiet: true,
    });

    expect(output.trim()).toEqual(expected);
    expect(result.warnings()).toHaveLength(0);
}
