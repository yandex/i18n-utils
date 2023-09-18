import type { Declaration, Helpers, AtRule, Rule } from 'postcss';

import type { SupportsAtRulesMap } from './SuppportsAtRuleMap';
import type { Selectors } from './Selectors';

export type InitialValue = string;

export type UtilsProps = {
    supportsAtRules: Required<SupportsAtRulesMap>;
    decl: Declaration;
    declParent: Rule | AtRule;
    selectors: Selectors;
    selectorId: string;
    helpers: Helpers;
    mappings: Record<string, string[]>;
    initialValue: InitialValue;
};
