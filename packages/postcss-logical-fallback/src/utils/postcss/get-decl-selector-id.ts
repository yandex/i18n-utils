import type { AtRule, Rule, Declaration, Node } from 'postcss';

export const getDeclSelectorId = (decl: Declaration): string => {
    let node: Node | undefined = decl.parent;
    let selector = '';
    while (node) {
        if (node.type === 'rule') {
            selector = (node as Rule).selector + selector;
        }

        if (node.type === 'atrule') {
            selector = `@${(node as AtRule).name} ${(node as AtRule).params} ${selector}`;
        }

        node = node.parent;
    }

    return selector;
};
