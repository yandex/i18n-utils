import type { Declaration, Node, Rule, AtRule } from 'postcss';

export const getDeclParent = (decl: Declaration): Rule | AtRule => {
    let node: Node = decl;
    while (node?.parent && node.parent.type !== 'root') {
        node = node.parent;
    }

    return node as Rule | AtRule;
};
