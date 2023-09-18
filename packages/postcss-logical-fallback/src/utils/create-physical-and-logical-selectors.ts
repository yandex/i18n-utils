import type { UtilsProps } from '../types';
import { deepRuleClone } from './postcss/deep-rule-clone';

export const createPhysicalAndLogicalSelectors = ({
    supportsAtRules,
    selectors,
    selectorId,
    declParent,
    decl,
}: UtilsProps) => {
    const [logicalRoot, logicalSrc] = deepRuleClone(declParent, decl);
    const [physicalRoot, physicalSrc] = deepRuleClone(declParent, decl);

    selectors.set(selectorId, { logicalSrc, physicalSrc });

    supportsAtRules.supports.append(logicalRoot);
    supportsAtRules.supportsNot.append(physicalRoot);
};
