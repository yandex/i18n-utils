import type { AtRule, Helpers } from 'postcss';

type Options = {
    not?: boolean;
};

export const createSupportsAtRule = (
    { AtRule }: Helpers,
    param: string,
    { not = false }: Options = {},
): AtRule =>
    new AtRule({
        name: `supports${not ? ' not' : ''}`,
        params: `(${param})`,
        raws: {
            before: '\n\n',
        },
    });
