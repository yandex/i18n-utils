import type { AtRule } from 'postcss';

export type SupportsAtRulesMap = {
    supports?: AtRule;
    supportsNot?: AtRule;
};
