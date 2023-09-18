import type { SupportsAtRulesMap, UtilsProps } from '../types';

import { createSupportsAtRule } from './postcss/create-supports-at-rule';

type Props = Pick<UtilsProps, 'helpers' | 'decl'> & { supportsAtRulesMap: SupportsAtRulesMap };

export const createSupports = ({ supportsAtRulesMap, helpers, decl }: Props) => {
    supportsAtRulesMap.supports = createSupportsAtRule(helpers, decl.toString());
    supportsAtRulesMap.supportsNot = createSupportsAtRule(helpers, decl.toString(), {
        not: true,
    });
    decl.root().append(supportsAtRulesMap.supports, supportsAtRulesMap.supportsNot);
};
