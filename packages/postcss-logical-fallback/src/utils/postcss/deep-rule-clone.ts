import type { Declaration, ChildNode, Rule } from 'postcss';
import { hasNode } from './has-node';
import { areEqual } from './are-equal';

type Options = {
    dirRtl?: boolean;
};

export const deepRuleClone = (
    root: ChildNode,
    decl: Declaration,
    { dirRtl }: Options = {},
): [ChildNode, Rule] => {
    const declContainer = decl.parent as ChildNode;
    if (!declContainer) {
        throw decl.error('no parent for decl found');
    }

    if (root.type !== 'rule' && root.type !== 'atrule') {
        throw decl.error(`can't clone rule if root node is comment or decl`);
    }

    const clone = root.clone();
    clone.cleanRaws();

    let clonedRule: Rule | undefined;
    clone.walk((node) => {
        if (areEqual(node,decl) && node.parent?.type === 'rule') {
            clonedRule = node.parent as Rule;
        }

        if (!hasNode(node, declContainer) && !areEqual(node, declContainer)) {
            node.remove();
        }
    });

    if (!clonedRule) {
        throw decl.error(`no rule found`);
    }

    if (dirRtl) {
        clonedRule.selector = `[dir="rtl"] ${clonedRule.selector}`;
    }

    return [clone, clonedRule];
};
